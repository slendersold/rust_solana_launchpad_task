#!/usr/bin/env node
/**
 * Mint SPL tokens via token_minter. Run from program/: node scripts/mint-tokens.js [count]
 * Requires: programs deployed and initialized (make init / make init-devnet).
 */
import { BorshInstructionCoder } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import BN from "bn.js";

const require = createRequire(import.meta.url);

const ORACLE_PROGRAM_ID = new PublicKey("AdhczDLsiGqowzT5WhwsPPANd8e3zSBVkMNuaG7qJd7i");
const MINTER_PROGRAM_ID = new PublicKey("5QtVSa7VpGnQ86CEp7G8wcqD4HbEGJrpwben2shN6JQM");
const ORACLE_SEED = Buffer.from("oracle_state");
const MINTER_SEED = Buffer.from("minter_config");

const programDir = path.resolve(process.cwd());
const walletPath = process.env.ANCHOR_WALLET || path.join(process.env.HOME || "", ".config/solana/id.json");

async function main() {
  const count = Math.max(1, parseInt(process.argv[2] || "1", 10));
  const rpcUrl = process.env.RPC_URL || process.env.SOLANA_RPC_HTTP || "http://127.0.0.1:8899";
  const connection = new Connection(rpcUrl, "confirmed");
  const payer = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(walletPath, "utf8")))
  );

  const minterIdl = require(path.join(programDir, "target/idl/token_minter.json"));
  const minterCoder = new BorshInstructionCoder(minterIdl);

  const [oraclePda] = PublicKey.findProgramAddressSync([ORACLE_SEED], ORACLE_PROGRAM_ID);
  const [minterPda] = PublicKey.findProgramAddressSync([MINTER_SEED], MINTER_PROGRAM_ID);

  const minterInfo = await connection.getAccountInfo(minterPda);
  if (!minterInfo) {
    throw new Error("Minter not initialized. Run make init or make init-devnet first.");
  }

  const treasury = payer.publicKey;
  const signatures = [];

  for (let i = 0; i < count; i++) {
    const mintKeypair = Keypair.generate();
    const userAta = anchor.utils.token.associatedAddress({
      owner: payer.publicKey,
      mint: mintKeypair.publicKey,
    });

    const mintIx = {
      programId: MINTER_PROGRAM_ID,
      keys: [
        { pubkey: minterPda, isSigner: false, isWritable: true },
        { pubkey: payer.publicKey, isSigner: true, isWritable: true },
        { pubkey: treasury, isSigner: false, isWritable: true },
        { pubkey: ORACLE_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: oraclePda, isSigner: false, isWritable: false },
        { pubkey: mintKeypair.publicKey, isSigner: true, isWritable: true },
        { pubkey: userAta, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: anchor.web3.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      ],
      data: Buffer.from(
        minterCoder.encode("mint_token", {
          decimals: 6,
          initial_supply: new BN(1_000_000),
          name: "",
          symbol: "",
          uri: "",
        })
      ),
    };

    const tx = new Transaction().add(mintIx);
    const sig = await sendAndConfirmTransaction(connection, tx, [payer, mintKeypair], {
      commitment: "confirmed",
      skipPreflight: false,
      maxRetries: 10,
    });
    console.log(`mint #${i + 1}: mint=${mintKeypair.publicKey.toBase58()} tx=${sig}`);
    signatures.push(sig);
  }

  console.log("---");
  for (const sig of signatures) {
    const cluster = rpcUrl.includes("devnet")
      ? "?cluster=devnet"
      : rpcUrl.includes("127.0.0.1") || rpcUrl.includes("localhost")
        ? "?cluster=custom&customUrl=" + encodeURIComponent(rpcUrl)
        : "";
    console.log(`https://explorer.solana.com/tx/${sig}${cluster}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
