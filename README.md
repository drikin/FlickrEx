FlickrEx
========

FlickrEx is a JavaScript library making it possible easily to add additional information onto your flickr images submitted in your blog articles and web site. Just copy & paste HTML code below in your blog/web site and it works magically.

I'm considering FlickrEx should be pluggable and used with the features you just need. Currenlty, you can use only ExifEx, which will add Exif information to your Flickr images.

## Usage

You can just copy & paste HTML code below in your blog/web site and it should work.

```HTML
<script type="text/javascript">
    //var FLICKREX_API_KEY = "18c9f79a96fd34c3b3f16a93fb0a5d3c";
    //var FLICKREX_EXIF_FORMAT = "%camera% / %Focal Length% / f/%aperture% / ISO %ISO Speed% / %Exposure% sec / %Exposure Bias% EV / %Software%";
    //var FLICKREX_EXIF_JQUERY_SELECTOR = "#content img";
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="//github.com/drikin/FlickrEx/raw/stable/flickrex.min.js"></script>
<script src="//github.com/drikin/FlickrEx/raw/stable/exifex.min.js"></script>
```

NOTE: Seemingly, this code is using global variables. However, inside FlickrEx javascript code, these variables' namescope is correctly modified, so that these global variables won't violate other stuff at all. It makes the snippet code more clean.

## Customize ExifEx configuration

You can easily customize Exif information added to each Flickr image by modifying FLICKR_EXIF_FORMAT parameter in the snippet code above.
The keywords below, like the format %Label% will be replaced with the actual Exif data of each Flickr image.

### Keywords for ExifEx

Major keywords are below,

- %camera%
- %Make%
- %Model%
- %Software%
- %Exposure%
- %Aperture%
- %ISO Speed%
- %Focal Length%
- %Focal Length (35mm format)%

See more detail
> http://www.flickr.com/services/api/explore/flickr.photos.getExif

### Customer Links

- [Drift Diary XV](http://blog.drikin.com/)
- [Drift Diary USA](http://weblog.drikin.com/)
- [TATSUHIKO MIYAGAWA'S BLOG](http://weblog.bulknews.net/)
- [substantial](http://blog.tksohishi.com/)
- [shiology](http://shiology.com/)
- [みたいもん](http://mitaimon.cocolog-nifty.com/)
- [ShimoKen Works](http://www.shimoken-works.com/)
- [B-log Cabin TP](http://minami.typepad.com/)
- [ABlog](http://abworks.blog83.fc2.com/)
- [Beauty and Insanity](http://blog.toshixvuk.net/)
- [エアロプレイン](http://airoplane.net/)
- [こんな感じで。](http://blog.kuruten.jp/bat)
- [備忘録](http://blackuzume-memorandums.blogspot.com/)
- [でこちく徒然日記](http://decol.in/)
- [OM-D Style](http://blog.livedoor.jp/saga521-omd/)
- [Creazy!](http://creazy.net/)
- [むねさだブログ](http://munesada.com/)
- [ゆっきぃ's Photo Diary](http://www.mzkpp.com/)
- [always one step forward](http://masagrant55.hatenablog.com/)
- [我楽](http://blog.garaku.cc/)
- [不定期日記～ときどき書くよ](http://klipsch-soundman.blogspot.com/)
- [jimixi blog](http://jiminynseries.seesaa.net/)
- [まきこみ計画](http://www.cozymax.org/)
- [モバイルねこ](http://nokapo.blog99.fc2.com/)
- [ながるるままに](http://hk11419.com/)
- [Hinemosu](http://www.hide10.com/)
- [日常CandidPhoto](http://dailycandidphoto.blog.fc2.com/)
- [どんふぁんドットコム](http://www.donfuan.com/)
- [Another Dimension](http://anotherdimension.hatenablog.com/)


### Developer

Use provided script to compile and minify the script

```bash
./build.sh
```
