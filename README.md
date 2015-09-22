# Learn node
A one day introductory workshop for Founders and Coders Cohort 6

By the end of this workshop you'll be able to answer the following questions:
* [ ] What is Node? Why do you need it?
* [ ] What is a server?
* [ ] What is npm? How do I use it?
* [ ] What are node modules?
* [ ] What is a package.json?
* [ ] What are the CommonJS pattern, Module exports and require?
* [ ] What is a module?

We'll be doing the following things:
* Installing node
* Creating a basic 'Hello world' node server
* Learning how to use the 'fs' core module to read and write from the file system
* Setting up 'nodemon' for your development environment
* Creating a route for your server
* Implementing Callbacks

## What is Node?

In one sentence it's 'Javascript for the server'!!

Wikipedia says:

> Node.js is a packaged compilation of
> Google’s V8 JavaScript engine, the libuv
> platform abstraction layer, and a core library, which is itself primarily written in JavaScript.

Node has an asynchronousevent-driven I/O model. Node is an interface to the V8 JavaScript runtime – the JavaScript interpreter that runs in the Chrome browser.

This is a pretty good intro video:  
[What is Node.js Exactly? - a beginners introduction to Nodejs](https://www.youtube.com/watch?v=pU9Q6oiQNd0)

Node v4.0.0 is now available and supports lots of ES6 features. .

### So what is a server??

***Servers*** are computer programs that receive requests from other programs, ***the clients*** and send back a response e.g share data, information or hardware and software resources.

## Installing Node

Download Node from the [NodeJS website](https://docs.npmjs.com/getting-started/installing-node)

## Node Modules and the Node Package Manager (NPM)


> ***npm*** makes it easy for JavaScript
> developers to share and reuse code, and it
> makes it easy to update the code that
> you're sharing.


Node comes with npm installed but However, npm gets updated more frequently than Node does so make sure it's the latest version.

```js
sudo npm install npm -g

```

Use npm to create and install external modules for your projects.

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

This installs the node modules files into a folder called `node_modules` and saves the name of the module into the `dependancies` in the package.json.

The version of the module is also shown using the ['Semver Rule'](https://docs.npmjs.com/getting-started/semantic-versioning)

When you clone a nodeJS project or pull down the latest version of your project from GitHub you should install any new node modules using the command.

```js
npm install

or

npm i
```

This installs the modules listed in your package.json to the node_modules folder.

Remember to add `node_modules` to your `.gitignore` file so you don't push all the node module files up to Github!

Once the package is in node_modules, you can use it in your code.

```
var http = require('http');

```

## Structuring a module

Create one object in your file that contains all the methods and return only the methods, so all the variables aren't exposed.

```js
var MyModule = {

  One: function() {
    console.log('one');
  },

  Two: function() {
    console.log('two');
  },

  return {
    One: One,
    Two: Two
  }
}
```
To enable the functions to be used by other files, export the object. Save this file as e.g. myModule.js. Other files can then import this file and use the methods returned.

Add this line to the end of myModule.js:

```js
module.exports = MyModule;

```

In another file:

```js
var MyModule = require('./myModule.js');

MyModule.One();

```
Node modules and Javascript files do not need an extension (e.g. 'js') when being specified inside `require()`.  However it can be helpful to add '.js' to the end of your local javscript files so it's easier to differentiate between your own files and node modules.

E.g.

```
var http = require('http');
var myFile = require('myFile.js');

```

Inside `require` the relative path to the file needs to be specified:

```js
./[filename] for a file in the same directory
../[filename] for a file in the directory above the current file
```
This is explained in more detail in the [Node Docs](https://nodejs.org/api/modules.html#modules_file_modules)

## Install the NodeJS version manager module

`npm install -g n`

Use this to set which version of node you are running.

## Create your first http server!

Node.js has several modules compiled into the binary e.g. 'http', 'fs', . These are called 'core modules'.  
Core modules are always preferentially loaded.  For instance, require('http') will always return the built in HTTP module, even if there is a file by that name.

```js
var http = require('http');

// set the port for the server
var port = process.env.PORT || 3000;
```

```js
http.createServer(function handler(request, response) {
    //display 'HELLO WORLD' when the user is on the home page
    var url = request.url; //e.g. '/'
    if (url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("HELLO WORLD!");
  }
}).listen(port);

console.log('node http server listening on http://localhost:' + port);
```


## Reading from the file system

We're going to create an index.html file and then serve it up when the user navigates to the home page.

First import the 'fs' core node module.

```js
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');
```
