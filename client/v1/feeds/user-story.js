var _ = require('lodash');
var Request = require('../request');
var Media = require('../media');
var Upload = require('../upload');

function UserStory(session, userIds) {
    this.session = session;
    this.userIds = userIds.map( id => String(id) );
}

UserStory.prototype.get = function () {
    var that = this;
    return new Request(that.session)
        .setMethod('POST')
        .setResource('userStory')
        .generateUUID()
        .setData({
            user_ids: this.userIds
        })
        .signPayload()
        .send()
        .then(function(data) {
          return _.map(data.items, function (medium) {
              return new Media(that.session, medium);
            });
        });
};

UserStory.prototype.postPhoto = function (photo, caption = '') {
    var that = this;
    return Upload.photo(that.session, photo).then((upload) => {
        var upload_id = upload.params.uploadId;
        return new Request(that.session)
            .setMethod('POST')
            .setResource('createStory')
            .setData({
                upload_id,
                caption,
                'source_type': '3',
                'configure_mode': '1'
            })
            .generateUUID()
            .signPayload()
            .send()
            .then(function(data) {
                return data.media;
            });
    })
};

module.exports = UserStory;