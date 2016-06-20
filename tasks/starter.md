# Front End Starter Tool

The `front-end-starter` repo holds the project boilerplate and is intended to be forked and customized.

## TODO

Here is a list of planned improvements to the tool itself:

* add more starter templates in views
* include html 5 boilerplate code
* minify JS while preserving chrome dev tools breakpoint functionality (gulp-uglify ruined it)
* add linting tasks
* automate more of the initial detachment that must happen after forking
* fix the bug where browser auto-opens before browser-sync has started (throwing 404's for /browser-sync url's)
* use the package name instead of "main" for the generated JS and CSS artifacts (modify gulp tasks and main layout)
* make the web server auto-restart on server-side script changes (e.g. with nodemon or something)
* add task to generate documentation
* enable creation of integration guide (analogous to style guide)
* add out-of-the-box support for angular (possibly in a separate branch)
* add end-to-end testing
* add automated unit testing with jasmine/karma/phantomjs
* use port scanning when port is not configured
* add IDE configuration and support for standard code auto-formatting (.editorconfig)
