# Solana Mini Launchpad

Учебный мини-лаунчпад на Solana + Anchor: два on-chain контракта (SOL/USD oracle и token minter), Rust backend для обновления цены и прослушки событий, а также Remix фронтенд (папка `frontend/`).

## Сдача проекта

**Репозиторий:** https://github.com/slendersold/rust_solana_launchpad_task

| Критерий | Статус |
|----------|--------|
| LiteSVM-тесты (`make test`) | 7/7 (oracle 4 + minter 3) |
| Backend unit-тесты (`cargo test`) | 7/7 |
| Контракты в Devnet | oracle + minter задеплоены |
| Backend обновляет цену в Devnet | `make backend-devnet` → `oracle price updated` |
| README: program ID + PDA + mint tx | см. раздел «Развёртывание (devnet)» |

**Адреса для проверки (Devnet):**

- Oracle program: `AdhczDLsiGqowzT5WhwsPPANd8e3zSBVkMNuaG7qJd7i`
- Minter program: `5QtVSa7VpGnQ86CEp7G8wcqD4HbEGJrpwben2shN6JQM`
- Oracle state PDA: `3VfLEoNjeivr2sXwAMRaocW82GReaTxKvtAeXnMqS566`

**Примеры транзакций минта (Devnet Explorer):**

1. https://explorer.solana.com/tx/575zJmzKkVcdaLhSffg3rEna4gNYw7SkrvcXSV9WT63zMA1to9e2BQGVphv5ymEBWiaB5Y7ysXWTyeHNPuyd3SNs?cluster=devnet
2. https://explorer.solana.com/tx/2C88NbJWPcVk7pNQ8JPbNvsMQJrBtZvDEoM29aX18nUx78r8FmtbA7iGrPdBT8hXSXfQ4FruLamUkKdhuccztPHg?cluster=devnet
3. https://explorer.solana.com/tx/5FSJuKJ9ASdoc7Q8MH6KYJhH136NmfJLGEpd2GLQHfqMz39CCGs9HLQa2dy4HFvCkz5fBEV76AU1FeFRwQGW97JY?cluster=devnet

## Развёртывание (localnet)

Проверено на `solana-test-validator` (http://127.0.0.1:8899).

| | Адрес |
|---|--------|
| **Oracle program id** (`sol_usd_oracle`) | `AdhczDLsiGqowzT5WhwsPPANd8e3zSBVkMNuaG7qJd7i` |
| **Minter program id** (`token_minter`) | `5QtVSa7VpGnQ86CEp7G8wcqD4HbEGJrpwben2shN6JQM` |
| **Oracle state PDA** (`oracle_state`) | `3VfLEoNjeivr2sXwAMRaocW82GReaTxKvtAeXnMqS566` |
| **Oracle admin / deploy wallet** | `3CU8j6616j5c9KVtLfkjuPgvjpTa2wmECzLW5AFWsg3z` |

### Транзакции (localnet Explorer)

RPC для ссылок: `http://127.0.0.1:8899`

- Deploy minter: [2LUeryzJpr4VEGfrd1gVzA8McT4kyWgoTWUru6RfpzoxC823gEcunbwyAtAU1gfvQN19FNy6W5wkHfLRwERNzhDq](https://explorer.solana.com/tx/2LUeryzJpr4VEGfrd1gVzA8McT4kyWgoTWUru6RfpzoxC823gEcunbwyAtAU1gfvQN19FNy6W5wkHfLRwERNzhDq?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)
- Deploy oracle: [51SzpooMd1FEJz6iqCDechvLP9NiMd89Q4QjZFxd2XXGdEjWQYMPsgiGDApFvbMkBEKvmrJ5FVF7rGwYrpornMcs](https://explorer.solana.com/tx/51SzpooMd1FEJz6iqCDechvLP9NiMd89Q4QjZFxd2XXGdEjWQYMPsgiGDApFvbMkBEKvmrJ5FVF7rGwYrpornMcs?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)
- Init oracle: [UbKQLD2EQTdWzgVdXhKJDLpt3xGBCvi1UYS3ctAwVN8wbqwNQXP7JidtNRtNL2runBMMrixSKGn9PxVmRwttSeu](https://explorer.solana.com/tx/UbKQLD2EQTdWzgVdXhKJDLpt3xGBCvi1UYS3ctAwVN8wbqwNQXP7JidtNRtNL2runBMMrixSKGn9PxVmRwttSeu?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)
- Backend `update_price`: [2Xz3TZaKAQXfrPsSSRUdUkSBM3BEAE3GsZAFFUc6Mkr8cyfdc1W6YPgSsf1U8p8JnUPvJBxcHBT5o8sk37bdebBs](https://explorer.solana.com/tx/2Xz3TZaKAQXfrPsSSRUdUkSBM3BEAE3GsZAFFUc6Mkr8cyfdc1W6YPgSsf1U8p8JnUPvJBxcHBT5o8sk37bdebBs?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)

### Минт токенов (localnet E2E)

Скрипт `program/scripts/mint-tokens.js` (после `make init`):

```bash
cd program && node scripts/mint-tokens.js 3
```

- Mint #1: [cvowFJ55iFizGRjh98YT62sYWMU7FXhiU7tkc1NQ7d9gZSpT63z3ipfB4aQBuYCuDRtXb6br4qK7zTSaxdXRXwt](https://explorer.solana.com/tx/cvowFJ55iFizGRjh98YT62sYWMU7FXhiU7tkc1NQ7d9gZSpT63z3ipfB4aQBuYCuDRtXb6br4qK7zTSaxdXRXwt?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)
- Mint #2: [5FU5RDYdRvnKNy7sQr3p5zd2Rsyew5bYcWDAHPfWh6TJjYc8iUc1v8mnPN56EjgRCSRXKcRNXQCasTXqnSrQwsyD](https://explorer.solana.com/tx/5FU5RDYdRvnKNy7sQr3p5zd2Rsyew5bYcWDAHPfWh6TJjYc8iUc1v8mnPN56EjgRCSRXKcRNXQCasTXqnSrQwsyD?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)
- Mint #3: [3bLbALXDYKGBS28LQYMtcpowQP67Swc2Tt4R42wz7TuStbTyuTvmmTs7jx84RkFaTAdB1kw3ZnuyWSYE4RdjuzYz](https://explorer.solana.com/tx/3bLbALXDYKGBS28LQYMtcpowQP67Swc2Tt4R42wz7TuStbTyuTvmmTs7jx84RkFaTAdB1kw3ZnuyWSYE4RdjuzYz?cluster=custom&customUrl=http%3A%2F%2F127.0.0.1%3A8899)

Backend: `cp backend/.env.example backend/.env` → `RUST_LOG=info MOCK_PRICE=120000000 cargo run` (в логах `oracle price updated`; при минте через UI или скрипт — JSON с событием `TokenCreated`).

## Развёртывание (devnet)

Те же program ID (кастомные keypair из `program/target/deploy/`), что и на localnet:

| | Адрес |
|---|--------|
| **Oracle program id** | `AdhczDLsiGqowzT5WhwsPPANd8e3zSBVkMNuaG7qJd7i` |
| **Minter program id** | `5QtVSa7VpGnQ86CEp7G8wcqD4HbEGJrpwben2shN6JQM` |
| **Oracle state PDA** | `3VfLEoNjeivr2sXwAMRaocW82GReaTxKvtAeXnMqS566` |
| **Deploy wallet** | `3CU8j6616j5c9KVtLfkjuPgvjpTa2wmECzLW5AFWsg3z` |

### Транзакции (Devnet Explorer)

- Deploy oracle: [4ofVQSfinn9s8Sb1Ri271bnmCgVFwUapLAGhjqiqj9fSVo7okRyuZh4cCrS3EivyF2WE2naQEG9ksnLRr2dt5h6y](https://explorer.solana.com/tx/4ofVQSfinn9s8Sb1Ri271bnmCgVFwUapLAGhjqiqj9fSVo7okRyuZh4cCrS3EivyF2WE2naQEG9ksnLRr2dt5h6y?cluster=devnet)
- Deploy minter: [2BFkrfSYfHF7iWQEyggqgSkso7s8Q9pm6u6ww5BKPzqSya4xMwY2smtiSzkcd8watqzesHQEkHDPJ4VdrGQzmqUN](https://explorer.solana.com/tx/2BFkrfSYfHF7iWQEyggqgSkso7s8Q9pm6u6ww5BKPzqSya4xMwY2smtiSzkcd8watqzesHQEkHDPJ4VdrGQzmqUN?cluster=devnet)
- Init oracle: [BuiiApRYp7c5hmTrQRSE7DQv46MaLwUEtWknmmV97vWCDCr1LL8HTd4a7qa9Vke7pS7xktR55j6Jntq6MQeLPHh](https://explorer.solana.com/tx/BuiiApRYp7c5hmTrQRSE7DQv46MaLwUEtWknmmV97vWCDCr1LL8HTd4a7qa9Vke7pS7xktR55j6Jntq6MQeLPHh?cluster=devnet)
- Init minter: [53a1KfQWngFZ3voyKh45NuYSjY36S9Cfe8MHKCG7ZZRjPjV8PeyW7Fw5sahpGB9pNnc6ZYSSePeD9pXZR6GHKCYA](https://explorer.solana.com/tx/53a1KfQWngFZ3voyKh45NuYSjY36S9Cfe8MHKCG7ZZRjPjV8PeyW7Fw5sahpGB9pNnc6ZYSSePeD9pXZR6GHKCYA?cluster=devnet)

### Минт токенов (devnet)

- Mint #1: [575zJmzKkVcdaLhSffg3rEna4gNYw7SkrvcXSV9WT63zMA1to9e2BQGVphv5ymEBWiaB5Y7ysXWTyeHNPuyd3SNs](https://explorer.solana.com/tx/575zJmzKkVcdaLhSffg3rEna4gNYw7SkrvcXSV9WT63zMA1to9e2BQGVphv5ymEBWiaB5Y7ysXWTyeHNPuyd3SNs?cluster=devnet)
- Mint #2: [2C88NbJWPcVk7pNQ8JPbNvsMQJrBtZvDEoM29aX18nUx78r8FmtbA7iGrPdBT8hXSXfQ4FruLamUkKdhuccztPHg](https://explorer.solana.com/tx/2C88NbJWPcVk7pNQ8JPbNvsMQJrBtZvDEoM29aX18nUx78r8FmtbA7iGrPdBT8hXSXfQ4FruLamUkKdhuccztPHg?cluster=devnet)
- Mint #3: [5FSJuKJ9ASdoc7Q8MH6KYJhH136NmfJLGEpd2GLQHfqMz39CCGs9HLQa2dy4HFvCkz5fBEV76AU1FeFRwQGW97JY](https://explorer.solana.com/tx/5FSJuKJ9ASdoc7Q8MH6KYJhH136NmfJLGEpd2GLQHfqMz39CCGs9HLQa2dy4HFvCkz5fBEV76AU1FeFRwQGW97JY?cluster=devnet)

Backend на devnet: `make backend-devnet` (нужен `backend/.env` с program ID и `ORACLE_STATE_PUBKEY`). Проверено: сервис отправляет `update_price` в devnet; события `TokenCreated` декодируются из логов при минте (см. unit-тест `parse_token_created_reads_expected_fields`).

## Структура
- `program/` — Anchor workspace  
  - `programs/sol_usd_oracle` — хранит цену SOL/USD (decimals = 6)  
  - `programs/token_minter` — минтит SPL токены за комиссию в SOL, используя цену из oracle  
  - `tests/` — Anchor TS тесты  
- `backend/` — Rust сервис, который обновляет цену и слушает события `TokenCreated`
- `frontend/` — Remix hello-world (React Router)

## Быстрый старт (локально)

1. **Validator**: запустить `solana-test-validator` (или `make validator`). Для отображения имени, тикера и картинки токена в кошельке используйте валидатор с клоном Metaplex: `make validator-metaplex` (клон программы Token Metadata с mainnet). Убедитесь, что `~/.config/solana/id.json` есть и профинансирован (`solana airdrop 1000` при необходимости).

2. **Программы**: собрать и задеплоить (ID программ берутся из keypair в `program/target/deploy/`; при первом деплое выполните `anchor keys sync`, затем пересоберите):
   ```bash
   make build
   make deploy
   ```

3. **Инициализация**: один раз после деплоя инициализировать oracle и minter (скрипт выведет `ORACLE_STATE_PUBKEY` для `.env`):
   ```bash
   make init
   ```

## Деплой на Devnet

На фронте есть переключатель **Localnet / Devnet**. Для тестов на devnet:

1. Переключить CLI на devnet и пополнить кошелёк:
   ```bash
   solana config set --url devnet
   solana airdrop 2
   ```

2. Собрать и задеплоить на devnet:
   ```bash
   make deploy-devnet
   ```

3. Инициализировать оракул и минтер на devnet (один раз):
   ```bash
   make init-devnet
   ```

4. В приложении выбрать сеть **Devnet**, в кошельке переключиться на Devnet — можно минтить. На devnet Metaplex уже есть, картинка в кошельке может отображаться (если URI доступен по HTTPS).

4. **Backend**: скопировать `backend/.env.example` в `backend/.env`, подставить `ORACLE_STATE_PUBKEY` из вывода init-скрипта. Путь `BACKEND_KEYPAIR_PATH` поддерживает `~`:
   ```bash
   cd backend
   cargo run
   ```
   Сервис будет периодически вызывать `update_price` и слушать события `TokenCreated`, выводя их в stdout в JSON.

5. **Фронтенд** (опционально):
   ```bash
   cd frontend
   npm install && npm run dev
   ```
  Открыть http://localhost:7001.

6. **Тесты** (LiteSVM, без сети):
   ```bash
   cd program
   anchor test
   ```
   Или `yarn litesvm` для запуска только тестов в `tests/*.litesvm.ts`.

## Переменные окружения для backend

См. `backend/.env.example`. Основные:
- `SOLANA_RPC_HTTP`, `SOLANA_RPC_WS` — RPC локального валидатора или devnet/mainnet.
- `ORACLE_PROGRAM_ID`, `MINTER_PROGRAM_ID` — из `anchor keys list` (после деплоя).
- `ORACLE_STATE_PUBKEY` — PDA от seed `"oracle_state"`; выводится скриптом `program/scripts/init-local.js`.
- `BACKEND_KEYPAIR_PATH` — keypair администратора оракула (поддерживается `~`).
- Опционально: `MOCK_PRICE`, `PRICE_API_URL`, `PRICE_POLL_INTERVAL_SEC`.

## Метаданные токена (Metaplex)

При минте можно передать `name`, `symbol` и `uri` — контракт создаёт запись Metaplex Token Metadata (имя, тикер, картинка в кошельке). Если передать пустое имя, метаданные не создаются (подходит для localnet без Metaplex). Для отображения в кошельке поднимайте валидатор с клоном Metaplex: `make validator-metaplex`, затем деплой и `init` как обычно.

## Основные ограничения
- Все вычисления комиссии — integer math, `fee_lamports = mint_fee_usd * LAMPORTS_PER_SOL / price`.
- Oracle price и mint_fee_usd хранятся с точностью 10^6.
- Доступ к `update_price` только у oracle admin (backend keypair).
- `mint_token` падает, если `price == 0` или fee/supply некорректны.


---

## Порядок запуска (локально)

1. `solana-test-validator`
2. `cd program && anchor build && anchor deploy --provider.cluster localnet`
3. `cd program && node scripts/init-local.js` — скопировать `ORACLE_STATE_PUBKEY` в `backend/.env`
4. `cd backend && cargo run`
5. `cd frontend && npm run dev` — открыть в браузере и покликать.
