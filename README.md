# Skyrim Inventory Management Frontend

This is the rewritten frontend to Skyrim Inventory Management. The original frontend, which now runs on https://sim-legacy.danascheider.com, can be found at https://github.com/danascheider/sim_legacy_frontend. This rewrite has just begun and the README will be expanded with additional information as the app grows.

## Table of Contents

- [Overview](#overview)
- [Developer Information](#developer-information)
  - [Running Locally](#running-locally)
    - [Running the Back End](#running-the-back-end)
    - [Running the Front End](#running-the-front-end)
  - [Development Workflows](#development-workflows)
  - [Testing with Vitest](#testing-with-vitest)
  - [GitHub Actions](#github-actions)

## Overview

Skyrim Inventory Management is a split-stack app enabling users to manage inventory and tasks in Skyrim. This app is primarily intended for my personal use and anybody else should use at their own risk. The back end is available in [this repo](https://github.com/danascheider/skyrim_inventory_management) and runs in production at https://sim-api.danascheider.com. The SIM front end is the only authorised client at this time.

The front-end rewrite uses [Vite](https://vitejs.dev) (replacing the now-defunct `create-react-app`) with [React](https://reactjs.org) and [TypeScript](https://typescriptlang.org).

## Developer Information

### Running Locally

#### Running the Back End

In order to run the front end locally, you will need to run the backend on `http://localhost:3000`. Additional instructions are available in the README of the [backend repo](https://github.com/danascheider/skyrim_inventory_management).

#### Running the Front End

Before you can run the front end, you will need to install dependencies. Clone this repository, `cd` into it, and run:

```
yarn
```

You can run the front-end server using:

```
yarn dev
```

In keeping with Vite defaults, the SIM front end is configured to run on `http://localhost:5173` when you run this command. The API's [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy dictates that the front end must run on port 5173 in development.

### Development Workflows

We use [this Trello board](https://trello.com/b/Jo7Z3oUh/sim-project-board) to track work for both this app and the SIM API. When picking up a card, check out a development branch on your local to make the changes you need to make.

When you have finished the work, push to GitHub and make a pull request. Link the Trello card in the PR description. The PR description should also include:

- **Context:** Any information a reader will need to understand why you've made the changes you have
- **Summary of Changes:** A bulleted list summarising the changes you have made
- **Explanation:** A detailed explanation of any technical or design choices you made, tradeoffs you faced, and alternatives you considered, including enough detail to make sense to a reviewer or a future developer investigating Git history

All pull requests are expected to include updates to Storybook stories and developer and/or user documentation as appropriate. Storybook stories should cover any possible component states, such as loading states or states resulting from API error responses. API docs for the SIM API are available [in the docs directory](https://github.com/danascheider/skyrim_inventory_management/blob/main/docs/api/README.md) of that repo.

After creating your pull requests, attach them to the Trello card and move it into the "Reviewing" column. When your PRs have been reviewed, you are free to merge them.

### Testing with Vitest

[Vitest](https://vitest.dev/) has been set up with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to handle testing of components.

It is recommended, per the docs, to take a behaviour-based approach to testing, using the React Testing Library tooling to interact with elements like a user would. It's important that we write these tests with an eye to ensuring complete coverage of underlying logic, however. Not all of this logic will be in the components themselves, so we will need to simulate state that may not be directly testable.

To run the tests, you'll need to first run `yarn install` to make sure your dependencies are installed and up-to-date. To run the tests, run:

```
yarn test
```

This will run the tests in watch mode, running tests every time you save a file. You can press `q` to exit watch mode and go back to your terminal.

To get test coverage metrics, run:

```
yarn coverage
```

### GitHub Actions

Vitest has been configured to run in CI with GitHub actions. It runs against all pull requests against `main`, as well as when `main` is merged. After merging new code, make sure the build has passed before deploying to Heroku.

When working on an epic on a feature branch, you may want to configure GitHub Actions to run against PRs against the feature branch (or merges to that branch) and not just `main`. This can be done in the [pipeline definition file](/.github/workflows/ci.yml) by changing the following block:

```yml
on:
  push:
    branches: [main, your-feature-branch]
  pull_request:
    branches: [main, your-feature-branch]
```
