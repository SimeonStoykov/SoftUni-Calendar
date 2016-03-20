var app = app || {};

app.lecturesModel = (function(){
    function LecturesModel(requester){
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/lectures/';
    }

    LecturesModel.prototype.addLecture = function(data) {
        var requestUrl = this.serviceUrl;
        return this._requester.post(requestUrl, data, true);
    };

    LecturesModel.prototype.editLecture = function(data) {
        var requestUrl = this.serviceUrl + data._id;
        return this._requester.put(requestUrl, data, true);
    };

    LecturesModel.prototype.deleteLecture = function(data) {
        var requestUrl = this.serviceUrl + data._id;
        return this._requester.delete(requestUrl, true);
    };

    LecturesModel.prototype.getAllLectures = function() {
        var requestUrl = this.serviceUrl;
        return this._requester.get(requestUrl, true);
    };

    LecturesModel.prototype.getMyLectures = function(userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator": "' + userId + '"}';
        return this._requester.get(requestUrl, true);
    };

    return {
        load: function(requester) {
            return new LecturesModel(requester);
        }
    }
}());