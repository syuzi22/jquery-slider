let webpackConfig = require('./webpack.config.js');
const path = require('path');

if (typeof webpackConfig === 'function') {
    webpackConfig = webpackConfig()
}
delete webpackConfig.entry;

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // 'src/**/*.js',
            //'test/**/*.js',
            // 'src/**/*.ts',
            'test/**/*.ts'
        ],

        // list of files / patterns to exclude
        exclude: [],
        browsers: ["ChromeHeadless"],
        mime: {
            "text/x-typescript": ["ts", "tsx"],
          },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*.ts': ['webpack'],
            //'test/**/*.js': ['webpack'],
            // 'src/**/*.js': ['coverage'],
             'src/**/*.ts': ['coverage']
        },
        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'text-summary', 'lcovonly' ],
            dir: path.join(__dirname, 'coverage'),
            fixWebpackSourcePaths: true,
            'report-config': {
              html: { outdir: 'html' }
            }
          },

        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")(),
                    //require("karma-typescript-cssmodules-transform")()
                ]
            }
        },

         //webpack: {
             //module: webpackConfig.module,
             //resolve: webpackConfig.resolve,
             //plugins: webpackConfig.plugins,
             //mode: 'development',
             //devtool: 'inline-source-map',
         //},
        webpack: webpackConfig,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['spec', 'progress', 'coverage'],
        reporters: ['spec', 'coverage-istanbul'],
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["ChromeHeadless"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
    });
};
