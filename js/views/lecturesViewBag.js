var app = app || {};

app.lecturesViewBag = (function () {
    function showAddLecturePage(selector) {
        $.get('templates/add-lecture.html', function (template) {
            $(selector).html(template);
            $('#addLecture').on('click', function (event) {
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();
                var lecturer = sessionStorage['username'];

                if(!start.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g) ||
                    !end.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/g)){
                    noty({
                        type: 'error',
                        text: 'Invalid date and time format!',
                        timeout: '2000'
                    });
                } else {
                    var data = {
                        title: title,
                        start: start,
                        end: end,
                        lecturer: lecturer
                    };

                    Sammy(function () {
                        this.trigger('addLecture', data);
                    });
                }
            });
        });
    }

    function showMyLecturesPage(selector, lecturesData) {
        $.get('templates/calendar.html', function (template) {
            $(selector).html(template);

        }).then(function (resultTemplate) {
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: lecturesData.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            calEvent.url = '#/calendar/edit/';
                            Sammy(function () {
                                this.trigger('redirectUrl', calEvent);
                            });
                        });
                        $('#deleteLecture').on('click', function () {
                            calEvent.url = '#/calendar/delete/';
                            Sammy(function () {
                                this.trigger('redirectUrl', calEvent);
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
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
    }

    function showAllLectures(selector, lecturesData) {
        $.get('templates/calendar.html', function (template) {
            $(selector).html(template);
            $('#editLecture').hide();
            $('#deleteLecture').hide();
        }).then(function (resultTemplate) {
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: lecturesData.lectures,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                    });
                    $('#events-modal').modal();
                }
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
    }

    function showEditLecturePage(selector, data) {
        $.get('templates/edit-lecture.html', function (template) {
            var outputHtml = Mustache.render(template, data);
            $(selector).html(outputHtml);

            $('#editLecture').on('click', function (event) {
                var lectureId = data._id;
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();
                var lecturer = sessionStorage['username'];

                var dataToSend = {
                    _id: lectureId,
                    title: title,
                    start: start,
                    end: end,
                    lecturer: lecturer
                };

                Sammy(function () {
                    this.trigger('editLecture', dataToSend);
                });
            });
        }).then(function (success) {
            $('#events-modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
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
    }

    function showDeleteLecturePage(selector, data) {
        $.get('templates/delete-lecture.html', function (template) {
            var outputHtml = Mustache.render(template, data);
            $(selector).html(outputHtml);

            $('#deleteLecture').on('click', function (event) {
                noty({
                    text: 'Are you sure you want to delete this lecture?',
                    layout: 'topCenter',
                    type: 'warning',
                    buttons: [
                        {
                            text: 'Yes',
                            onClick: function ($noty) {
                                var lectureId = data._id;

                                var dataToSend = {
                                    _id: lectureId
                                };

                                Sammy(function () {
                                    this.trigger('deleteLecture', dataToSend);
                                });
                                $noty.close();
                            }
                        },
                        {
                            text: 'No',
                            onClick: function ($noty) {
                                $noty.close();
                            }
                        }
                    ]
                });
            });
        }).then(function (success) {
            $('#events-modal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
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
    }

    return {
        load: function () {
            return {
                showAllLectures: showAllLectures,
                showAddLecturePage: showAddLecturePage,
                showMyLecturesPage: showMyLecturesPage,
                showEditLecturePage: showEditLecturePage,
                showDeleteLecturePage: showDeleteLecturePage
            }
        }
    }
}());