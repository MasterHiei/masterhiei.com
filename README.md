# masterhiei.com

<p>
 	  <a href="https://badge.fury.io/gh/MasterHiei%2Fmasterhiei.com" title="GitHub version"><img src="https://badge.fury.io/gh/MasterHiei%2Fmasterhiei.com.svg" alt="GitHub Version"></a>
  	<a href="https://circleci.com/gh/MasterHiei/masterhiei.com" title="build version"><img src="https://circleci.com/gh/MasterHiei/masterhiei.com.svg?style=shield" alt="Build Version"></a>
  	<a href="https://codecov.io/gh/MasterHiei/masterhiei.com" title="coverage status"><img src="https://codecov.io/gh/MasterHiei/masterhiei.com/branch/master/graph/badge.svg" alt="Coverage Status"></a>
  	<a href="https://david-dm.org/MasterHiei/masterhiei.com" title="dependencies status"><img src="https://david-dm.org/MasterHiei/masterhiei.com/status.svg" alt="Dependencies Status"></a>
  	<a href="https://standardjs.com" title="code style"><img src="https://flat.badgen.net/badge/code%20style/standard" alt="Code Style"></a>
  	<a href="https://github.com/MasterHiei/masterhiei.com" title="last commit"><img src="https://badgen.net/github/last-commit/MasterHiei/masterhiei.com" alt="Last Commit"></a>
</p>

## Introduction

> :beginner:Still developing. :zap:Powered by Nuxt.js, Express and TypeScript.

## Setup

> :warning:
> *You need to create a `.env` file on the root directory, and it will be loaded automatically.*
> *If you are not sure what you should do, please check the `.env.sample` file.*

``` bash
# install dependencies
$ yarn # or npm install

# serve with hot reload at http://localhost:3000(default)
$ yarn dev # or npm run dev

# lint code
$ yarn lint # or npm run lint

# test project
$ yarn test # or npm run test
```

## Optimization

- Reduce bundle size with webpack

> We used [**webpack-bundle-analyzer**](<https://github.com/webpack-contrib/webpack-bundle-analyzer>) to help us optimize our application bundle size.
>
> Run `$ yarn analyze`(or `$ npm run analyze`) to start local server, and create an interacive treemap like below.

- Before optimization

> ![**bundle-size-now**](<https://raw.githubusercontent.com/MasterHiei/Resources/master/bundle-before.png>)

- After optimization

> ![**bundle-size-now**](<https://raw.githubusercontent.com/MasterHiei/Resources/master/bundle-size-20190615.png>)

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
