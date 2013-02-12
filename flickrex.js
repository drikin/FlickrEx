var com;
(function (com) {
    (function (drikin) {
        (function (FlickrEx) {
            var Base = (function () {
                function Base() {
                    this.api_key = "18c9f79a96fd34c3b3f16a93fb0a5d3c";
                    this.api_type = "json&nojsoncallback=1";
                    this.base_url = "http://api.flickr.com/services/rest/?";
                    if(window.FLICKR_API_KEY !== undefined) {
                        this.api_key = window.FLICKR_API_KEY;
                        delete window.FLICKR_API_KEY;
                    }
                    this.base_url = this.appendURLParams({
                        api_key: this.api_key
                    });
                    this.base_url = this.appendURLParams({
                        format: this.api_type
                    });
                }
                Base.prototype.appendURLParams = function (params) {
                    var return_url = this.base_url;
                    for(var key in params) {
                        return_url += "&" + key + "=" + params[key];
                    }
                    return return_url;
                };
                Base.prototype.getJsonResult = function (request_url, callback) {
                    jQuery.ajax(request_url, {
                        success: function (data) {
                            callback(data);
                        },
                        dataType: 'json'
                    });
                };
                Base.prototype.parseFlickrImageURL = function (node) {
                    var url_string = $(node).attr('src');
                    var url_elems = url_string.split('/');
                    var farm_id = url_elems[2].split('.').slice(0, 1)[0].replace('farm', '');
                    var server_id = url_elems[3];
                    var url_last_components = url_elems[4].split('_');
                    var id = url_last_components.slice(0, 1)[0];
                    var secret = url_last_components.slice(1, 2)[0];
                    var secret = url_last_components.slice(1, 2)[0];
                    var size_info = url_last_components.slice(2, 3);
                    if(size_info.length) {
                        var size = size_info.length && size_info[0].split('.').slice(0, 1)[0];
                    } else {
                        var size = '';
                    }
                    var file_ext = url_elems.slice(-1)[0].split('.').slice(-1)[0];
                    var obj = {
                        node: node,
                        url_string: url_string,
                        farm_id: farm_id,
                        server_id: server_id,
                        id: id,
                        secret: secret,
                        size: size,
                        file_ext: file_ext
                    };
                    return obj;
                };
                Base.prototype.getAllFlickrImageObjects = function (target_id) {
                    if (typeof target_id === "undefined") { target_id = ''; }
                    var imgs = jQuery(target_id + ' img').filter(function (idx) {
                        var src_str = $(this).attr('src');
                        return src_str && src_str.match(/staticflickr.com/);
                    });
                    var objs = [];
                    for(var i = 0, l = imgs.length; i < l; i++) {
                        objs.push(this.parseFlickrImageURL(imgs[i]));
                    }
                    return objs;
                };
                Base.prototype.getExif = function (photo_id, callback) {
                    var request_url = this.appendURLParams({
                        method: "flickr.photos.getExif",
                        photo_id: photo_id
                    });
                    this.getJsonResult(request_url, callback);
                };
                Base.prototype.getRecentURL = function (callback) {
                    var request_url = this.appendURLParams({
                        method: "flickr.photos.getRecent"
                    });
                    this.getJsonResult(request_url, callback);
                };
                return Base;
            })();
            FlickrEx.Base = Base;            
        })(drikin.FlickrEx || (drikin.FlickrEx = {}));
        var FlickrEx = drikin.FlickrEx;
    })(com.drikin || (com.drikin = {}));
    var drikin = com.drikin;
})(com || (com = {}));
