var Handlebars = require("../../../node_modules/handlebars");

Handlebars.registerHelper("ignorePartialsTemplate",  function(options) {
    // PAGES DON'T IGNORE
    return options.inverse(this);
});