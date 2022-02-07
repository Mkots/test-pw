# Implementation of 4/5 test cases.

**Playwright** and **Playwright-test** were used for the implementation, the tests are run serially, since I had only one account, and the tests are related.

# Run it on CI
Tests running is set up by **GH Actions**, the environment variables are set in `Secrets`

# To run it local
1. Clone repo and open containing folder:
```bash 
git clone https://github.com/Mkots/test-pw.git
cd pw-test
```

2. Install dependencies:
```bash
npm ci 
```

3. Create localise account on staging server
4. Create API token on staging server
5. Edit `"test"` script to add `env` variables:
```json
{
  "scripts": {
    "test": "USER_EMAIL=<user@email.com> USER_PASSWORD=<user password> API_TOKEN=<user API token> playwright test"
  }
}
```
6. Run tests:
```bash
npm run test 
```
