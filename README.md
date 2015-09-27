# Learn node
A one day introductory workshop for Founders and Coders Cohort 6

By the end of this workshop you'll be able to answer the following questions:
* [ ] What is Node? Why do you need it?
* [ ] What is a server?
* [ ] What is npm? How do you use it?
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

Node has an asynchronous event-driven I/O model. Node is an interface to the V8 JavaScript runtime – the JavaScript interpreter that runs in the Chrome browser.

This is a pretty good intro video:  
[What is Node.js Exactly? - a beginners introduction to Nodejs](https://www.youtube.com/watch?v=pU9Q6oiQNd0)

Node v4.0.0 is now available and supports lots of ES6 features. If you want to learn ES6 Look up @benjaminlees tutorial!

### So what is a server??

***Servers*** are computer programs that receive requests from other programs, ***the clients*** and send back a response e.g share data, information or hardware and software resources.

## Installing Node

Download Node from the [NodeJS website](https://docs.npmjs.com/getting-started/installing-node)

### The interactive node.js shell

If node is installed properly, you should be able to invoke the interactive node.js shell like this:

```js
$ node
> console.log('Hello World');
Hello World
```

The shell is a great way to test simple one liners. In order to escape, simply press Ctrl + C.

## Node Modules and the Node Package Manager (NPM)

The npm website says:

> ***npm*** makes it easy for JavaScript
> developers to share and reuse code, and it
> makes it easy to update the code that
> you're sharing.

Node comes with npm installed however, npm gets updated more frequently than Node does so make sure it's the latest version.

Check the version
```js
$ npm --version
```

Then type:

```js
sudo npm install npm -g
```
By default, npm installs any dependency in the local mode. Here local mode refers to the package installation in node_modules directory lying in the folder where Node application is present. The `-g` flag means npm will be installed globally so not just for a particular project.

Now you can use npm to create and install external modules for your projects.

### Creating a new NodeJS projects

Type this command into your terminal in the folder you want to create the project.

```js
npm init

```

This takes you through the process of creating a file called a `package.json` which is a json object that contains information about your project and its dependancies. It looks a bit like this:

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
  "homepage": "https://github.com/nikhilaravi/autocomplete",
  "dependancies": {
    "node":
  }
}

```

Key attributes:

name - name of the package

version - version of the package

description - description of the package

homepage - homepage of the package

author - author of the package

contributors - name of the contributors to the package

dependencies - list of dependencies. npm automatically installs all the dependencies mentioned here in the node_module folder of the package.

repository - repository type and url of the package

main - entry point of the package

keywords - keywords

IMPORTANT THINGS TO REMEMBER:

* You can't add comments to a .json file!
* Watch out for trailing commas in your json object!

### Installing node modules

```js
npm install <NAME OF MODULE> --save

```

This installs the node modules files into a folder called `node_modules` and saves the name of the module into the `dependancies` in the package.json.

The version of the module is also shown using the ['Semver Rule'](https://docs.npmjs.com/getting-started/semantic-versioning)

Remember to add `node_modules` to your `.gitignore` file so you don't push all the node module files up to Github!

When you clone a NodeJS project or pull down the latest version of your project from GitHub you should install any new node modules using the command.

```js
npm install

or

npm i
```

This installs the modules listed in your package.json to the node_modules folder.

Once the package is in the `node_modules` folder, you can use it in your code.

```
var mandrill = require('mandrill'); //Mandrill is a module for setting up an email client

```

## Structuring a module

Good practice for modules is to create one object in your file that contains all the methods and return only the methods. This way all the variables aren't exposed.

```js
var MyModule = {

  textOne: "Hello",
  textTwo: "World",

  One: function() {
    console.log(textOne);
  },

  Two: function() {
    console.log(textOne);
  },

  return {
    One: One,
    Two: Two
  }
}
```
To enable the functions to be used by other files, you need to export the object. Save this file as e.g. myModule.js. Other files can then import this file and use the methods returned.

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

Inside the call to `require`, the relative path to the file needs to be specified:

```js
./[filename] for a file in the same directory
../[filename] for a file in the directory above the current file
```
Relative paths are explained in more detail in the [Node Docs](https://nodejs.org/api/modules.html#modules_file_modules)

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

First import the 'fs' core node module. This allows reading and writing to the file system.

We read in the index.html file and save it as a variable.

`__dirname` is used to get the directory name  

```js
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');
```


# Extensions

## Event Loop and EventEmitters



## Streams

Look up the CreateReadableStream and CreateWritableStream functions

## Install the NodeJS version manager module

`npm install -g n`

Use this to set which version of node you are running. In the future you may want to switch between versions of node or use io.js and you can easily do this by typing 'n' into the terminal and toggling the up and down arrows.

## Environment variables

If you are using APIs you don't want to push the API Keys up to Github. To keep the keys secret we want to save them as environment variables.

Start by creating a `.env` file in the root of your project. Add the API keys as key-value pairs in the following format

```js
CLIENT_ID=1234567890
CLIENT_SECRET=987654321
```

Then install the `env2` npm module created by @nelsonic!

```js

npm install --save env2

```

Require the `env2` module into your server file.
