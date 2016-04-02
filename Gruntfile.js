module.exports = function(grunt) {

    grunt.initConfig({

        //LINT javascript files
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },


        //MINIFY javascript files
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    //'js/weekli.min.js': ['js/weekli.js']
                }
            }
        },


        //COMPILE less
        less: {
            // production config is also available
            development: {
                options: {
                    paths: ['less/']
                },
                files: {
                    //compiled.css  :  source.less
                    "production/css/portfolio.css": "dev/less/portfolio.less"
                }
            }
        },

        //COMPILE handlebars
        'compile-handlebars': {
            globbedTemplateAndOutput_templates: {
                files: [{
                    expand: true,
                    cwd: 'dev/handlebars/pages',
                    src: '*.hbs',
                    dest: 'production/templates',
                    ext: '.html'
                }],
                registerFullPath: false,
                templateData: 'dev/handlebars/pages/*.json',
                partials: 'dev/handlebars/partials/*.hbs',
                helpers: 'dev/handlebars/helpers_pages/*.js'

            },
            globbedTemplateAndOutput_pages: {
                files: [{
                    expand: true,
                    cwd: 'dev/handlebars/pages',
                    src: '*.hbs',
                    dest: 'production/',
                    ext: '.html'
                }],
                registerFullPath: true,
                templateData: 'dev/handlebars/pages/*.json',
                partials: 'dev/handlebars/partials/*.hbs',
                helpers: 'dev/handlebars/helpers_templates/*.js'
                //helpers_templates: 'test/helpers_templates/**/*.js',
            }
        },

        //CONNECT and SERVE on browser
        connect: {
            server: {
                options: {
                    port: 9002,
                    base: 'production'
                }
            }
        },

        watch: {
            files: ['dev/js/*.js', 'dev/js/*.js', 'dev/less/*.less', 'dev/handlebars/**/*'],
            tasks: ['jshint', 'uglify', 'less', 'compile-handlebars']
        },

        bump: {
            options: {
                files: ['package.json'],
                commit: false,
                push: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['jshint', 'uglify', 'less','connect','compile-handlebars', 'watch']);
};