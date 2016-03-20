var app = app || {};

app.userController = (function(){
    function UserController(viewBag, model) {
        this._viewBag = viewBag;
        this._model = model;
    }

    UserController.prototype.loadRegisterPage = function(selector) {
        this._viewBag.showRegisterPage(selector);
    };

    UserController.prototype.register = function(data) {
        this._model.register(data)
            .then(function(result){
                sessionStorage['sessionToken'] = result._kmd.authtoken;
                sessionStorage['userId'] = result._id;
                sessionStorage['username'] = result.username;
                noty({
                    type: 'success',
                    text: 'Register successful!',
                    timeout: '2000'
                });
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function (error) {
                if(error.responseText) {
                    var errorResponseTextObj = JSON.parse(error.responseText);
                    var errorDescription = errorResponseTextObj.description;
                    noty({
                        type: 'error',
                        text: errorDescription,
                        timeout: '2000'
                    });
                } else {
                    noty({
                        type: 'error',
                        text: 'Check your connection!',
                        timeout: '2000'
                    });
                }
            }).done();
    };

    UserController.prototype.loadLoginPage = function(selector) {
        this._viewBag.showLoginPage(selector);
    };

    UserController.prototype.login = function(data) {
        this._model.login(data)
            .then(function(result){
                sessionStorage['sessionToken'] = result._kmd.authtoken;
                sessionStorage['userId'] = result._id;
                sessionStorage['username'] = result.username;
                noty({
                    type: 'success',
                    text: 'Login successful!',
                    timeout: '2000'
                });
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function (error) {
                if(error.responseText) {
                    var errorResponseTextObj = JSON.parse(error.responseText);
                    var errorDescription = errorResponseTextObj.description;
                    noty({
                        type: 'error',
                        text: errorDescription,
                        timeout: '2000'
                    });
                } else {
                    noty({
                        type: 'error',
                        text: 'Check your connection!',
                        timeout: '2000'
                    });
                }
            }).done();
    };

    UserController.prototype.logout = function() {
        this._model.logout()
            .then(function(result){
                sessionStorage.clear();
                noty({
                    type: 'success',
                    text: 'Logout successful!',
                    timeout: '2000'
                });
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/'});
                });
            }, function (error) {
                if(error.responseText) {
                    var errorResponseTextObj = JSON.parse(error.responseText);
                    var errorDescription = errorResponseTextObj.description;
                    noty({
                        type: 'error',
                        text: errorDescription,
                        timeout: '2000'
                    });
                } else {
                    noty({
                        type: 'error',
                        text: 'Check your connection!',
                        timeout: '2000'
                    });
                }
            }).done();
    };

    return {
        load: function(viewBag, model) {
            return new UserController(viewBag, model);
        }
    }
}());