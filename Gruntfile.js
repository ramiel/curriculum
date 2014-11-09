/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
// Metadata.
  pkg: grunt.file.readJSON('package.json'),
  connection: grunt.file.readJSON('connection.json'),

  copy: {
    default: {
      files: [
        // includes files within path
        {expand: true,  cwd: 'bower_components/bootstrap/dist/',src: ['fonts/**'], dest: 'build/'},
        {expand: true,  cwd: 'bower_components/bootstrap/dist/css',src: ['*'], dest: 'build/css/'},
        {expand: true,  cwd: 'bower_components/bootstrap/dist/js',src: ['bootstrap.min.*'], dest: 'build/js/'},
        {expand: true,  cwd: 'bower_components/jquery/dist/',src: ['jquery.min.*'], dest: 'build/js/'},
        {expand: true,  cwd: 'resources',src: ['img/**'], dest: 'build/'},
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

  spell: {
    default:{
      src: ['src/*'],
      options: {
        lang: 'en',
        ignore: []
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
          title: "Fabrizio Ruggeri - Curriculum"
        }
      },
    },
  },

});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-md2html');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-spell');
  // Default task.
  grunt.registerTask('default', ['build']);
  grunt.registerTask('compile_markdown', ['md2html:default']);
  grunt.registerTask('compile_styles', ['sass:default']);
  grunt.registerTask('resources',['copy:default', 'compile_styles']);
  grunt.registerTask('build',['resources', 'spell', 'compile_markdown']);

};
