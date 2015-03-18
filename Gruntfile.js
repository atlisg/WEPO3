module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-karma');
	var taskConfig = {
		jshint: {
			src: ['src/js/*', '!src/js/app.concat.js', '!src/js/app.min.js'],
			gruntfile: ['Gruntfile.js'],
			options: {
				curly:  true,
				immed:  true,
				newcap: true,
				noarg:  true,
				sub:    true,
				boss:   true,
				eqnull: true,
				node:   true,
				undef:  true,
				globals: {
					_:       false,
					jQuery:  false,
					angular: false,
					moment:  false,
					console: false,
					$:       false,
					io:      false,
					document:false,
				}
			}
		},
		concat: {
			bar: {
				src: ['src/js/*.js', 'src/js/Factories/*.js','src/js/Controllers/*.js', '!src/js/app.concat.js', '!src/js/app.min.js'],
				dest: 'src/js/app.concat.js',
			},
		},
		uglify: {
			bar: {
				src: ['src/js/app.concat.js'],
				dest: 'src/js/app.min.js',
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'src/css/style.min.css': ['src/css/style.css']
				}
			}
		},
		karma: {
		 	unit: {
		 		options: {
      				frameworks: ['jasmine'],
      				singleRun: true,
  		    		browsers: ['Chrome'],
  		    		reporters: ['progress'/*, 'coverage'*/],
  		    		preprocessors: {
  		    			//'src/**/*.js': ['coverage']
  		    		},
		 			files: [
		 				'bower_components/angular/angular.js',
		 				//'bower_components/angular-route/angular-route.js',
		 				'bower_components/angular-mocks/angular-mocks.js',
		 				//'bower_components/angular-chart.js/angular-chart.js',
		 				//'src/js/**/*.js',
		 				/*'src/js/app.js',
		 				'src/js/Controllers/authenticationController.js',
		 				'src/Factories/studentResource.js',
		 				'src/Factories/constants.js',*/
		 				'src/prufa.js',
      					'test/*.js'
		 			]
		 		}
		 	}
		}

	};
	grunt.initConfig(taskConfig);
};