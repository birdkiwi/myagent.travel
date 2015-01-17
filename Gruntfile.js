module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files: {"build/style.css": "less/style.less"}
            }
        },

        cssmin: {
            combine: {
                files: {
                    'build/style.min.css': ['build/style.css']
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'js/jquery.js',
                    'bootstrap/js/bootstrap.min.js',
                    'js/jquery.jcarousel.js',
                    'js/jquery.jcarousel-data-attributes.js',
                    'js/fancybox/jquery.fancybox.js',
                    'js/stickyfill.min.js',
                    'js/jquery.scrollTo.min.js',
                    'js/script.js'
                ],
                dest: 'build/scripts.js'
            }
        },

        uglify: {
            build: {
                src: 'build/scripts.js',
                dest: 'build/scripts.min.js'
            }
        },

        sprite:{
            all: {
                src: ['images/icons/*.png'],
                destImg: 'build/spritesheet.png',
                destCSS: 'less/sprites.less'
            }
        },


        watch: {
            scripts: {
                files: ['js/*.js', 'images/icons/*', 'less/*.less'],
                tasks: ['less', 'cssmin', 'concat', 'uglify', 'sprite'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'concat', 'uglify', 'sprite','watch']);

};