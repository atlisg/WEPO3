module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
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
		}
	};
	grunt.initConfig(taskConfig);
};