(function() {
    angular.module('app').controller('MeetupListController', MeetupListController);

    // Key: mtgd2br364083o93siu5bkplia
    // Secret: 5e64aveq9dia15flc7deomvcrj
    // Website: https://www.facebook.com/webdevelopersheuvelrug
    // Redirect URI: localhost

    // API key: d5e211c606d3c6658145f642e2e2d25
    MeetupListController.$inject = ['$http', '$interval', '$scope', '$timeout', 'rmMeetupRSVPsService'];
    function MeetupListController($http, $interval, $scope, $timeout, rmMeetupRSVPsService) {
        var vm = this;
        var meetupApiUrl = 'api.meetup.com';
        var attendanceUrl = meetupApiUrl + '/Web-Developers-Heuvelrug/events/231065621/attendance'
        $scope.$watch('vm.currentRsvpIndex', function(newValue, oldValue) {
            if (vm.rsvps && (!vm.currentRsvp || newValue!=oldValue)) {
                vm.currentRsvp = vm.rsvps[vm.currentRsvpIndex];
            }
        });

        vm.nextRsvp = function() {
            var currentRsvpEl = angular.element(document.querySelector('#currentRsvp'));
            currentRsvpEl.addClass('incoming');
            $timeout(function() {
                vm.currentRsvpIndex = (vm.currentRsvpIndex+1) % vm.rsvps.length;
                currentRsvpEl.removeClass('incoming');
            }, 500);
        }

        // vm.getRsvps();
        vm.autoNextRsvp = null;
        $scope.$watch('vm.doAutoNextRsvp', function(doAutoNext, oldValue) {
            if (!vm.autoNextRsvp || doAutoNext!=oldValue) {
                toggleAutoNext(doAutoNext);
            }
        });
        vm.doAutoNextRsvp = true;
        toggleAutoNext(vm.doAutoNextRsvp);
        function toggleAutoNext(doAutoNext) {
            if (doAutoNext) {
                vm.autoNextRsvp = $interval(vm.nextRsvp, 3000);
            } else {
                if (vm.autoNextRsvp) {
                    $interval.cancel(vm.autoNextRsvp); 
                }
            }
        }
        vm.isDebug = false;
        vm.meetupToken = '';
        vm.expiresIn = '';
        vm.meetupToken = '';
        vm.meetupEventId = '231065621';

        vm.getRsvps = function() {
            // Als er al een meetup token is, haal dan recente via meetup API.
            if (vm.meetupToken && !vm.isExpired) {
                rmMeetupRSVPsService.getByEventId(vm.meetupToken, vm.meetupEventId).then(function(result) {
                    vm.rsvps = result.results;
                });
            // Gebruik anders de gachte versie.
            } else {
	            $http.get('data/example-meetup-list.json').then(function(result) {
                    vm.rsvps = result.data;
                });
            };
        };
        vm.isExpired = true;

        // Try and get values from localstorage - IF localstorage is supported.
        if (localStorage) {
            vm.meetupToken = localStorage.meetupToken;
            if (vm.meetupToken) {
                vm.expiresIn = localStorage.expiresIn;
                vm.dateTimeTokenRetrieved = new Date(localStorage.dateTimeTokenRetrieved);
                determineTokenExpiration();
                if (!vm.isExpired) {
                    vm.getRsvps();
                }
            }
        }

        vm.refresh = function(token, expiresIn) {
            $scope.$apply(function() {
                // Store token and expiration in viewmodel for direct use.
                vm.meetupToken = token;
                vm.expiresIn = expiresIn;
                vm.dateTimeTokenRetrieved = new Date();
                determineTokenExpiration();
                // Store token and expiration also in localStorage for use on near term refresh
                if (localStorage) {
                    localStorage.meetupToken = token;
                    localStorage.expiresIn = expiresIn;
                    localStorage.dateTimeTokenRetrieved = vm.dateTimeTokenRetrieved;
                }
                vm.getRsvps();
            });
        }

        vm.clearLocalStorage = function() {
            localStorage.clear();
        }

        vm.getRsvps();
        vm.currentRsvpIndex = 0;

        // vm.rsvps=[{
        //     "member": {
        //         "name": "Bart van der W.",
        //         "bio": "Fullstack webdeveloper in Zeist. Microsoft .NET als backend, Google AngularJS op de frontend.",
        //         "photo": {
        //             "thumb_link": "http://photos3.meetupstatic.com/photos/member/1/7/e/0/thumb_255666112.jpeg"
        //         }
        //     }
        // }];

        // Lists attendance records for Meetup events. Limited for use by administrative members. 
        // Source: http://www.meetup.com/meetup_api/docs/:urlname/events/:id/attendance/#list
        // $http.get('https://api.meetup.com/Web-Developers-Heuvelrug/events/231065621/rsvps?&sign=true&photo-host=public&key=mtgd2br364083o93siu5bkplia',
        // $http.get('https://api.meetup.com/Web-Developers-Heuvelrug/events/231065621/rsvps?&sign=true&photo-host=public&key=d5e211c606d3c6658145f642e2e2d25',
        //     function(result) {
        //     vm.attendants = result.data;
        // });

        function determineTokenExpiration() {
            // Reken uit wanneer token verloopt op basis van 
            vm.dateTimeTokenExpires = new Date();
            vm.dateTimeTokenExpires.setSeconds(vm.dateTimeTokenRetrieved.getSeconds() + vm.expiresIn);
            var now = new Date()
            vm.isExpired = vm.dateTimeTokenExpires<now;
        }
    }
})();
