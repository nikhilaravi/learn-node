# Learn node
A one day introductory workshop for Founders and Coders Cohort 6

By the end of this workshop you'll be able to answer the following questions and do the following things:
* [ ] What is Node? Why do you need it?
* [ ] How to install Node
* [ ] What is npm? How do I use it?
* [ ] What are node modules?
* [ ] How to install node version manager
* [ ] What is a package.json?
* [ ] What are the CommonJS pattern, Module exports and require?
* [ ] How to structure a module
* [ ] How to create a node server. Hello world!
* [ ] How to read and write from the file system
* [ ] How to use 'nodemon' for your development environment
* [ ] How to create a route for your server
* [ ] How to use callbacks


## What is Node?


## Installing Node

Download Node from the [NodeJS website](https://nodejs.org/en/)

## Node Modules and the Node Package Manager (NPM)

Use npm to create and install external modules for your projects

### Creating a new NodeJS projects

Type this command into your terminal in the folder you want to create the project.

```js
npm init
```

This creates a file called a `package.json` which is a json object that contains information about your project and its dependancies. It looks a bit like this:

```js
{
  "name": "autocomplete-nikki",
  "version": "1.0.2",
  "description": "find words in English dictionary with autosuggestion!",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "test": "node test/test.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/nikhilaravi/autocomplete.git"
  },
  "keywords": [
    "autocomplete",
    "english",
    "dictionary",
    "suggestions"
  ],
  "author": "nikhilaravi",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/nikhilaravi/autocomplete/issues"
  },
  "homepage": "https://github.com/nikhilaravi/autocomplete"
}

```

### Installing node modules

```js
npm install <NAME OF MODULE> --save
```

This installs the node modules files into a folder called `node_modules` and saves the name of the module into the `dependancies` in the package.json

When you clone a nodeJS project or pull down the latest version of your project from GitHub you should install any new node modules using the command.

```js
npm install

or

npm i
```

This installs the modules listed in your package.json

Remember to add `node_modules` to your `.gitignore` file so you don't push all the node module files up to Github!

## Structuring a module

Create one object in your file that contains all the methods and return only the methods, so all the variables aren't exposed.

```js
var MyModule = {

  One: function() {

  },

  Two: function() {

  },

  return {
    One: One,
    Two: Two
  }
}

```

```js
module.exports = MyModule
```

## Install the NodeJS version manager module

`npm install -g n`

Use this to set which version of node you are running.
