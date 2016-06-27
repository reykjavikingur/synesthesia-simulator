var _ = require('underscore');

angular.module('synesim')
	.config(function($provide, $logProvider, $urlRouterProvider, $stateProvider) {

		//$logProvider.debugEnabled(false);

		$provide.decorator('synesim', function($delegate) {
			return _.extend($delegate, {
				endpoint: '/assets/misc/json/color-map.json'
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
				template: 'color editor'
			})
			.state('main.text-editor', {
				url: 'text-editor',
				template: '<synesim-text-editor color-map="colorMap"></synesim-text-editor>'
			});

		$urlRouterProvider.otherwise('/');

	});