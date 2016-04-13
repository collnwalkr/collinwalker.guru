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
                url: "previews/" + pages_list[i] + ".html",
                headers: {page: pages_list[i]},
                type: "GET"
            })
            .done(ajax_done())
            .always(ajax_always());
    }

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
            var page_attr       = $(this).attr("data-page");
            var page            = $(".page[data-page='" + page_attr + "']");

            move_preview(page);

            e.preventDefault();

            //history.pushState($(this).attr("data-page"), '', $(this).attr("href"));

            //renderPage(page);
        };
    };

    var move_preview = function(page){
        var preview_content     = page.html();
        var page_move         = $('.page-move');
        var page_move_inner   = $('.page-move-inner');
        var page_offset = page.offset();


        page_move_inner.html(preview_content);

        //var starting_position = 'translate(' + page_offset.left + 'px, ' + page_offset.top + 'px)';
        var starting_position = '' + page_offset.left * 2 + 'px ' + page_offset.top * 2 + 'px';
        var end_position      = 'translate(' + 0 + 'px, ' + 0 + 'px)';

        page_move.css({
            '-webkit-transform-origin':starting_position,
            '-ms-transform-origin':starting_position,
           'transform-origin':starting_position
        });

        page_move.addClass('zoom-in');

        page_move.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e){
            console.log('hello');
        });

        /*
        page_move.css({
            '-webkit-transform':end_position,
            '-ms-transform':end_position,
            'transform':end_position
        });
        */
    };

    $('#test-button').on('click', function(){
        //test
        console.log('test');

    });



    /////////////////////////////
    // RENDER certain pages
    /////////////////////////////
    function renderHome(){

        // Hide all the pages in the pages list.
        var allPages = $('.pages > .page');
        allPages.addClass('page-inactive');
        allPages.removeClass('page-active ');

        // SHOW header
        var content = $('.content');
        content.addClass('zoom-out');
        content.removeClass('zoom-in');

    }


    function renderPage(page){

        // CLEAR all
        var allPages = $('.pages > .page');
        allPages.addClass('page-inactive');
        allPages.removeClass('page-active ');

        // HIDE header
        var content = $('.content');
        content.addClass('zoom-in');
        content.removeClass('zoom-out');

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