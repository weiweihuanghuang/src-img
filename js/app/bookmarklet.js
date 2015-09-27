(function() {
  var checkForRequire, libs, loadLibs, server, sourceImage;

  server = '//weiweihuanghuang.github.com/src-img/';

  libs = ['//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js', "" + server + "/js/lib/URI.js"];

  sourceImage = {
    exit: function(e) {
      $('a.src-img').remove();
      $('a.src-img-close').remove();
      e.preventDefault();
    },
    init: function() {
      var $style, close, count, flickrHost,
        _this = this;
      $style = $('<link>');
      $style.attr({
        rel: 'stylesheet',
        href: "" + server + "/css/bookmarklet.css",
        type: 'text/css'
      });
      $('head').append($style);
      count = 0;
      flickrHost = /flickr.com/i.test(window.location.hostname);
      $.each($('img'), function(index, img) {
        var $img, flickrID, searchUrl, src;
        $img = $(img);
        if ($img.height() < 100 || $img.width() < 100) return;
        count++;
        src = $img.attr('src');
        if (src.indexOf('http' < 0)) src = absolutizeURI(window.location, src);
        flickrID = /static.?flickr.com\/([0-9]*)\/([0-9]*)/i.exec(src);
        if (flickrID && !flickrHost) {
          searchUrl = "http://www.flickr.com/photo.gne?id=" + flickrID[2];
        } else {
          searchUrl = "http://images.google.com/searchbyimage?image_url=" + (escape(src)) + "&image_content=&bih=" + ($img.height()) + "&biw=" + ($img.width());
        }
        $('body').append("      <a class=\"src-img\" style=\"width:" + ($img.width()) + "px;height:" + ($img.height()) + "px;top:" + ($img.offset().top) + "px;left:" + ($img.offset().left) + "px;\" href=\"" + searchUrl + "\" target=\"_blank\"><span>&#63;&iquest;</span></a>      ");
      });
      if (count === 0) {
        alert('I couldn\'t find any images :(');
        return;
      }
      close = $("<a href=\"#\" class=\"src-img-close\">&times;</a>");
      $('body').append(close);
      $(close).bind('click', this.exit);
    }
  };

  loadLibs = function() {
    require(libs, function() {
      sourceImage.init();
    });
  };

  checkForRequire = function() {
    if (typeof require !== "undefined" && require !== null) {
      loadLibs();
      clearInterval(this.requireInt);
    } else {
      this.requireInt = setTimeout(checkForRequire, 100);
    }
  };

  checkForRequire();

}).call(this);
