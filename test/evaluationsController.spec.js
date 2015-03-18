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

  it('should verify that evaluation is active', function() {
    // Arrange:
    var start = new Date('01/01/2001').toISOString();
    var end = new Date('01/01/2050').toISOString();
    var id = 0;
    // Act:
    var active = scope.dateIsActive(start, end);
    // Assert:
    expect(active).toBeTruthy();
  });

  it('should verify that evaluation is closed', function() {
    // Arrange:
    var start = new Date('01/01/2001').toISOString();
    var end = new Date('01/01/2005').toISOString();
    var id = 0;
    // Act:
    var active = scope.dateIsActive(start, end);
    // Assert:
    expect(active).toBeFalsy();
  });

  it('should verify that evaluation is not opened yet', function() {
    // Arrange:
    var start = new Date('01/01/2021').toISOString();
    var end = new Date('01/01/2022').toISOString();
    var id = 0;
    // Act:
    var active = scope.dateIsActive(start, end);
    // Assert:
    expect(active).toBeFalsy();
  });

});





