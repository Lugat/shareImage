/**
* shareImage v0.2.1
* https://github.com/Lugat/shareImage
*
* Copyright (c) 2014 Squareflower Websolutions - Lukas Rydygel
* Licensed under the MIT license
*/
;(function($, window, document, undefined) {
  
  function windowPop(e,c,d){var a,b;a=window.screen.width/2-(c/2+10);b=window.screen.height/2-(d/2+50);window.open(e,"","status=no,height="+d+",width="+c+",resizable=yes,left="+a+",top="+b+",screenX="+a+",screenY="+b+",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no")};
  
  var PLUGIN_NAME = 'shareImage',
      PLUGIN_VERSION = '0.2.1',
      PLUGIN_OPTIONS = {
        helper: 'tl',
        plattforms: {
          'facebook': {
            uri: 'https://www.facebook.com/sharer/sharer.php?u={url}?title={title}&img={img}',
            helper: 'facebook'
          },
          'twitter': {
            uri: 'https://twitter.com/share?url={url}&text={title}',
            helper: 'twitter'
          },
          'google-plus': {
            uri: 'https://plus.google.com/share?url={url}&title={title}&img={img}',
            helper: 'google-plus'
          },
          'pinterest': {
            uri: 'http://pinterest.com/pin/create/button/?url={url}&description={title}&media={img}',
            helper: 'pinterest'
          },
          'linkedin': {
            uri: 'http://www.linkedin.com/shareArticle?mini=true&url={url}?title={title}&img={img}',
            helper: 'linkedin'
          },
          'buffer': {
            uri: 'http://bufferapp.com/add?url={url}&text={title}&img={img}',
            helper: 'share-alt'
          },
          'digg': {
            uri: 'http://digg.com/submit?url={url}&title={title}&img={img}',
            helper: 'digg'
          },
          'tumblr': {
            uri: 'http://www.tumblr.com/share/link?url={url}&name={title}&img={img}',
            helper: 'tumblr'
          },
          'reddit': {
            uri: 'http://reddit.com/submit?url={url}&title={title}&img={img}',
            helper: 'reddit'
          },
          'stumbleupon': {
            uri: 'http://www.stumbleupon.com/submit?url={url}&title={title}&img={img}',
            helper: 'stumbleupon'
          },
          'delicious': {
            uri: 'https://delicious.com/save?v=5&url={url}&title={title}&img={img}',
            helper: 'delicious'
          }
        },
        getTitle: function() {
          return $(this).attr('alt');
        },
        getUrl: function() {
          return $(this).parent('article').find('h1, h2, h3').children('a').attr('href');
        }
      };
      
  function Plugin(options, element) {
    
    this.name = PLUGIN_NAME;
    this.version = PLUGIN_VERSION;        
    this.opt = $.extend(true, {}, PLUGIN_OPTIONS, options);
    
    this.tmp = {};

    this.element = element;
    this.$element = $(element);
    
    this._init();
    
  };
  
  Plugin.prototype = {
    
    _init: function() {
      
      this._buildHtml();

      $(document).on('click', '.share-image-buttons a', function(e) {
        e.preventDefault();
        var $this = $(this),
            size = $this.data('size').split(',');
        windowPop($(this).attr('href'), size[0], size[1]);
      });
      
    },
    
    _buildHtml: function() {

      this.tmp['class'] = this.$element.attr('class');
      this.tmp['style'] = this.$element.attr('style');
      
      if (this.tmp['class'] === undefined) {
        this.tmp['class'] = '';
      }
      
      if (this.tmp['style'] === undefined) {
        this.tmp['style'] = '';
      }
      
      this.$element.removeAttr('class style');

      var img = encodeURIComponent(this.$element.attr('src')),
          title = this.opt.getTitle.apply(this.element),
          url = encodeURIComponent(this.opt.getUrl.apply(this.element)),
          $element,
          obj, uri,

          html = '<span class="share-image-buttons '+this.opt.helper+'">';

          for (var plattform in this.opt.plattforms) {
            if (this.opt.plattforms.hasOwnProperty(plattform)) {

              if (this.opt.plattforms[plattform] !== false) {
                
                var obj = $.extend(true, {}, {
                  helper: plattform,
                  title: 'share on '+plattform,
                  size: [480, 320]
                }, this.opt.plattforms[plattform]);

                uri = obj.uri.replace('{title}', title).replace('{url}', url).replace('{img}', img);

                html += '<a href="'+uri+'" target="_blank" class="btn-'+obj.helper+'" data-size="'+obj.size.toString()+'" title="'+obj.title+'"><i class="fa fa-'+obj.helper+'"></i></a>';

              }

            } 
          }

          html += '</span>';

      if ($(this.element, 'a').length === 0) {
        $element = this.$element.parents('a');
      } else {
        $element = this.$element;
      }

      $element.wrap('<div class="'+this.tmp['class']+'" style="'+this.tmp['style']+'" />').wrap('<div class="share-image clearfix" />').after(html);
      
    },
    
    destroy: function() {
      
      this.$element.parent('.share-image').children('.share-image-buttons').remove();
      
      var $element;
      
      if ($(this.element, 'a').length === 0) {
        $element = this.$element.closest('a');
      } else {
        $element = this.$element;
      }
      
      $element.unwrap().unwrap();
      
      var tmp = this.$element.data()
      
      this.$element.attr({
        'class': this.tmp['class'],
        'style': this.tmp['style']
      });
      
      $(document).off('click', '.share-image-buttons a'); 
      
    }
    
  };

  $.widget.bridge(PLUGIN_NAME, Plugin);

}(jQuery, window, document));