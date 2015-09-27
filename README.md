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

Node has an asynchronous, event-driven I/O model. Node is an interface to the V8 JavaScript runtime – the JavaScript interpreter that runs in the Chrome browser.

This is a pretty good intro video:  
[What is Node.js Exactly? - a beginners introduction to Nodejs](https://www.youtube.com/watch?v=pU9Q6oiQNd0)

Node v4.0.0 is now available and supports lots of ES6 features.
(ES6 - aka ECMAScript 6 or ECMAScript 2015 - is a newer version of JavaScript with a bunch of new features.  It's not 100% supported everywhere yet, but it will be eventually).

If you want to learn ES6 Look up [@benjaminlees](https://github.com/nelsonic)'s [tutorial](https://github.com/benjaminlees/Es6)!

### So what is a server? And why do I need one?

***Servers*** are computer programs that receive requests from other programs, ***the clients*** and send back a response e.g share data, information or hardware and software resources.

In a typical web app a server could perform some of these functions:

* Handle manipulation of data in the database
* File manipulation
* Authentication
* Lots of secret logic

Client side code sends requests to a server which sends back data to the front end which can then be displayed.

Front end Javascript is executed in the site visitor's browser whereas server-side code runs on a site's web server

## Installing Node

Download Node from the [NodeJS website](https://docs.npmjs.com/getting-started/installing-node)

### The interactive node.js shell

If node is installed properly, you should be able to invoke the interactive node.js shell by typing `node` into the command line. You can then type any Javascript code and it will be executed.

```js
$ node
> console.log('Hello World');
Hello World
```

The shell is a great way to test simple one liners. In order to escape from the shell, simply press Ctrl + C.

## Node Modules and the Node Package Manager (NPM)

Modules are just small programs you can integrate with the bigger program you are writing.

'Core' Node modules come with Node automatically.  But there are thousands of open-source, 3rd-party Node modules that other clever people have written.  You can download useful 3rd-party modules (packages) from the Node Package Manager.

The NPM website says:

> ***npm*** makes it easy for JavaScript
> developers to share and reuse code, and it
> makes it easy to update the code that
> you're sharing.

Node comes with npm installed.  However, npm gets updated more frequently than Node does so make sure it's the latest version.

Check the version

```js
$ npm --version
// the version should be 3.3.4
```

If it is not the latest version then type:

```js
sudo npm install npm -g
```

By default, npm installs any dependency in the local mode -  the node_modules directory in the folder where Node application is present. The `-g` flag means npm will be installed globally so not just for a particular project.

Now you can use npm to create and install external modules for your project!

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
  "engines": {
    "node": ">= 0.10"
  },
  "dependancies": {
     "pre-commit": "^1.0.7"
  }
}

```
The package.json is the file that makes it possible for others to install and run your project, once you've built it.  When someone installs your project, npm will look through the package.json and install any modules that your project depends on, hence the name *dependencies*.

Key attributes in the package.json:

* name
* version
* description
* homepage
* author
* contributors
* scripts - these are commands that you define. You can run them from the command line using `npm run <NAMEOFSCRIPT>`. We'll use this to run tests and start our server
* dependencies
* repository - repository type and url of the git repository
* main
* keywords

Remember:

* You can't add comments to a .json file!
* Watch out for trailing commas in your json object as this will cause errors when trying to `npm install`!

### Installing new node modules

```js
npm install <NAME OF MODULE> --save

```

This creates a folder called `node_modules` within your project and installs the node module's files in it.  The `--save` flag saves the name of the module into the `dependencies` in the package.json.  You can leave out the `--save` flag, but then you would have to remember to add the module to your package.json manually.

The version of the module is also shown using the ['Semver Rule'](https://docs.npmjs.com/getting-started/semantic-versioning)

Remember to add `node_modules` to your `.gitignore` file so you don't push all the node module files up to Github!  The package.json is all someone would need to run your project. Once the package is in node_modules, you can use it in your code.

When you clone a Node.js project or pull down the latest version of your project from GitHub you should install any new node modules using the command.

```js
npm install

or

npm i
```

This installs the modules listed in your package.json to the node_modules folder e.g.

```
var mandrill = require('mandrill'); //Mandrill is a module for setting up an email client

```

## Structuring a module

Good practice for modules is to create an object in your file with an immediately invoked function (IIFE) that returns only the methods. This way all the variables aren't exposed and can't be modified by other files.

```js
var Library = (function() {
  var books = {
    "Emma": {
      author: 'Jane Austen',
      published: 'December 25, 1815'

    },
    "Harry Potter and the Goblet of Fire": {
      author: 'JK Rowling',
      published: 'July 8, 2000'
    }
  };

  function getBookAuthor = function(name) {
    return books[name].author
  };

  function getDatePublished = function() {
    return books[name].published
  };

  return {
    getBook: getBook,
    getDatePublished: getDatePublished
  }

}());

```
To enable the functions to be used by other files, you need to export the object. Save this file as e.g. library.js. Other files can then import this file and use the methods returned.

Add this line to the end of library.js:

```js

module.exports = Library;

```

In another file:

```js
var Library = require('./library.js');

Library.getBookAuthor("Emma");

```
Node modules and Javascript files do not need an extension (e.g. 'js') when being specified inside `require()`.  However it can be helpful to add '.js' to the end of your local javscript files so it's easier to differentiate between your own files and node modules.

E.g.

```
var http = require('http');
var myFile = require('myFile.js');

```

Inside the call to `require`, the path to the file needs to be specified.

> A required module prefixed with '/' is an absolute path to the file. For > example, require('/home/marco/foo.js') will load the file at /home/marco/foo.js.

> A required module prefixed with './' is relative to the file calling > require(). That is, circle.js must be in the same directory as foo.js for > require('./circle') to find it.

Use the '../' prefix for a file in the directory above the current file.

Relative paths are explained in more detail in the [Node Docs](https://nodejs.org/api/modules.html#modules_file_modules)

## Create your first http server!

Node.js has several modules compiled into the binary e.g. 'http', 'fs', . These are called 'core modules'.  

Core modules are always preferentially loaded.  For instance, require('http') will always return the built in HTTP module, even if there is a file by that name.

Create a file called server.js and add the following code:

```js
var http = require('http');

// set the port for the server
var port = process.env.PORT || 8000;
```

```js

function handler(request, response) {
    //display 'HELLO WORLD' when the user is on the home page
    var url = request.url; //e.g. '/'
    if (url.length === 1) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("HELLO WORLD!");
  }
}

http.createServer(handler).listen(port);

console.log('node http server listening on http://localhost:' + port);
```

Inside the call to `http.createServer()' we pass in a handler function that gets called every time someone connects to the app. The function takes two parameters:

* ***request*** - this object contains the information about what the visitor asked for including  name of the page that was requested, the settings, and any fields filled in on a form.

* ***response*** - this is the object which contains the information that you send back to the user.

`res.writeHead(200)` sends back a status code of 200 in the response header to say that everything is okay.

Now start the server! In the command line type:

```js
node server.js
```

In the browser navigate to `http://localhost:8000`. You should see your 'Hello world' message!

## Reading from the file system

We're going to create an index.html file and then serve it up when the user navigates to the home page. You can use the template below or create your own!

```js
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello</h1>
    <img src="http://www.harmonycentral.com/forum/filedata/fetch?id=31139011&d=1398720429"/>
  </body>
</html>
```

Back to our server file. Import the 'fs' core node module - this allows reading and writing to the file system.

Then read in the index.html file and save it as a variable. `__dirname` is used to get the name of the directory that the currently file resides in.

```js
var fs = require('fs');
var index = fs.readFileSync(__dirname + '/index.html');
```

Then send back the html file in the response. Change the call to `res.end` to be:

```js
res.end(index)
```

Restart the server and you should see the page from index.html!

## Server Routes

For different requests you might want to carry out diferent functions or retrive specific data. These can be specified through the URL of the request and you can create specific routes in your server to handle these requests.

Lets look at an example:

You have a button that when clicked sends an http request to /cat on the client side. It might look something like this:

```js
var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if(request.readyState === 4) {
        displayImage(request.responseText);
      };
  };
  request.open("GET", "/cat", true);
  request.send();
```

On the server you would look at the url of the request:

```js
function(request, response) {
  var url = request.url
  if (url.indexOf('/cat') > -1) {
    // check if the url contains /cat and if so send back a link to a cat image e.g. from a database or an API
    res.end("http://charts.stocktwits.com/production/original_24310845.jpg?1404265667")    
  }
}
```

You can also have nested urls e.g. /cat/lion. In the server you can split the request url to get this additional information:

```js
var type = url.split('/')[2].toString();

```

## Generic route handler

When you add css or js files in your index.html they won't load the same was as just a pure front end app. You need to create a route in your server to serve these files

```js
fs.readFile(__dirname + url, function(err, file){
      if (err){
          response.end();
      } else {
          var ext = url.split('.')[1];
          response.writeHead(200, {'Content-Type' : 'text/' + ext});
          response.end(file);
  }
}
```

## Nodemon

Instead of having to restart the server every time you change any of your code you can install a module that will monitor for any changes in your javascript files and automatically restart the server!

```js
npm install -g nodemon
```

In the scripts part of your package.json add the following line:
```js
 "start": "nodemon server.js"
 ```

 You can then start the server by typing `npm start` in the command line.

# Extensions

## Event Loop and EventEmitters

If you make a post request and send some data with the request you need a way of reading the data on the server side. For this you need to listen for the 'data' event on the request.

```js
var requestData = '';
request.on('data', function(chunk) {
    requestData += chunk;
});
```

## Environment variables

If you are using APIs, you don't want to push the API Keys up to Github. To keep the keys secret we want to save them as environment variables.

Follow [@nelsonic](https://github.com/nelsonic)'s tutorial to learn how this works!
[https://github.com/dwyl/learn-environment-variables](https://github.com/dwyl/learn-environment-variables)

## Install the Node.js version manager module

`npm install -g n`

Use this to set which version of node you are running. In the future you may want to switch between versions of node or use io.js and you can easily do this by typing 'n' into the terminal and toggling the up and down arrows.
