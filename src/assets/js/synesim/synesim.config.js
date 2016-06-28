var _ = require('underscore');

angular.module('synesim')
	.config(function($provide, $logProvider, $urlRouterProvider, $stateProvider) {

		//$logProvider.debugEnabled(false);

		$provide.decorator('synesim', function($delegate) {
			return _.extend($delegate, {
				text: require('./text-default.html')
			});
		});

		$provide.decorator('colorMapRemote', function($delegate) {
			return _.extend($delegate, {
				endpoint: window.ENV.synesim.endpoint
			});
		});

		$stateProvider
			.state('main', {
				url: '/',
				template: require('./main.html'),
				controller: 'synesimController'
			})
			.state('main.color-editor', {
				url: 'color-editor',
				template: '<synesim-color-map-editor color-map="colorMap"></synesim-color-map-editor>'
			})
			.state('main.text-editor', {
				url: 'text-editor',
				template: '<synesim-text-editor color-map="colorMap"></synesim-text-editor>'
			});

		$urlRouterProvider.otherwise('/text-editor');

	});