describe("controller: authenticationController", function() {
  // Write tests
  var $scope, myService, $location

  beforeEach(module('evaluationApp'));
  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
  }));

  it('should work', function() {
    // Do something
    // Expect something
    expect(5).toBe(5);
  });

  /*it('testShit', function() {
    controller = $controller('authenticationController', {
        $scope: $scope
    });
    var result = $scope.testShit();
    expect(result).toBe(1992);
  });*/

})

/*describe('Posts', function() {
  var rest, post;

  beforeEach(function() {
    rest = new RestService();
    post = new Post(rest);
  });

  it('will initialize the rest service upon creation', function() {
    spyOn(rest, 'init');
    post = new Post(rest);
    expect(rest.init).toHaveBeenCalled();
  });

  it('will receive the list of posts from the rest service', function() {
    var posts = [
      {
        title: 'Foo',
        body: 'Foo post'
      },
      {
        title: 'Bar',
        body: 'Bar post'
      }
    ];

    spyOn(rest, 'getAll').and.returnValue(posts);
    post.retrieve();
    expect(rest.getAll).toHaveBeenCalled();
    expect(post.posts).toBe(posts);
  });

  it('can accept a post to update it', function() {
    var postToAccept = {
      title: 'Title',
      body: 'Post'
    };
    spyOn(rest, 'update');
    post.accept(postToAccept);
    expect(rest.update).toHaveBeenCalledWith(postToAccept);
  });

  it('can receive a callback upon accept', function() {
    var fn = jasmine.createSpy();
    var postToAccept = {
      title: 'Title',
      body: 'Post'
    };
    post.accept(postToAccept, fn);
    expect(fn).toHaveBeenCalled();
  });
});*/
