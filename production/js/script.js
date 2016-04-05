$(function () {

    var pages_list = ["test", "test2"];
    var page_data = [];
    var counter = 0;



    /////////////////////////////
    // GET all the pages and handle AJAX request
    /////////////////////////////
    var ajax_always = function(){
        return function(){
            counter += 1;
            //IF done loading all attempted pages
            if (counter === pages_list.length) {
                generateAllPagesHTML(page_data);
            }
        };
    };

    var ajax_done = function(){
        return function (data){
            page_data.push({page: this.headers.page, html: data});
        };
    };


    for(var i = 0; i < pages_list.length; i++) {
        $.ajax({
                url: "templates/" + pages_list[i] + ".html",
                headers: {page: pages_list[i]},
                type: "GET"
            })
            .done(ajax_done())
            .always(ajax_always());
    }



    $(window).on('hashchange', function(){
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(decodeURI(window.location.hash));
    });




    /////////////////////////////
    // GENERATE all pages
    /////////////////////////////
    function generateAllPagesHTML(page_data){

        var pages_div = $('.pages');

        for(var i = 0; i < page_data.length; i++) {
            $('<div/>', {
                class: 'page page-inactive',
                attr:{
                    'data-page': page_data[i].page
                },
                href: '/' + page_data[i].page + '.html',
                html: page_data[i].html
            }).appendTo('.pages');
        }

        pages_div.find('.page').on('click' , changePageHandler());
    }

    var changePageHandler = function(){
        return function(e){
            var page_attr = $(this).attr("data-page");
            var page = $(".page[data-page='" + page_attr + "']");

            e.preventDefault();

            history.pushState($(this).attr("data-page"), '', $(this).attr("href"));

            renderPage(page);
        };
    };



    /////////////////////////////
    // RENDER certain pages
    /////////////////////////////
    function render(url) {
        // Get the keyword from the url.
        var temp = url.split('/')[0];

        // Hide whatever page is currently shown.
        $('.main-content .page').removeClass('visible');


        var map = {

            // The Homepage.
            '': function() {

                // Clear the filters object, uncheck all checkboxes, show all the pages

                renderHome(page_data);
            },

            // Single Pages page.
            '#page': function() {

                // Get the index of which page we want to show and call the appropriate function.
                var index = url.split('#page/')[1].trim();

                //renderPage(index, pages);
            }


        };


        // Execute the needed function depending on the url keyword (stored in temp).
        if(map[temp]){
            map[temp]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            //renderErrorPage();
        }

    }

    function renderHome(){

        var allPages = $('.pages > .page');

        // Hide all the pages in the pages list.
        allPages.addClass('page-inactive');
        allPages.removeClass('page-active ');


    }


    function renderPage(page){

        // CLEAR all
        var allPages = $('.pages > .page');
        allPages.addClass('page-inactive');
        allPages.removeClass('page-active ');


        // TURN on page
        $(page).toggleClass('page-active page-inactive');

    }



    /////////////////////////////
    // HANDLE back button
    /////////////////////////////
    $('#exit-button').on('click', function () {

        parent.history.back();
        return false;
    });

    $(window).on("popstate", function(e) {
        var state = e.originalEvent.state;
        var page = $(".page[data-page='" + state + "']");
        if(state === null){ state = 'index'; }

        if ($.inArray(state, pages_list) != -1)
        {
            renderPage(page);
        }

        else{
            renderHome();
        }
        
        
    });

});