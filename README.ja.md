FlickrEx
========

FlickrExは、ブログなどWebページに貼られたFlickr画像に対して機能を拡張するJavaScriptです。
下記のテンプレートをコピペして自分のブログに貼り付けるだけで簡単に利用することができます。

FlickrEx自体はプラグイン的に必要な機能を選んで利用することを考えていますが、
現在はFlickr画像にExif情報を付加するExifExのみ利用可能です。

## 使い方

使い方は、下記のHTMLコードをコピーしてご自分のサイトに貼り付けるだけで利用できます。

```HTML
<script type="text/javascript">
    //var FLICKREX_API_KEY = "18c9f79a96fd34c3b3f16a93fb0a5d3c";
    //var FLICKREX_EXIF_FORMAT = "%camera% / %Focal Length% / f/%aperture% / ISO %ISO Speed% / %Exposure% sec / %Exposure Bias% EV / %Software%";
    //var FLICKREX_EXIF_JQUERY_SELECTOR = "#content img";
</script>
<script>(window.jQuery && parseFloat(window.jQuery().jquery) > 1.5) || document.write('<script src="//flickrex.drikin.com/stable/vendor/jquery-1.9.0.min.js"><\/script>')</script>
<script src="//flickrex.drikin.com/stable/flickrex.min.js"></script>
<script src="//flickrex.drikin.com/stable/exifex.min.js"></script>
```

注) 上記テンプレートは一見グローバル変数を利用しているように見えますが、実際にはFlickrExのスクリプト内でネームスコープを変更しているのでグローバル変数が残ることはありません。テンプレートの見た目を優先して上記のような仕様にしました。

## ExifEXのカスタマイズ

付加するExif情報は上記テンプレートのFLICKR_EXIF_FORMATパラメータをカスタマイズすることで簡単にカスタマイズすることができます。
下記の%Label%で指定されたキーワードが実際のExif情報で置換されます。

### ExifExで利用可能なキーワード
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

### Developer


```bash
./build.sh
```
