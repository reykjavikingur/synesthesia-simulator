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
			});

		$urlRouterProvider.otherwise('/');

	});