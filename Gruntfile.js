module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                src: 'index.js',
                dest: 'build/index.js'
            },
            libs: {
                files: [
                    {
                        expand: true,
                        src: ['libs/**/*.js', '!libs/**/*.min.js', '!libs/**/example/**', '!libs/**/examples/**'],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            libs: {
                files: [
                    {
                        expand: true,
                        src: ['libs/**/*.css', '!libs/**/*.min.css'],
                        dest: 'build/'
                    }
                ]
            }
        },
        htmlmin: {
            html: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                src: 'index.html',
                dest: 'build/index.html'
            }
        },
        copy: {
            logos: {
                src: 'img/*',
                dest: 'build/'
            },
            icons: {
                src: ['layers/*/svg/*.svg', 'layers/*/png/*.png'],
                dest: 'build/'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'htmlmin', 'cssmin', 'copy']);

};
