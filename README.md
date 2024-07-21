### Running locally

1. Clone:

```bash
git clone git@github.com:01zulfi/fast-buy-fake-store.git
```

2. Create `.env` with the following:

```txt
# postgresql database connection url
DB_URL=""

# optional
# currently a work in progress
LEMON_SQUEEZY_API_KEY=""
LEMON_SQUEEZY_STORE_ID=""
```

3. Install deps:

```bash
npm install
```

4. Run dev server:

```bash
npm run dev
```