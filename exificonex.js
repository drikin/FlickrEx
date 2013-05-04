var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var com;
(function (com) {
    (function (teruhisa) {
        (function (ExifIconEx) {
            var flickrex = new com.drikin.FlickrEx.Base();
            var exif_jquery_selector = 'img';
            if(window.FLICKREX_EXIF_JQUERY_SELECTOR !== undefined) {
                exif_jquery_selector = window.FLICKREX_EXIF_JQUERY_SELECTOR;
                delete window.FLICKREX_EXIF_JQUERY_SELECTOR;
            }
            var partial_map = {
                ".": "dot"
            };
            var container_class = 'flickr-exif-icon';
            var ExifProperty = (function () {
                function ExifProperty(type, exif) {
                    this.type = type;
                    this.exif = exif;
                    this.classPrefix = container_class + '-';
                }
                ExifProperty.prototype.getValue = function () {
                    return this.exif ? this.exif.raw._content : "";
                };
                ExifProperty.prototype.getValueBlockClass = function (partial) {
                    return 'text-' + (partial_map[partial] || partial) + ' ' + this.classPrefix + 'text';
                };
                ExifProperty.prototype.getBlock = function (tag, blockName, content) {
                    return '<' + tag + ' class="' + this.classPrefix + blockName + '">' + content + '</' + tag + '>';
                };
                ExifProperty.prototype.getHtmlBlocks = function () {
                    var val = this.getValue(), partial, blocks = "";
                    if(val) {
                        for(var bi = 0; bi < val.length; bi++) {
                            partial = val[bi];
                            blocks += this.getBlock('span', this.getValueBlockClass(partial), partial);
                        }
                    } else {
                        blocks = this.getBlock('span', 'empty', 'empty');
                    }
                    return blocks;
                };
                ExifProperty.prototype.getHtml = function () {
                    return this.getBlock('div', this.type, this.getHtmlBlocks());
                };
                return ExifProperty;
            })();
            ExifIconEx.ExifProperty = ExifProperty;            
            var ExifAperture = (function (_super) {
                __extends(ExifAperture, _super);
                function ExifAperture(type, exif) {
                                _super.call(this, type, exif);
                }
                ExifAperture.prototype.getValue = function () {
                    return parseFloat(_super.prototype.getValue.call(this)) + "";
                };
                ExifAperture.prototype.getHtmlBlocks = function () {
                    var blocks = _super.prototype.getHtmlBlocks.call(this);
                    return this.getBlock('span', 'label', 'F') + blocks;
                };
                return ExifAperture;
            })(ExifProperty);
            ExifIconEx.ExifAperture = ExifAperture;            
            var ExifExposure = (function (_super) {
                __extends(ExifExposure, _super);
                function ExifExposure(type, exif) {
                                _super.call(this, type, exif);
                    this.fraction = false;
                }
                ExifExposure.prototype.getValue = function () {
                    var val = _super.prototype.getValue.call(this);
                    if(val && val.indexOf('1/') === 0) {
                        val = val.substring(2);
                        this.fraction = true;
                    }
                    return val;
                };
                ExifExposure.prototype.getHtmlBlocks = function () {
                    var blocks = _super.prototype.getHtmlBlocks.call(this);
                    var frac = this.fraction ? this.getBlock('span', 'text-frac', '1/') : "";
                    return frac + blocks + this.getBlock('span', 'label', 'S');
                };
                return ExifExposure;
            })(ExifProperty);
            ExifIconEx.ExifExposure = ExifExposure;            
            var ExifISO = (function (_super) {
                __extends(ExifISO, _super);
                function ExifISO(type, exif) {
                                _super.call(this, type, exif);
                    this.highiso = false;
                }
                ExifISO.prototype.getValue = function () {
                    var val = _super.prototype.getValue.call(this);
                    if(val && val.length > 4) {
                        val = val.substring(0, val.length - 2);
                        this.highiso = true;
                    }
                    return val;
                };
                ExifISO.prototype.getHtmlBlocks = function () {
                    var blocks = _super.prototype.getHtmlBlocks.call(this);
                    return this.getBlock('span', 'label', 'ISO') + blocks + (this.highiso ? this.getBlock('span', 'text-high', '00') : "");
                };
                return ExifISO;
            })(ExifProperty);
            ExifIconEx.ExifISO = ExifISO;            
            var exif_block_tags = [
                'aperture', 
                'exposure', 
                'iso speed'
            ];
            var exif_block_handlers = {
                'aperture': ExifAperture,
                'exposure': ExifExposure,
                'iso speed': ExifISO
            };
            jQuery(document).ready(function () {
                var flickr_imgs = flickrex.getAllFlickrImageObjects(exif_jquery_selector);
                for(var i = 0, l = flickr_imgs.length; i < l; i++) {
                    (function () {
                        var flickr_img = flickr_imgs[i];
                        flickrex.getExif(flickr_imgs[i].id, function (exif_data) {
                            generateIcon(flickr_img, exif_data);
                        });
                    })();
                }
            });
            function generateIcon(flickr_img, exif_data) {
                var exif = exif_data.photo.exif;
                var exif_string = "";
                var exif_blocks = [];
                for(var ei = 0, el = exif.length; ei < el; ei++) {
                    var exifObj = exif[ei];
                    var exifTag = exifObj.tag.toLowerCase();
                    var exifLabel = exifObj.label.toLowerCase();
                    var pos = exif_block_tags.indexOf(exifLabel);
                    if(pos !== -1) {
                        var exifProperty = new exif_block_handlers[exifLabel](exifTag, exifObj);
                        exif_blocks[pos] = exifProperty.getHtml();
                    }
                }
                if(exif_blocks.length > 0) {
                    for(var bi = 0; bi < exif_block_tags.length; bi++) {
                        var exif_block = exif_blocks[bi];
                        if(exif_block) {
                            exif_string += exif_block;
                        } else {
                            var exifProperty = new ExifProperty(exifTag, null);
                            exif_string += exifProperty.getHtml();
                        }
                    }
                }
                if(exif_string) {
                    var _node = jQuery(flickr_img.node);
                    var width = _node.width() + parseInt(_node.css('border-left-width'), 10) + parseInt(_node.css('border-right-width'), 10) + parseInt(_node.css('margin-left'), 10) + parseInt(_node.css('margin-right'), 10) + parseInt(_node.css('padding-left'), 10) + parseInt(_node.css('padding-right'), 10);
                    var p = jQuery("<div class='" + container_class + "' style='width:" + width + "px'><div class='" + container_class + "-block'>" + exif_string + "</div></div>");
                    jQuery(flickr_img.node).before(p);
                    jQuery(flickr_img.node).parent().addClass('flickr-exif-container');
                }
            }
            ;
        })(teruhisa.ExifIconEx || (teruhisa.ExifIconEx = {}));
        var ExifIconEx = teruhisa.ExifIconEx;
    })(com.teruhisa || (com.teruhisa = {}));
    var teruhisa = com.teruhisa;
})(com || (com = {}));
