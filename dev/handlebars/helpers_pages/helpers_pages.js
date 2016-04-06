var Handlebars = require("../../../node_modules/handlebars");

Handlebars.registerHelper("PreviewsIgnoreThis",  function(options) {
    // page doesn't ignore this
    return options.fn(this);
});

Handlebars.registerHelper("ContentIgnoreThis",  function(options) {
    // page doesn't ignore this
    return options.fn(this);
});

Handlebars.registerHelper("BothIgnoreThis",  function(options) {
    // page doesn't ignore this
    return options.fn(this);
});