describe('templateController', function() {
  // Write tests
  var scope = {
    username: 'atlisg12'
  }, myService, $location;

  var mockTemplate = {};

  beforeEach(module('evaluationApp'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $location = _$location_;
    myService = $controller('templateController', {
      $scope: scope,
      $rootScope: $rootScope,
      $location: $location,
    });
  }));

  it('should add a course question to the CourseQuestions array', function() {
    // Arrange:
    var type = 'course';
    // Act:
    scope.addQuestion(type);
    // Assert:
    expect(scope.template.CourseQuestions.length).toBe(1);
  });

  it('should add a teacher question to the TeacherQuestions array', function() {
    // Arrange:
    var type = 'teacher';
    // Act:
    scope.addQuestion(type);
    // Assert:
    expect(scope.template.TeacherQuestions.length).toBe(1);
  });

  it('should remove a course question from the CourseQuestions array', function() {
    // Arrange:
    var type = 'course', id = 0;
    // Act:
    scope.addQuestion(type);
    scope.removeQuestion(id, type);
    // Assert:
    expect(scope.template.CourseQuestions.length).toBe(0);
  });

  it('should remove a teacher question from the TeacherQuestions array', function() {
    // Arrange:
    var type = 'teacher', id0 = 0, id1 = 1;
    // Act:
    scope.addQuestion(type);
    scope.addQuestion(type);
    scope.removeQuestion(id1, type);
    scope.removeQuestion(id0, type);
    // Assert:
    expect(scope.template.TeacherQuestions.length).toBe(0);
  });

  it('should add an option to a course question', function() {
    // Arrange:
    var type = 'course';
    // Act:
    scope.addQuestion(type);
    var n = scope.template.CourseQuestions[0].Answers.length;
    scope.addChoice(scope.template.CourseQuestions[0]);
    // Assert:
    expect(scope.template.CourseQuestions[0].Answers.length).toBe(n + 1);
  });

  it('should add an option to a teacher question', function() {
    // Arrange:
    var type = 'teacher';
    // Act:
    scope.addQuestion(type);
    var n = scope.template.TeacherQuestions[0].Answers.length;
    scope.addChoice(scope.template.TeacherQuestions[0]);
    scope.addChoice(scope.template.TeacherQuestions[0]);
    // Assert:
    expect(scope.template.TeacherQuestions[0].Answers.length).toBe(n + 2);
  });

  it('should remove an option from a course question', function() {
    // Arrange:
    var type = 'course';
    // Act:
    scope.addQuestion(type);
    var n = scope.template.CourseQuestions[0].Answers.length;
    scope.removeChoice(0, scope.template.CourseQuestions[0]);
    // Assert:
    expect(scope.template.CourseQuestions[0].Answers.length).toBe(n - 1);
  });

  it('should remove an option from a teacher question', function() {
    // Arrange:
    var type = 'teacher';
    // Act:
    scope.addQuestion(type);
    var n = scope.template.TeacherQuestions[0].Answers.length;
    scope.addChoice(scope.template.TeacherQuestions[0]);
    scope.removeChoice(0, scope.template.TeacherQuestions[0]);
    // Assert:
    expect(scope.template.TeacherQuestions[0].Answers.length).toBe(n);
  });



});





