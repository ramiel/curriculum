/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
// Metadata.
  pkg: grunt.file.readJSON('package.json'),

  copy: {
    default: {
      files: [
        // includes files within path
        {expand: true,  cwd: 'bower_components/bootstrap/dist/',src: ['fonts/**'], dest: 'build/'},
        {expand: true,  cwd: 'bower_components/bootstrap/dist/css',src: ['*'], dest: 'build/css/'},
        {expand: true,  cwd: 'bower_components/bootstrap/dist/js',src: ['bootstrap.min.*'], dest: 'build/js/'},
        {expand: true,  cwd: 'bower_components/jquery/dist/',src: ['jquery.min.*'], dest: 'build/js/'},
      ]
    }
  },


  sass: {                              // Task
    default: {                            // Target
      options: {                       // Target options
        style: 'expanded'
      },
      files: {                     
        'build/style.css': 'resources/css/style.scss',
      }
    }
  },

  md2html: {
    options: {
      // Task-specific options go here.
    },
    default: {
      files: [{
        src: ['src/*.md'],
        dest: 'build/index.html'
      }],
      options: {
        layout: 'resources/layout.html',
        basePath: 'build/',
        templateData : {
          title: "Fabrizio Ruggeri - Resume"
        }
      },
    },
  },

});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-md2html');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['resources', 'compile_markdown']);
  grunt.registerTask('compile_markdown', ['md2html:default']);
  grunt.registerTask('compile_styles', ['sass:default']);
  grunt.registerTask('resources',['copy:default', 'compile_styles'])

};
