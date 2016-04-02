var Handlebars = require("../../../node_modules/handlebars");

Handlebars.registerHelper("ignorePartialsTemplate",  function(options) {
    // TEMPLATES IGNORE
    return options.fn(this);
});