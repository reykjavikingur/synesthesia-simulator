# Synesthesia Simulator

"synesim" is an Angular application that simulates grapheme-color synesthesia.

See the DEMO: [https://reykjavikingur.github.io/synesthesia-simulator/#/]

## Usage

* `npm install`
* `npm start`

This will build assets from `src` to `dst`, start the local web server, and open your default browser.

### Development versus Production

In production mode (intended for continuous integration servers and deployments), no files are watched, no browser is automatically opened, and all task errors are fatal.

If you are in a development environment and want to run as production:

`NODE_ENV=production npm start`

### Changing port

To change the default port, either edit `tasks/config.js` or prefix the command with a variable, for example:

`PORT=8080 npm start`

### After Starting

Changes to files in `src` will trigger rebuilds (with gulp watch) and live reloads (with browser-sync).

Changes to files in `views` will be shown on the next manual reload.

## External Dependencies

You can add external dependencies from Bower and NPM.

### Bower

* install locally, e.g. `bower install --save jquery-ui`
* open the view where the script tag should be placed, e.g. `views/layouts/main.html`
* add the script tag, e.g. `<script src="/assets/vendor/js/jquery-ui.js"></script>`
* reload the page in the browser

### NPM

* install locally, e.g. `npm install --save zlib`
* require from any JS file in `src/assets/js`, e.g. `zlib = require('zlib')`
* restart the web server
* reload the page in the browser

## Files

The various kinds of source files are in `src`. The build tasks use them to generate artifacts in `dst`.

The URL path `/assets` is tied to the directory `dst/assets`.

### Miscellaneous

All files in `src/assets/misc` are copied without modification. These may include images, data, etc.

### Stylesheets

The SASS files in `src/assets/css` are compiled to CSS files in `dst/assets/css`. One CSS file is generated for each SASS file that does not begin with "_".

### Scripts

The JS file `src/assets/js/main.js` is the entrypoint to compile `dst/assets/js/main.js` with Browserify. The `require` statements determine what other files are included in the output.
