var app = app || {};

app.homeController = (function(){
    function HomeController(viewBag, model){
        this._viewBag = viewBag;
        this._model = model;
    }

    HomeController.prototype.loadGuestMenu = function(selector) {
        this._viewBag.showGuestMenu(selector);
    };

    HomeController.prototype.loadGuestWelcomePage = function(selector) {
        this._viewBag.showGuestWelcomePage(selector);
    };

    HomeController.prototype.loadLoggedMenu = function(selector) {
        this._viewBag.showLoggedMenu(selector);
    };

    HomeController.prototype.loadLoggedHomePage = function(selector) {
        this._viewBag.showLoggedHomePage(selector);
    };

    return {
        load: function(viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }
}());