// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
    paths: {
        jquery: 'components/jquery/dist/jquery.slim.min',
        underscore: 'components/underscore-amd/underscore-min',
        backbone: 'components/backbone-amd/backbone-min'
    }

});

require([
    // Load our app module and pass it to our definition function
    'app',
], function(App){
    // The "app" dependency is passed in as "App"
    App.initialize();
});