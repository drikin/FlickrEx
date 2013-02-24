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
- %camera%
- %Make%
- %Model%
- %Orientation%
- %Resolution Unit%
- %Software%
- %Date and Time (Modified)%
- %Date and Time (Original)%
- %Date and Time (Digitized)%
- %White Point%
- %Exposure%
- %Aperture%
- %Exposure Program%
- %ISO Speed%
- %Exif Version%
- %Brightness Value%
- %Exposure Bias%
- %Max Aperture Value%
- %Metering Mode%
- %Light Source%
- %Flash%
- %Focal Length%
- %Focal Length (35mm format)%
- %Color Space%
- %Exposure Mode%
- %White Balance%
- %Scene Capture Type%
- %Contrast%
- %Saturation%
- %Sharpness%
- %Lens Info%
- %Lens Model%
- %Lens%
- %Gamma%

See more detail
> http://www.flickr.com/services/api/explore/flickr.photos.getExif

### Developer

Source is under src folder. Use the following to edit and compile the minified files. This assumes your developement environment has NodeJS installed.

```bash
npm install closure-compiler # run this the first time
./build.js # converts js -> min.js
```
