/**
* shareImages v1.1
* https://github.com/Lugat/shareImages
*
* Copyright (c) 2014 Squareflower Websolutions - Lukas Rydygel
* Licensed under the MIT license
*/
;(function($, window, document, undefined) {
  
  function windowPop(e,c,d){var a,b;a=window.screen.width/2-(c/2+10);b=window.screen.height/2-(d/2+50);window.open(e,"","status=no,height="+d+",width="+c+",resizable=yes,left="+a+",top="+b+",screenX="+a+",screenY="+b+",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no")};
  
  var PLUGIN_NAME = 'shareImage',
      PLUGIN_VERSION = '0.1',
      PLUGIN_OPTIONS = {
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
    this.opt = PLUGIN_OPTIONS;

    this.element = element;
    this.$element = $(element);
      
    this.setOptions(options);
    
    this._init();
    
  };
  
  Plugin.prototype = {
    
    _init: function() {
      
      this._buildHtml();

      $(document).on('click', '.share-image-buttons a', function(e) {
        e.preventDefault();
        windowPop($(this).attr('href'), 626, 437);
      });
      
    },
    
    _buildHtml: function() {

      var img = encodeURIComponent(this.$element.attr('src')),
          title = this.opt.getTitle.apply(this.element),
          url = this.opt.getUrl.apply(this.element),
          $element,
          uri, helper,

          html = '<span class="share-image-buttons">';

          for (var plattform in this.opt.plattforms) {
            if (this.opt.plattforms.hasOwnProperty(plattform)) {

              if (this.opt.plattforms[plattform] !== false) {

                uri = this.opt.plattforms[plattform].uri.replace('{title}', title).replace('{url}', url).replace('{img}', img);
                helper = this.opt.plattforms[plattform].helper;

                html += '<a href="'+uri+'" target="_blank" class="btn-'+helper+'"><i class="fa fa-'+helper+'"></i></a>';

              }

            } 
          }

          html += '</span>';

      if ($(this.element, 'a').length === 0) {
        $element = this.$element.parents('a');
      } else {
        $element = this.$element;
      }

      $element.wrap('<div class="share-image clearfix" />').after(html);
      
    },
    
    setOptions: function(options) {
        this.opt = $.extend(true, {}, this.opt, options);
    },

    getOptions: function() {
        return this.opt;
    },

    options: function(options) {
        return typeof options === 'object' ? this.setOptions(options) : this.getOptions();
    },

    option: function(option, value) {
      if (typeof option === 'string' && this.opt[option]) {
        if (value === undefined) {
          return this.opt[option];
        } else {
          this.opt[option] = value;
        }
      }
    },
    
    destroy: function() {
      
      this.$element.parent('.share-image').children('.share-image-buttons').remove();
      
      var $element;
      
      if ($(this.element, 'a').length === 0) {
        $element = this.$element.closest('a');
      } else {
        $element = this.$element;
      }
      
      $element.unwrap();
      
      $(document).off('click', '.share-image-buttons a'); 
      
    }
    
  };

  $.widget.bridge(PLUGIN_NAME, Plugin);

}(jQuery, window, document));