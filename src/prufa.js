//This is the one we don't care about
function RestService() {
}

RestService.prototype.init = function() {
  // Some init stuff
};

RestService.prototype.getAll = function() {
  return []; // Return elements
};

RestService.prototype.update = function(item) {
  console.log("Updating the item");
};

// This is our SUT (Subject under test)
function Post(rest) {
  this.rest = rest;
  rest.init();
}

Post.prototype.retrieve = function() {
  this.posts = this.rest.getAll();
};

Post.prototype.accept = function(item, callback) {
  this.rest.update(item);
  if (callback) {
    callback();
  }
};