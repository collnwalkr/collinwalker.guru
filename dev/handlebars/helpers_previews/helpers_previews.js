var Handlebars = require("../../../node_modules/handlebars");

Handlebars.registerHelper("PreviewsIgnoreThis",  function(options) {
    // preview IGNORES this
    return options.inverse(this);
});

Handlebars.registerHelper("ContentIgnoreThis",  function(options) {
    // preview doesn't ignore this
    return options.fn(this);
});

Handlebars.registerHelper("BothIgnoreThis",  function(options) {
    // preview IGNORES this
    return options.inverse(this);
});