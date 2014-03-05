module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg : pkg,
        props : {
            out : 'target',
            src : 'src/main',
            test : 'src/test',
            name : '<%=pkg.name%>-<%=pkg.version%>'
        },
        clean : ['target'],
        jslint: {
            webapp: {
                src: [
                    '<%= props.src%>/**/*.js'
                ],
                directives: {
                    browser: true,
                    white : true,
                    vars : true,
                    plusplus : true,
                    continue : true,
                    sloppy : true,
                    nomen: true,
                    unparam : true
                },
                options: {
                    junit: '<%= props.out%>/jslint/jslint-src-webapp.xml'
                }
            }
        },
        handlebars : {
            compile : {
                options : {
                    namespace : 'Harpy.Templates',
                    partialsUseNamespace : true,
                    processName : function(path) {
                        path = path.replace(".handlebars","");
                        return path.substr(path.lastIndexOf("/")+1);
                    }
                },
                files : {
                    '<%= props.out%>/templates/templates.js' : ['<%= props.src%>/handlebars/*.handlebars'],
                    '<%= props.test%>/resources/handlebars/templates.js' : ['<%= props.src%>/handlebars/*.handlebars']
                }
            }
        },
        copy : { // copy everything - so can run in dev mode
            info: {
                files: [
                    {
                        src: ['LICENSE','README.md'],
                        filter : 'isFile',
                        dest: '<%= props.out%>/<%=props.name%>/'
                    }
                ]
            }
        },
        concat: { // build the webapp
            js: {
                src: [
                    '<%= props.src%>/js/harpy.js',
                    '<%= props.src%>/js/modules/**/*.js',
                    '<%= props.src%>/js/init.js',
                    '<%= props.out%>/templates/templates.js'
                ],
                dest: '<%= props.out%>/<%=props.name%>/<%=props.name%>.js'
            },
            css: {
                src: [
                    '<%= props.src%>/css/**/*.css'
                ],
                dest: '<%= props.out%>/<%=props.name%>/<%=props.name%>.css'
            }
        },
        gcc: {
            js: {
                src: ['<%= props.out%>/<%=props.name%>/<%=props.name%>.js'],
                dest: '<%= props.out%>/<%=props.name%>/<%=props.name%>.min.js'
            }
        },
        cssmin: {
            minify: {
                src: ['<%= props.out%>/<%=props.name%>/<%=props.name%>.css'],
                dest: '<%= props.out%>/<%=props.name%>/<%=props.name%>.min.css'
            }
        },
        compress : {
            tgz: {
                options: {
                    mode : 'tgz',
                    archive: '<%= props.out%>/<%=props.name%>.tgz'
                },
                files: [
                    {
                        src: ['<%= props.out%>/<%=props.name%>/**'],
                        flatten : true,
                        expand : true
                    }
                ]
            },
            zip: {
                options: {
                    mode : 'zip',
                    archive: '<%= props.out%>/<%=props.name%>.zip'
                },
                files: [
                    {
                        src: ['<%= props.out%>/<%=props.name%>/**'],
                        flatten : true,
                        expand : true
                    }
                ]
            }
        },
        jasmine: {
            src: ['<%= props.src%>/js/harpy.js',
                '<%= props.src%>/js/modules/**/*.js'],
            options: {
                specs: ['<%= props.test%>/js/modules/**/*.js',
                    '<%= props.test%>/js/**/harpySpec.js'],
                helpers: ['<%= props.test%>/js/**/*Helper.js',
                    '<%= props.test%>/resources/googleHar.js',
                    '<%= props.test%>/resources/exos*.js'],
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: '<%= props.out%>/coverage/coverage.json',
                    report: '<%= props.out%>/coverage',
                    thresholds: {
                        lines: 70,
                        statements: 70,
                        branches: 70,
                        functions: 70
                    }
                }
            }
        },
        plato: {
            your_task: {
                files: {
                    '<%= props.out%>/analysis': ['<%= props.src%>/js/**/*.js', 'test/**/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-install-dependencies');

    for(var i in pkg.devDependencies) {
        if(pkg.devDependencies.hasOwnProperty(i)) {
            grunt.loadNpmTasks(i);
        }
    }

    grunt.registerTask('compile', ['jslint','copy','handlebars','concat','gcc','cssmin']);
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('analyse', ['plato']);
    grunt.registerTask('package', ['compress']);
    grunt.registerTask('default', ['clean','compile','test','package']);

};