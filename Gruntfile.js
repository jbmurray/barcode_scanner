module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      main: {
        options: {
          archive: 'barcode_test.zip'
        },
        files: [
          { src: ['css/**'], dest: '' },
          { src: ['i18n/**'], dest: '' },
          { src: ['img/**'], dest: '' },
          { src: ['model/**'], dest: '' },
          { src: ['util/**'], dest: '' },
          { src: ['view/**'], dest: '' },
          { src: ['Component.js'], dest: '' },
          { src: ['index.html'], dest: '' },
          { src: ['config.xml'], dest: '' },
          { src: ['MyRouter.js'], dest: '' }
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['compress']);
};