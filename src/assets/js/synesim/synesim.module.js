angular.module('synesim', ['ui.router', 'mp.colorPicker']);

require('./synesim.config');
require('./synesim.run');
require('./synesim.controller');
require('./synesim.service');
require('./color-map-preview.directive');
require('./color-map-editor.directive');
require('./text-renderer.directive');
require('./text-editor.directive');