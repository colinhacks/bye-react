# bye-react

Made by [@vriad](https://twitter.com/vriad)

Migrate your project from [React](https://github.com/facebook/react) to [Preact](https://github.com/developit/preact) with a single command. 
More specifically, this tool switches the project over to [preact-compat](https://github.com/developit/preact-compat), the "compatibility layer that makes React-based modules work with Preact, without any code changes". After running the command below, no code changes should be necessary for your project to run successfully.

## Disclaimers
1.  Requires usage of Webpack, Browserify, or the Babel React preset (or any combination thereof). If you don’t use any of these, this won't work. Also you should probably be using one of these.
2. Not guaranteed to work in all cases. You should be using a version of React that is compatible with the current stable release (@15.6.1). May interact in interesting and unfortunate ways with non-standard build pipelines (e.g. if you dynamically generate .babelrc or package.json, etc).
3. Will delete comments inside package.json and .babelrc files. These files contain JSON-compliant data. To add the aliases, bye-react reads in the JSON, modifies it, and writes it back to disk. Comments are lost en route. If these are important to you then don't use bye-react.

## Usage
#### Install
`npm install -g bye-react` 

or

`yarn global add bye-react`

#### Usage
`cd ~/your/react/project`

`bye-react`

#### Undoing
When you first run `bye-react` backups are made of all config files modified by this tool. Running these undo commands restores these files to their original state. It also uninstalls preact and reinstalls react and react-dom.
`bye-react -u`

or

`bye-react --undo`

## How It Works
1. Uninstalls react and react-dom.
2. Installs preact and preact-compat (obviously) via npm (or yarn, if a Yarn lockfile is detected)
3. Checks for usage of [Webpack](https://github.com/webpack). If detected,  an alias is added to webpack.config.js. Specifically [these lines](lib/mod/webpackAliasLines.js) are appended to the end of the file.
4. Checks for usage of [Babel’s React preset](https://babeljs.io/docs/plugins/preset-react/). If detected, [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) is installed and used to create an alias in .babelrc
5. Checks for usage of Browserify. If detected, [aliasify](https://github.com/benbria/aliasify) is installed and used to create an alias in package.json.
