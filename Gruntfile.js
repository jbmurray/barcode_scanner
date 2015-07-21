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
          { expand: true, src: ['**'], cwd: "webapp/" },
          { src: ['config.xml'], dest: '' }
        ]
      }
    },

    openui5_preload: {
      component: {
        options: {
          resources: {
            cwd: '',
            prefix: '',
            src: [
              'webapp/**/*.js',
              'webapp/**/*.fragment.html',
              'webapp/**/*.fragment.json',
              'webapp/**/*.fragment.xml',
              'webapp/**/*.view.html',
              'webapp/**/*.view.json',
              'webapp/**/*.view.xml',
              'webapp/**/*.properties'
            ]
          },
          dest: '',
          compress: true
        },
        components: true
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-openui5');

  // Default task(s).
  grunt.registerTask('default', ['compress']);
};