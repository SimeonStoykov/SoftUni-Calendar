var app = app || {};

app.userViewBag = (function(){
    function showRegisterPage(selector){
        $.get('templates/register.html', function(template) {
            $(selector).html(template);
            $('#register-button').on('click', function(event){
                var username = $('#username').val();
                var password = $('#password').val();
                var confirmPassword = $('#confirm-password').val();

                if (password !== confirmPassword) {
                    noty({
                        text: 'The passwords don\'t match! Please try again!',
                        type: 'error',
                        timeout: '2000'
                    })
                } else {
                    var data = {
                        username: username,
                        password: password
                    };

                    Sammy(function(){
                        this.trigger('registerUser', data);
                    });
                }
            });
        });
    }

    function showLoginPage(selector){
        $.get('templates/login.html', function(template) {
            $(selector).html(template);
            $('#login-button').on('click', function(event){
                var username = $('#username').val();
                var password = $('#password').val();

                var data = {
                    username: username,
                    password: password
                };

                Sammy(function(){
                    this.trigger('loginUser', data);
                });
            });
        });
    }

    return {
        load: function() {
            return {
                showRegisterPage: showRegisterPage,
                showLoginPage: showLoginPage
            }
        }
    }
}());