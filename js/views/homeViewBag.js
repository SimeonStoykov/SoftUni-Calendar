var app = app || {};

app.homeViewBag = (function(){
    function showGuestMenu(selector){
        $.get('templates/menu-login.html', function(template) {
            $(selector).html(template);
            //$('#registerButton').on('click', function(event){
            //    var username = $('#username').val();
            //    var password = $('#password').val();
            //    var fullName = $('#fullName').val();
            //
            //    var data = {
            //        username: username,
            //        password: password
            //    };
            //
            //    Sammy(function(){
            //        this.trigger('registerUser', data);
            //    });
            //});
        });
    }

    function showGuestWelcomePage(selector){
        $.get('templates/welcome-guest.html', function(template) {
            $(selector).html(template);
        });
    }

    function showLoggedMenu(selector){
        $.get('templates/menu-home.html', function(template) {
            $(selector).html(template);
        });
    }

    function showLoggedHomePage(selector){
        $.get('templates/welcome-user.html', function(template) {
            var dataToRender = {
                username: sessionStorage['username']
            };
            var outputHtml = Mustache.render(template, dataToRender);
            $(selector).html(outputHtml);
        });
    }

    return {
        load: function() {
            return {
                showGuestMenu: showGuestMenu,
                showGuestWelcomePage: showGuestWelcomePage,
                showLoggedMenu: showLoggedMenu,
                showLoggedHomePage: showLoggedHomePage
            }
        }
    }
}());