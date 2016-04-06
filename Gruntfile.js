module.exports = function(grunt) {

    grunt.initConfig({

        //LINT javascript files
        jshint: {
            files: ['Gruntfile.js', 'production/js/*.js'],
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
            globbedTemplateAndOutput_previews: {
                files: [{
                    expand: true,
                    cwd: 'dev/handlebars/pages',
                    src: '*.hbs',
                    dest: 'production/previews',
                    ext: '.html'
                }],
                registerFullPath: false,
                templateData: 'dev/handlebars/pages/*.json',
                partials: 'dev/handlebars/partials/*.hbs',
                helpers: 'dev/handlebars/helpers_previews/*.js'

            },
            globbedTemplateAndOutput_content: {
                files: [{
                    expand: true,
                    cwd: 'dev/handlebars/pages',
                    src: '*.hbs',
                    dest: 'production/content',
                    ext: '.html'
                }],
                registerFullPath: false,
                templateData: 'dev/handlebars/pages/*.json',
                partials: 'dev/handlebars/partials/*.hbs',
                helpers: 'dev/handlebars/helpers_content/*.js'

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
                helpers: 'dev/handlebars/helpers_pages/*.js'
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

        //COMPILE requirejs to one file
        requirejs: {
            compile: {
                options: {
                    //appDir: "src/",
                    baseUrl: "./dev/js",
                    //dir: "target/",
                    optimize: 'uglify',
                    name: 'main',
                    out: 'production/js/app.min.js',
                    mainConfigFile:'dev/js/main.js'
                }
            }
        },

        watch: {
            files: ['production/js/*.js', 'dev/less/*.less', 'dev/handlebars/**/*'],
            tasks: ['jshint', 'less', 'compile-handlebars']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['jshint', 'less','connect','compile-handlebars', 'watch']);
};