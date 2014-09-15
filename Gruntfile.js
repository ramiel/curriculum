/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
// Metadata.
  pkg: grunt.file.readJSON('package.json'),
  doctor: {
    options: {
      'template': 'node_modules/'
    },
    general: {
      files: {
        'build/index.html': ['src/*.md']
      }
    }
  },

  md2html: {
    options: {
      // Task-specific options go here.
    },
    default: {
      files: [{
        src: ['src/**/*.md'],
        dest: 'build/index2.html'
      }]
    },
  },

});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-doctor-md');
  grunt.loadNpmTasks('grunt-md2html');

  // Default task.
  grunt.registerTask('default', ['doctor:general','md2html']);

};
