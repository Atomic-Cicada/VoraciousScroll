module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: [

        'Gruntfile.js',
        'app/**/*.js',
        'public/**/*.js',
        'lib/**/*.js',
        './*.js',
        'spec/**/*.js',
        'server/**/*.js'
      ]
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/bundle.js',
        'public/index.js',
        'public/home/*.js',
        'public/nav/*.js',
        'public/results/*.js',
        'public/services/*.js'
        ],
        dest: 'public/dist/built.js',
      },
    },

  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'eslint'
  ]);

  grunt.registerTask('build', [
    'concat'
  ]);
};
