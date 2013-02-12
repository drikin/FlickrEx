FlickrEx
========

FlickrExは、ブログなどWebページに貼られたFlickr画像に対して機能を拡張するJavaScriptです。
下記のテンプレートをコピペして自分のブログに貼り付けるだけで簡単に利用することができます。

FlickrEx自体はプラグイン的に必要な機能を選んで利用することを考えていますが、
現在はFlickr画像にExif情報を付加するExifExのみ利用可能です。

## 使い方

使い方は、下記のHTMLコードをコピーしてご自分のサイトに貼り付けるだけで利用できます。

```JavaScript
<script type="text/javascript">
    var FLICKR_API_KEY = "18c9f79a96fd34c3b3f16a93fb0a5d3c"; // this is optional
    var FLICKR_EXIF_FORMAT = "%camera% %Focal Length% f/%aperture% ISO %ISO Speed% %Exposure% sec";
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="//github.com/drikin/FlickrEx/raw/stable/flickrex.mini.js"></script>
<script type="text/javascript" src="//github.com/drikin/FlickrEx/raw/stable/exifex.mini.js"></script>
```

## ExifEXのカスタマイズ

付加するExif情報は上記テンプレートのFLICKR_EXIF_FORMATパラメータをカスタマイズすることで簡単にカスタマイズすることができます。
下記の%Label%で指定されたキーワードが実際のExif情報で置換されます。

### ExifExで利用可能なキーワード
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
