var app = app || {};

(function(){
    var router = Sammy(function(){
        var requester = app.requester.config('kid_-ydFqFNT1b', '5372c1a8aeea4af495a434dd9ceba77f', 'https://baas.kinvey.com/');

        var mainSelector = '#container';
        var menuSelector = '#menu';
        var userModel = app.userModel.load(requester);
        var lecturesModel = app.lecturesModel.load(requester);

        var homeView = app.homeViewBag.load();
        var userView = app.userViewBag.load();
        var lecturesView = app.lecturesViewBag.load();

        var homeController = app.homeController.load(homeView, null);
        var userController = app.userController.load(userView, userModel);
        var lecturesController = app.lecturesController.load(lecturesView, lecturesModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionToken']) {
                this.redirect('#/');
                return false;
            }
        });

        //this.before(function(){
        //    if(!sessionStorage['sessionToken']){
        //
        //    } else {
        //
        //    }
        //});

        this.get('#/', function(){
            if (!sessionStorage['sessionToken']) {
                homeController.loadGuestMenu(menuSelector);
                homeController.loadGuestWelcomePage(mainSelector);
            } else {
                homeController.loadLoggedMenu(menuSelector);
                homeController.loadLoggedHomePage(mainSelector);
            }
        });

        this.get('#/register/', function(){
            homeController.loadGuestMenu(menuSelector);
            userController.loadRegisterPage(mainSelector);
        });

        this.get('#/login/', function(){
            homeController.loadGuestMenu(menuSelector);
            userController.loadLoginPage(mainSelector);
        });

        this.get('#/logout/', function(){
            homeController.loadGuestMenu(menuSelector);
            userController.logout();
        });

        this.get('#/calendar/list/', function(){
            homeController.loadLoggedMenu(menuSelector);
            lecturesController.loadAllLectures(mainSelector);
        });

        this.get('#/calendar/add/', function(){
            homeController.loadLoggedMenu(menuSelector);
            lecturesController.loadAddLecturePage(mainSelector);
        });

        this.get('#/calendar/my/', function(){
            homeController.loadLoggedMenu(menuSelector);
            lecturesController.loadMyLecturesPage(mainSelector);
        });

        this.get('#/calendar/edit/', function(data){
            homeController.loadLoggedMenu(menuSelector);
            lecturesController.loadEditLecturePage(mainSelector, data.params);
        });

        this.get('#/calendar/delete/', function(data){
            homeController.loadLoggedMenu(menuSelector);
            lecturesController.loadDeleteLecturePage(mainSelector, data.params);
        });

        this.bind('redirectUrl', function(event, data){
            this.redirect(data.url, data);
        });

        this.bind('registerUser', function(event, data){
            userController.register(data);
        });

        this.bind('loginUser', function(event, data){
            userController.login(data);
        });

        this.bind('addLecture', function(event, data){
            lecturesController.addLecture(data);
        });

        this.bind('editLecture', function(event, data){
            lecturesController.editLecture(data);
        });

        this.bind('deleteLecture', function(event, data){
            lecturesController.deleteLecture(data);
        });

    });

    router.run('#/');
}());