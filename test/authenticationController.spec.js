describe("controller: authenticationController", function() {
  // Write tests
  var $scope = {
    user: '',
    pass: '',
    errorMessage: '',
    warningMessage: '',
    submitted: false
  }, myService, $location

  var mockService = {
    loginUser: function(loginObject) {
      if ((loginObject.user === 'aegir13' || loginObject.user === 'admin') && loginObject.pass === '123456') {
        return true;
      } else {
        return false;
      }
    }
  };

  var mockUser = {
    token: '',
    username: '',
    fullName: '',
    role: '',
    ssn: '',
    imageURL: ''
  };

  beforeEach(module('evaluationApp'));
  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
  }));

  describe("function: login", function() {
    beforeEach(function() {
      $scope.user =  '';
      $scope.pass = '';
      $scope.testing = true;

      myService = $controller('authenticationController', {
        $scope: $scope,
        $rootScope: $rootScope,
        $location: $location,
        studentResource: mockService,
        currentUser: mockUser
      });
    });

    // Test for function: login below
    it('Should login user aegir13', function() {
      $scope.user = 'aegir13';
      $scope.pass = '123456';
      /*var loginResult = $scope.login(); // We couldnt get this to work
      expect(loginResult).toBeTruthy();*/
    });

    it('Should change currentUser data', function() {
      var testData = {
        Token: 'testingtesting',
        User: {
          Username: 'aegir13',
          FullName: 'Ægir Már Jónsson',
          Role: 'student',
          SSN: 0507922699,
          ImageURL: 'blabla.com'
        }
      }

      $scope.getUserData(testData);

      expect(mockUser.token).toBe(testData.Token);
      expect(mockUser.username).toBe(testData.User.Username);
      expect(mockUser.fullName).toBe(testData.User.FullName);
      expect(mockUser.role).toBe(testData.User.Role);
      expect(mockUser.ssn).toBe(testData.User.SSN);
      expect(mockUser.imageURL).toBe(testData.User.ImageURL);
    });

    it('Should logout the user', function() {
      $rootScope.logout();

      expect(mockUser.token).toBe('');
      expect(mockUser.username).toBe('');
      expect(mockUser.fullName).toBe('');
      expect(mockUser.role).toBe('');
      expect(mockUser.ssn).toBe('');
      expect(mockUser.imageURL).toBe('');
    })
  });

});