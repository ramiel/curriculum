/*global module:false*/
module.exports = function(grunt) {

  var connection;
  try{
    connection = grunt.file.readJSON('.ftppass');
  }catch(ex){
    connection = {
      host : 'dump_host',
      port: '<%= connection.port %>',
      authKey: 'use the auth key defined in this configuration instead of password',
      user: 'username',
      password: 'password'
    };
  }

  // Project configuration.
  grunt.initConfig({
// Metadata.
  pkg: grunt.file.readJSON('package.json'),
  connection: connection,

  clean: {
    default: ["build/**/*.*", "!build/.empty"],
  },

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
        'build/css/style.css': 'resources/css/style.scss',
        'build/css/print.css': 'resources/css/print.scss',
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

  ftpush: {
    production: {
      auth: {
        host: '<%= connection.host %>',
        port: '<%= connection.port %>',
        authKey: 'secret'
      },
      src: 'build/',
      dest: '/public_html/curriculum/',
      exclusions : ['.empty'],
      keep: ['cgi-bin'],
      simple: false,
      useList: false
    }
  }

});

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-md2html');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-spell');
  grunt.loadNpmTasks('grunt-ftpush');

  // Default task.
  grunt.registerTask('default', ['build']);
  grunt.registerTask('compile_markdown', ['md2html:default']);
  grunt.registerTask('compile_styles', ['sass:default']);
  grunt.registerTask('resources',['copy:default', 'compile_styles']);
  grunt.registerTask('build',['clean', 'resources', 'spell', 'compile_markdown']);
  grunt.registerTask('build_fast',['clean', 'resources', 'compile_markdown']);
  grunt.registerTask('publish',['build', 'ftpush:production']);

};
