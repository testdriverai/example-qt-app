# How to Test a Qt Application



[![TestDriver running this test (sped up)](media/speedrun.gif)](https://console.testdriver.ai/replay/6ae0b7edc2408c0c2459ba0b?share=duyfBXembU94Xq4aGW2RTg)

*Sped up: idle time removed. Click to watch the full replay with step-by-step logs.*

This repo is the complete, runnable example from the TestDriver tutorial **[How to Test a Qt Application (No Object Names Required)](https://testdriver.ai/blog/test-qt-app)**. The post walks through every line.

## What the test does

Installs qBittorrent, opens Tools > Preferences, turns on the Web UI and changes its port from 8080 to 9090, saves, then reopens Preferences and checks the setting stuck.

It runs on a fresh cloud machine, installs the app the way a user would, and drives it from screenshots with plain-language steps. No selectors, test IDs or changes to the app.

## Run it

You need Node.js 20+ and a TestDriver API key (free to start at [console.testdriver.ai](https://console.testdriver.ai)).

```bash
git clone https://github.com/testdriverai/example-qt-app.git
cd example-qt-app
npm install
cp .env.example .env   # then paste your key into .env
npx vitest run
```

The run prints a link to its replay, so you can watch what happened.

## Run it in CI

[`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml) runs the test on every push and pull request using [`testdriverai/action`](https://github.com/testdriverai/action). Set up OIDC for your team, or add your key as a repository secret named `TD_API_KEY`. See [CI/CD](https://docs.testdriver.ai/ci-cd).

## Files

- [`tests/qt-app.test.mjs`](tests/qt-app.test.mjs): the test
- [`vitest.config.js`](vitest.config.js): Vitest with the TestDriver reporter
- [`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml): CI

## Learn more

- Tutorial: https://testdriver.ai/blog/test-qt-app
- Docs: https://docs.testdriver.ai/quickstart
- More examples: https://docs.testdriver.ai
