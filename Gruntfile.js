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
        replace: {
            html: {
                src: 'build/index.html',
                dest: 'build/index.html',
                replacements: [
                    {
                        from: 'data-tiles-url="tiles/layers/', 
                        to: 'data-tiles-url="https://carto.rudloff.pro/tiles/layers/'
                    },
                    {
                        from: 'data-utfgrid-url="tiles/layers/', 
                        to: 'data-utfgrid-url="https://carto.rudloff.pro/tiles/layers/'
                    }
                ]
            }
        },
        copy: {
            logos: {
                src: 'img/*',
                dest: 'build/'
            },
            icons: {
                src: ['layers/*/svg/*.svg', 'layers/*/png/*.png', 'libs/**/*.woff'],
                dest: 'build/'
            },
            manifest: {
                src: ['manifest.webapp'],
                dest: 'build/'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'htmlmin', 'replace', 'cssmin', 'copy']);

};
