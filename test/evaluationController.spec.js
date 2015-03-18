describe('evaluationController', function() {
  // Write tests
  var scope = {}, myService, $location;

  var mockTemplate = {};

  beforeEach(module('evaluationApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    myService = $controller('evaluationController', {
      $scope: scope,
      $rootScope: $rootScope,
      $location: $location,
    });
  }));
/*
  it('should test stuff', function() {
    // Arrange:
    
    // Act:
    
    // Assert:
    
  });
*/
});





