desc('Run all tasks');
task('default', ['unit-tests'], function () {
  complete();
});

desc('Run Jasmine Unit Tests');
task('unit-tests', function () {
  jake.exec('phantomjs spec/jasmine-1.2.0/run_jasmine_test.coffee spec/SpecRunner.html', function () {
    console.log('Client side tests complete.');
    complete();
  }, {printStdout: true, printStderr: true});
});
