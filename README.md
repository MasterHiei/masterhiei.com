# masterhiei.com

<p>
 	  <a href="https://badge.fury.io/gh/MasterHiei%2Fmasterhiei.com" title="build version"><img src="https://badge.fury.io/gh/MasterHiei%2Fmasterhiei.com.svg" alt="Build Version"></a>
  	<a href="https://circleci.com/gh/MasterHiei/masterhiei.com" title="build status"><img src="https://circleci.com/gh/MasterHiei/masterhiei.com.svg?style=shield" alt="Build Status"></a>
  	<a href="https://codecov.io/gh/MasterHiei/masterhiei.com" title="coverage status"><img src="https://codecov.io/gh/MasterHiei/masterhiei.com/branch/master/graph/badge.svg" alt="Coverage Status"></a>
  	<a href="https://codebeat.co/projects/github-com-masterhiei-masterhiei-com-master" title="code quality"><img src="https://codebeat.co/badges/e2d358d0-53ad-4759-b3d1-12a3c13f3882" alt="Code Quality"></a>
  	<a href="https://david-dm.org/MasterHiei/masterhiei.com" title="dependencies status"><img src="https://david-dm.org/MasterHiei/masterhiei.com/status.svg" alt="Dependencies Status"></a>
  	<a href="https://github.com/MasterHiei/masterhiei.com" title="last commit"><img src="https://badgen.net/github/last-commit/MasterHiei/masterhiei.com" alt="Last Commit"></a>
  	<a href="https://standardjs.com" title="code style"><img src="https://flat.badgen.net/badge/code%20style/standard" alt="Code Style"></a>
</p>

## Introduction

:beginner:Still developing. :zap:Powered by Nuxt.js, Express and TypeScript.

## Setup

:warning:*You need to create a `.env` file on the root directory, and it will be loaded automatically.* 

> *If you are not sure what you should do, see [.env.example](https://github.com/MasterHiei/masterhiei.com/blob/master/.env.example) for more information.*

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

## Directory Structure

- Directories

  ```bash
  masterhiei.com
  |
  |── .circleci 
  |  |
  |  |── config.yml                    # CircleCI configuration file
  |
  |── client                           # The base directory of Nuxt.js
  |
  |── server                           # The base directory of Express
  |
  |── types                            # Contains TypeScript difinition file
  |
  |── .editorconfig                    # Coding style configuration file of editor
  |
  |── .env                             # Store environment variables
  |
  |── .eslintrc.yml                    # ESLint configuration file
  |
  |── .gitattributes                   # Use same EOL in different OS
  |
  |── .gitignore                       # Ignoring files in Git
  |
  |── .prettierrc.json                 # Prettier configuration file
  |
  |── nodemon.json                     # Nodemon configuration file
  |
  |── nuxt.config.ts                   # Nuxt.js configuration file
  |
  |── package.json                     # Manage project dependencies
  |
  |── tsconfig.json                    # TypeScript configuration file
  |
  |── yarn.lock                        # Yarn lock file
  ```
  
  For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org) and [Express.js docs](https://expressjs.com).

## Optimization

- Reduce bundle size with webpack

  [**webpack-bundle-analyzer**](https://github.com/webpack-contrib/webpack-bundle-analyzer) help us optimize our application bundle size.

  Run `$ yarn analyze`(or `$ npm run analyze`) to start local server, and create an interactive treemap.

- Examples

  For example, in the following graph, you will know who is the fattest boy in your project, and you can do anything to make them better also.

  - Before optimization

    ![**bundle-size-now**](<https://raw.githubusercontent.com/MasterHiei/Resources/master/bundle-before.png>)

  - After optimization

    ![**bundle-size-now**](<https://raw.githubusercontent.com/MasterHiei/Resources/master/bundle-size-20190615.png>)