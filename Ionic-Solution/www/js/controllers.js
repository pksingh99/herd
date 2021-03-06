angular.module('herd.controllers', [])

.controller('HomeCtrl', function($scope, meetupSessionDataService, $state, stateManager, $ionicLoading) {

        $scope.sessions = [];

        $scope.includePastSessions = false;

        function getMeetupSessionList(){
            $ionicLoading.show({
                noBackdrop: false,
                template: '<p class="text-center"><div><ion-spinner icon="lines"/></div> <span style="font-size:9pt;">Working on it...</span></p>'
            });

            meetupSessionDataService.getMeetupSessionList($scope.includePastSessions).then(function(results){

                $ionicLoading.hide();
                $scope.sessions = [];
                if(results && _.isArray(results)){
                    _.each(results, function(item){
                        $scope.sessions.push({
                                id:item.id,
                                title: item.name,
                                description: item.description,
                                imageUrl: 'img/users-header.png',
                                rsvpLimit: item.rsvp_limit,
                                rsvpCount: item.yes_rsvp_count,
                                waitListCount: item.waitlist_count,
                                mode: (item.group)?item.group.join_mode: '',
                                organizerName: (item.group)?item.group.name: ''
                            }
                        );
                    });
                }
            }, function(error){
                $ionicLoading.hide();
                //TODO: Handle error and show alert message
            });
        }

        getMeetupSessionList();

        $scope.updateMeetupSessionList = function(){
            $scope.includePastSessions = !$scope.includePastSessions;
            getMeetupSessionList();
        };

        $scope.goToDetails = function(item){
            stateManager.selectedMeetupSession = item;
            $state.go('tab.meetupSessionDetails');
        };


})

.controller('meetupSessionDetailsController', function($scope, stateManager, $ionicActionSheet, $state, meetupSessionDataService){

    $scope.selectedMeetupSession = stateManager.selectedMeetupSession;
    
    $scope.logo = "img/users-header.png";
    
    meetupSessionDataService.getSessionPhoto($scope.selectedMeetupSession.id). then(function(result){
        $scope.logo = result.highres_link;
    });


    $scope.getActions = function(){
        $ionicActionSheet.show({
            buttons: [
                { text: 'Feedback' }//,
                //{ text: 'Share' }
            ],
            titleText: 'Actions',
            cancelText: 'Cancel',
            cancel: function() {
                return true;
            },
            buttonClicked: function(index) {
                if(index === 0){
                    $state.go('tab.feedback');
                }
                return true;
            }
        });
    };

})

.controller('meetupSessionFeedback', function($scope, meetupSessionDataService, stateManager, $ionicLoading, $window, $ionicPopup){

        $scope.isPageReady = false;

        $scope.submitFeedback = function(){
            var feedbackFeed = [];
            _.each($scope.questions, function(question){
                feedbackFeed.push({
                    meetupSessionId: (stateManager.selectedMeetupSession || {}).id,
                    questionId: question.id,
                    rating: question.rating,
                    comments: question.comments
                });
            });
            meetupSessionDataService.addFeedbackForMeetupSession(feedbackFeed).then(function(){
                $ionicPopup.alert({
                    title: 'Done',
                    template: 'Thanks for your feedback. Your opinion is very important for us.'
                }).then(function () {
                    $window.history.back();
                });

            }, function(){
                $ionicPopup.alert({
                    title: 'Oops',
                    template: 'This is embarrassing. We couldn�t save your feedback. Can you check your network connection?'
                })
            });
        }

        function getFeedbackQuestions(){
            $ionicLoading.show({
                noBackdrop: false,
                template: '<p class="text-center"><div><ion-spinner icon="lines"/></div> <span style="font-size:9pt;">Working on it...</span></p>'
            });
            meetupSessionDataService.getFeedbackQuestions((stateManager.selectedMeetupSession || {}).id)
                .then(function(result){
                    $scope.questions = result;
                    $scope.isPageReady =true;
                    $ionicLoading.hide();
                }, function(error){
                    console.error(error);
                    $ionicLoading.hide();
                });
        }

        getFeedbackQuestions();
    })

.controller('announcementController', function($scope, announcementService, $ionicLoading, $ionicPopup){

    $ionicLoading.show({
        noBackdrop: false,
        template: '<p class="text-center"><div><ion-spinner icon="lines"/></div> <span style="font-size:9pt;">Working on it...</span></p>'
    });

    announcementService.getAnnouncements()
        .then(function(result){
            $ionicLoading.hide();
            $scope.announcements = result;
        }, function(error){
            $ionicPopup.alert({
                    title: 'Oops',
                    template: 'Apologies, couldn\'t load Announcements. Are you connected to the Internet?' 
                });
            $ionicLoading.hide();
    });
})
;
