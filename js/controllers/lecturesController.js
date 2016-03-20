var app = app || {};

app.lecturesController = (function () {
    function LecturesController(viewBag, model) {
        this._viewBag = viewBag;
        this._model = model;
    }

    LecturesController.prototype.loadAddLecturePage = function (selector) {
        this._viewBag.showAddLecturePage(selector);
    };

    LecturesController.prototype.addLecture = function (data) {
        this._model.addLecture(data)
            .then(function (result) {
                noty({
                    type: 'success',
                    text: 'You have successfully added a lecture!',
                    timeout: '2000'
                });
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                })
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

    LecturesController.prototype.loadMyLecturesPage = function (selector) {
        var loggedUserId = sessionStorage['userId'];
        var self = this;
        this._model.getMyLectures(loggedUserId)
            .then(function (result) {
                var data = {
                    lectures: []
                };

                result.forEach(function (lecture) {
                    data.lectures.push({
                        _id: lecture._id,
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer
                    });
                });

                self._viewBag.showMyLecturesPage(selector, data);
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

    LecturesController.prototype.loadAllLectures = function (selector) {
        var self = this;
        this._model.getAllLectures()
            .then(function (result) {
                var data = {
                    lectures: []
                };

                result.forEach(function (lecture) {
                    data.lectures.push({
                        _id: lecture._id,
                        title: lecture.title,
                        start: lecture.start,
                        end: lecture.end,
                        lecturer: lecture.lecturer
                    });
                });

                self._viewBag.showAllLectures(selector, data);
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

    LecturesController.prototype.loadEditLecturePage = function (selector, data) {
        this._viewBag.showEditLecturePage(selector, data);
    };

    LecturesController.prototype.editLecture = function (data) {
        this._model.editLecture(data)
            .then(function (result) {
                noty({
                    type: 'success',
                    text: 'You have successfully edited the lecture!',
                    timeout: '2000'
                });
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
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

    LecturesController.prototype.loadDeleteLecturePage = function(selector, data) {
        this._viewBag.showDeleteLecturePage(selector, data);
    };

    LecturesController.prototype.deleteLecture = function (data) {
        this._model.deleteLecture(data)
            .then(function (result) {
                noty({
                    type: 'success',
                    text: 'You have successfully deleted the lecture!',
                    timeout: '2000'
                });
                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
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
        load: function (viewBag, model) {
            return new LecturesController(viewBag, model);
        }
    }
}());