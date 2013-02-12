var com;
(function (com) {
    (function (drikin) {
        (function (ExifEx) {
            var flickrex = new com.drikin.FlickrEx.Base();
            var exif_format = "%camera% %Focal Length% f/%aperture% ISO %ISO Speed% %Exposure% sec";
            if(window.FLICKR_EXIF_FORMAT !== undefined) {
                exif_format = window.FLICKR_EXIF_FORMAT;
                delete window.FLICKR_EXIF_FORMAT;
            }
            function makeExifString(exif_data) {
                var exif_params = exif_format.match(/%[\w ]*%/gi);
                var exif = exif_data.photo.exif;
                var output_string = exif_format;
                for(var pi = 0, pl = exif_params.length; pi < pl; pi++) {
                    var label = exif_params[pi].replace(/%/g, '');
                    for(var ei = 0, el = exif.length; ei < el; ei++) {
                        if(label.toLowerCase() === 'camera') {
                            if(exif_data.photo.camera) {
                                output_string = output_string.replace('%' + label + '%', exif_data.photo.camera);
                            }
                        }
                        if(label.toLowerCase() === exif[ei].label.toLowerCase()) {
                            output_string = output_string.replace('%' + label + '%', exif[ei].raw._content);
                        }
                    }
                }
                if(output_string === exif_format) {
                    output_string = null;
                }
                output_string = output_string.replace(/%[\w ]*%/gi, '-');
                return output_string;
            }
            $(document).ready(function () {
                var flickr_imgs = flickrex.getAllFlickrImageObjects();
                for(var i = 0, l = flickr_imgs.length; i < l; i++) {
                    (function () {
                        var flickr_img = flickr_imgs[i];
                        flickrex.getExif(flickr_imgs[i].id, function (exif_data) {
                            var exif_string = makeExifString(exif_data);
                            if(exif_string) {
                                var p = $("<p class='flickr-exif'>" + exif_string + "</p>");
                                $(flickr_img.node).after(p);
                            }
                        });
                    })();
                }
            });
        })(drikin.ExifEx || (drikin.ExifEx = {}));
        var ExifEx = drikin.ExifEx;
    })(com.drikin || (com.drikin = {}));
    var drikin = com.drikin;
})(com || (com = {}));
