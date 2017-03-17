# react-starter-kit
react-starter-kit is a React starter kit based on the Atomic Design methodology. It's progressive, which means that you can start with the basic boilerplate and try the other features when you are comfortable.

## Why

React encourages you to create very small and pure components. However, as your project grows, you will have an increasingly complex components folder. At some point, this will be really huge and hard to maintain.

The [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) approach comes handy to solve this problem because it considers the reusability through composition, *which is actually what React is*. You will have your minimal/stylish components in one folder, pages in another and so on.

## Download

Just clone the repository and remove the `.git` folder:

```sh
$ git clone https://github.com/masood09/react-starter-kit.git my-app
$ cd my-app
$ rm -rf .git
$ yarn install # or npm install
```

## Usage

### Run

Once you have installed the dependencies, you can use `npm start` to run a development server.

### Deploy

Use `npm run build` to transpile the code into the `dist` folder. Then, you can deploy it everywhere.

### Source code

The source code should be placed in `src`; public/static files should be placed in `public` so they can be included in the build process.

Because of [webpack's config](https://github.com/diegohaz/arc/blob/5c752968c52d013f7218b514021eae08f6ddf07c/webpack.config.js#L19-L21), we can import our source modules without relative paths.
```js
import { Button, HomePage } from 'components' // src/components
import App from 'components/App' // src/components/App
import routes from 'routes' // src/routes
```

### Components

This project leverages the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) methodology to create a scalable and easy to maintain component folder structure.

However, Atomic Design should be a solution, **not another problem**. If you want to create a component and don't know where to put it (`atoms`, `molecules`, `organisms` etc.), **do not worry, do not think too much, just put it anywhere**. After you realize what it is, just move the component folder to the right place. Everything else should work.

This is possible because all components are dynamically exported on [`src/components/index.js`](src/components/index.js) and imported in a way that Atomic Design structure doesn't matter:

```js
import { Button, Hero, HomePage, PageTemplate } from 'components'
```

To better understand the Atomic Design methodology, you can refer to the [`src/components`](src/components) folder here. Basically, you can think this way:

- An **atom** is a native html tag or a React Component that renders an html tag (e.g an Input component);
- A **molecule** is a group of atoms (e.g. an InputField component);
- An **organism** is a group of atoms, molecules and/or other organisms (e.g. an Form component);
- A **page** is... a page, where you will put mostly organisms (e.g. an Page component);
