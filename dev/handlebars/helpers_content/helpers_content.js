var Handlebars = require("../../../node_modules/handlebars");

Handlebars.registerHelper("PreviewsIgnoreThis",  function(options) {
    // content doesn't ignore this
    return options.fn(this);
});

Handlebars.registerHelper("ContentIgnoreThis",  function(options) {
    // content IGNORES this
    return options.inverse(this);
});

Handlebars.registerHelper("BothIgnoreThis",  function(options) {
    // content IGNORES this
    return options.inverse(this);
});