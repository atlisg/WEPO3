describe('evaluationsController', function() {
  // Write tests
  var scope = {}, myService, $location;

  var mockTemplate = {};

  beforeEach(module('evaluationApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    myService = $controller('evaluationsController', {
      $scope: scope,
      $rootScope: $rootScope,
      $location: $location,
    });
  }));

  /*it('should fill teachers array', function() {
    // Arrange:
    var data = {

    }
    // Act:
    
    // Assert:
    
  });*/

});





