/// <reference path="jquery.d.ts" />
/// <reference path="../exifex/exifex" />

module com.teruhisa.ExifIconEx {

    var partial_map = {".":"dot"};
    var container_class = 'flickr-exif-icon';

    export class ExifProperty {
        type: string;
        exif: any;
        classPrefix: string;
        constructor(type: string, exif) {
            this.type = type;
            this.exif = exif;
            this.classPrefix = container_class + '-';
        }
        getValue(): string {
            return this.exif ? this.exif.raw._content : "";
        }
        getValueBlockClass(partial: string): string {
            return 'text-' + (partial_map[partial] || partial) + ' ' + this.classPrefix + 'text';
        }
        getBlock(tag: string, blockName: string, content: string): string {
            return '<' + tag + ' class="' + this.classPrefix + blockName + '">' + content + '</' + tag + '>';
        }
        getHtmlBlocks(): string {
            var val = this.getValue(),
                partial,
                blocks = "";
            if (val) {
                for (var bi = 0; bi < val.length; bi++) {
                    partial = val[bi];
                    blocks += this.getBlock('span', this.getValueBlockClass(partial), partial);
                }
            } else {
                blocks = this.getBlock('span', 'empty', 'empty');
            }
            return blocks;
        }
        getHtml(): string {
            return this.getBlock('div', this.type, this.getHtmlBlocks());
        }
    }

    export class ExifAperture extends ExifProperty {
        constructor (type: string, exif) {
            super(type, exif);
        }
        getValue(): string {
            return parseFloat(super.getValue())+"";
        }
        getHtmlBlocks(): string {
            var blocks = super.getHtmlBlocks();
            return this.getBlock('span', 'label', 'F') + blocks;
        }
    }

    export class ExifExposure extends ExifProperty {
        fraction: bool;
        constructor (type: string, exif) {
            super(type, exif);
            this.fraction = false;
        }
        getValue(): string {
            var val = super.getValue();
            if (val && val.indexOf ('1/') === 0) {
                val = val.substring(2);
                this.fraction = true;
            }
            return val;
        }
        getHtmlBlocks(): string {
            var blocks = super.getHtmlBlocks();
            var frac = this.fraction ? this.getBlock('span', 'text-frac', '1/') : "";
            return frac + blocks + this.getBlock('span', 'label', 'S');
        }
    }

    export class ExifISO extends ExifProperty {
        highiso: bool;
        constructor (type: string, exif) {
            super(type, exif);
            this.highiso = false;
        }
        getValue(): string {
            var val = super.getValue();
            if (val && val.length > 4) {
                val = val.substring(0, val.length - 2);
                this.highiso = true;
            }
            return val;
        }
        getHtmlBlocks(): string {
            var blocks = super.getHtmlBlocks();
            return this.getBlock('span', 'label', 'ISO') + blocks + (this.highiso ? this.getBlock('span', 'text-high', '00') : "");
        }
    }

    var exif_block_tags = ['aperture', 'exposure', 'iso speed'];
    var exif_block_handlers = {
        'aperture': ExifAperture,
        'exposure': ExifExposure,
        'iso speed': ExifISO
    };

    // wait for data from exifex to populate
    com.drikin.ExifEx.subscribeExifData(function(flickr_img, exif_data) {
        var exif = exif_data.photo.exif;
        var exif_string = "";
        var exif_blocks = [];
        for (var ei = 0, el = exif.length; ei < el; ei++) {
            var exifObj = exif[ei];
            var exifTag = exifObj.tag.toLowerCase();
            var exifLabel = exifObj.label.toLowerCase();
            var pos = exif_block_tags.indexOf(exifLabel);
            if (pos !== -1) {
                var exifProperty = new exif_block_handlers[exifLabel](exifTag, exifObj);
                exif_blocks[pos] = exifProperty.getHtml();
            }
        }
        if (exif_blocks.length > 0) {
            for (var bi = 0; bi < exif_block_tags.length; bi++) {
                var exif_block = exif_blocks[bi];
                if (exif_block) {
                    exif_string += exif_block;
                } else {
                    var exifProperty = new ExifProperty(exifTag, null);
                    exif_string += exifProperty.getHtml();
                }
            }
        }
        if (exif_string) {
            var p = $("<div class='" + container_class + "' style='width:" + flickr_img.node.width + "px'><div class='" + container_class + "-block'>" + exif_string + "</div></div>");
            $(flickr_img.node).after(p);
        }

    });

}