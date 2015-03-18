describe('authenticationController', function() {
  var $controller, $scope, $location;

  beforeEach(module('evaluationApp'));
  beforeEach(inject(function(_$controller_, _$scope_, _$location_){
  	// Create a new scope:
  	$scope = _$scope_;
    $controller = _$controller_;
    $location = _$location_;

  	//ctrl = $controller("authenticationController", { $scope: $scope });
  }));
  // The ctrl variable should now be accessible to
  // all test specs in this suite, and should reference
  // our authenticationController

  /*describe('virkadu plis', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {
        user: '',
        pass: '',
        errorMessage: '',
        warningMessage: '',
        submitted: false
      };

      controller = $controller('authenticationController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location
      });
    });

    it("Should ..", function(){
    	var result = $scope.testShit();
    	expect(result).toBe(1992);
    	expect(result).not.toBe(1993);
    });
  });*/
});

/*describe('evalutionResource tests', function (SERVER_URL){
  var evaluationResource,
      httpBackend;
  
  // excuted before each "it" is run.
  beforeEach(function (){
    
    // load the module.
    module('evalutionApp');
    
    inject(function($httpBackend, _evaluationResource_) {
      evalutionResource = _evaluationResource_;      
      httpBackend = $httpBackend;
    });
  });

  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
	httpBackend.verifyNoOutstandingExpectation();
	httpBackend.verifyNoOutstandingRequest();
  });
     
  // check to see if it has the expected function
  it('should have an loginUser function', function () { 
    expect(angular.isFunction(evalutionResource.loginUser)).toBe(true);
  });
  it('should have an getEvaluations function', function () { 
    expect(angular.isFunction(evalutionResource.getEvaluations)).toBe(true);
  });
  
  // check to see if it does what it's supposed to do.
  it('should send username and pw and return user data', function (){
    // set up some data for the http call to return and test later.
	var returnData = { Token: 'YWVnaXIxMzoxMjM0NTY=',
					   User: { Username: 'aegir13',
					           FullName: 'Ægir Már Jónsson',
					           SSN: '0507922699',
					           Email: null,
					           Role: 'student',
					           ImageURL: 'http://www.ru.is/kennarar/dabs/img/05/0507922699.jpg'
					    } 
					};

    var loginObject = { user: 'aegir13',
		                pass: '123456' };
    
    // expectGET to make sure this is called once.
    httpBackend.expectPOST(SERVER_URL + 'login', loginObject).respond(returnData);
    
    // make the call.
    var returnedPromise = evalutionResource.loginUser(loginObject);
    
    // set up a handler for the response, that will put the result
    // into a variable in this scope for you to test.
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });
    
    // flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    
    // check the result. 
    // (after Angular 1.2.5: be sure to use `toEqual` and not `toBe`
    // as the object will be a copy and not the same instance.)
    expect(result).toEqual(returnData);
  });
});*/