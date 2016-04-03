$(function () {


    var pages_list = ["test", "test2"];
    var page_data = [];
    var counter = 0;

    for(var i = 0; i < pages_list.length; i++) {

        $.ajax({
                url: "templates/" + pages_list[i] + ".html",
                headers: {page: pages_list[i]},
                type: "GET"
            })
            .done(function (data) {
                page_data.push({page: this.headers.page, data: data});
            })
            .always(function () {
                counter += 1;
                //IF done loading all attempted pages
                if (counter === pages_list.length) {
                    generateAllPagesHTML(page_data);
                }
            });


    }


        /*
        $.get("templates/" + pages_list[i] + ".html", { page: pages_list[i]})

            .done(function( data, status, xhr ) {
                console.log(this);
                page_data.push(data);

        })
            .always(function() {
                counter += 1;
                //IF done loading all attempted pages
                if(counter === pages_list.length){
                    generateAllPagesHTML(page_data)
                }
            });

            */




    /*
    $.getJSON( "pages.json", function( data ) {
        // Get data about our pages from pages.json.

        // Call a function that will turn that data into HTML.
        generateAllPagesHTML(data);

        // Manually trigger a hashchange to start the app.
        //$(window).trigger('hashchange');
    });

    */

    $(window).on('hashchange', function(){
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(decodeURI(window.location.hash));
    });


    function render(url) {
        // Get the keyword from the url.
        var temp = url.split('/')[0];

        // Hide whatever page is currently shown.
        $('.main-content .page').removeClass('visible');


        var map = {

            // The Homepage.
            '': function() {

                // Clear the filters object, uncheck all checkboxes, show all the pages

                renderHome(pages);
            },

            // Single Pages page.
            '#page': function() {

                // Get the index of which page we want to show and call the appropriate function.
                var index = url.split('#page/')[1].trim();

                renderSingleProductPage(index, pages);
            }


        };


        // Execute the needed function depending on the url keyword (stored in temp).
        if(map[temp]){
            map[temp]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderErrorPage();
        }

    }


    function generateAllPagesHTML(data){

        var pages_div = $('.pages');

        for(var i = 0; i < page_data.length; i++) {
            $('<div/>', {
                class: 'page',
                attr:{
                    'data-page': page_data[i].page
                },
                href: '/' + page_data[i].page + '.html',
                html: page_data[i].data
            }).appendTo('.pages');
        }

        // Each pages has a data-index attribute.
        // On click change the url hash to open up a preview for this page only.
        // Remember: every hashchange triggers the render function.
        pages_div.find('.page').on('click', function (e) {
            e.preventDefault();

            //window.location.hash = 'page/' + pageIndex;
            history.pushState({}, '', $(this).attr("href"));
        })
    }


    function renderHome(data){

        var page = $('.all-pages'),
            allPages = $('.pages > li');

        // Hide all the pages in the pages list.
        allPages.addClass('hidden');

        // Iterate over all of the pages.
        // If their ID is somewhere in the data object remove the hidden class to reveal them.
        allPages.each(function () {

            var that = $(this);

            data.forEach(function (item) {
                if(that.data('index') == item.id){
                    that.removeClass('hidden');
                }
            });
        });

        // Show the page itself.
        // (the render function hides all pages so we need to show the one we want).
        page.addClass('visible');

    }


    function renderSingleProductPage(index, data){

        var page = $('.single-page'),
            container = $('.preview-large');

        // Find the wanted page by iterating the data object and searching for the chosen index.
        if(data.length){
            data.forEach(function (item) {
                if(item.id == index){
                    // Populate '.preview-large' with the chosen page's data.
                    container.find('h3').text(item.name);
                    container.find('img').attr('src', item.image.large);
                    container.find('p').text(item.description);
                }
            });
        }

        // Show the page.
        page.addClass('visible');

    }

    function renderErrorPage(){
        // Shows the error page.
    }


    function createQueryHash(filters){

        // Here we check if filters isn't empty.
        if(!$.isEmptyObject(filters)){
            // Stringify the object via JSON.stringify and write it after the '#filter' keyword.
            window.location.hash = '#filter/' + JSON.stringify(filters);
        }
        else{
            // If it's empty change the hash to '#' (the homepage).
            window.location.hash = '#';
        }

    }

});