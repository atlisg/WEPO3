describe('templateController', function() {
  // Write tests
  var $scope, myService, $location

  var mockTemplate = {
    addQuestion: 
  }

  beforeEach(module('evaluationApp'));

/*  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
  }));
*/
  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller("templateController", {scope: $scope});
  }));

  it('should work', function() {
    // Do something
    // Expect something
    expect(5).toBe(5);
  });
