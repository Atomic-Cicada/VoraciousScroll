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
        src: [
        'public/index.js',
        'public/services/services.js',
        'public/features/results/results.js',
        'public/features/home/home.js',
        'public/features/home/trends.js',
        'public/features/home/primaryArticle.js',
        'public/features/profile/profile.js',
        'public/features/nav/nav.js',
        'public/services/graphServices.js',
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
