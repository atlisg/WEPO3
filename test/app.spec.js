describe("controller: authenticationController", function() {
  // Write tests
  var $scope, myService, $location

  beforeEach(module('evaluationApp'));
  beforeEach(inject(function(_$controller_, _$scope_, _$location_){
  	// Create a new scope:
  	$scope = _$scope_;
    $controller = _$controller_;
    $location = _$location_;

  beforeEach(inject(function($rootScope, _myService_, _$location_) {
    $scope = $rootScope.$new();
    myService = _myService_;
    $location = _$location_;
  }));

  it('should work', function() {
    // Do something
    // Expect something
  });
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
  });*/
});
