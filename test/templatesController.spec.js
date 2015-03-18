describe('templatesController', function() {
  // Write tests
  var scope = {}, myService, $location;

  var mockTemplate = {};

  beforeEach(module('evaluationApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    myService = $controller('templatesController', {
      $scope: scope,
      $rootScope: $rootScope,
      $location: $location,
    });
  }));
/*
  it('should send the user to the template page', function() {
    // Arrange:
    var path = '/template';
    // Act:
    scope.createTemplate();
    // Assert:
    expect(scope.createTemplate.toHaveBeenCalled());
  });*/

  it('should set dateMassage to correct value when start date is too soon', function() {
    // Arrange:
    var start = new Date('01/01/2001').toISOString();
    var end = new Date('01/01/2050').toISOString();
    var now = new Date().toISOString();
    var id = 0;
    // Act:
    scope.makeEvaluation(id, start, end);
    // Assert:
    expect(scope.dateMessage).toBe('Opnunardagsetning verður að vera á morgun eða seinna.');
  });

  it('should set dateMassage to correct value when end date is before start date', function() {
    // Arrange:
    var start = new Date('02/10/2016').toISOString();
    var end = new Date('03/20/2015').toISOString();
    var now = new Date().toISOString();
    var id = 0;
    // Act:
    scope.makeEvaluation(id, start, end);
    // Assert:
    expect(scope.dateMessage).toBe('Lokunardagsetning verður að vera á eftir opnunardagsetningu.');
  });





});





