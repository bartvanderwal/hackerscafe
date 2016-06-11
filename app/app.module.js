(function() {
    angular.module('app', [
        // 'ui.bootstrap',
        // 'ow.meetup-list',
        'rmMeetup'
    ])

    angular.module('app')
    .config(['rmConsumerProvider',
            function(rmConsumerProvider) {
                rmConsumerProvider.setKey('mtgd2br364083o93siu5bkplia');
                // rmConsumerProvider.setRedirectURI('http://localhost:8081');
                rmConsumerProvider.setRedirectURI('http://www.itoffthewall.nl/hackerscafe');
            }
        ]
    );
}());