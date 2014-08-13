shareImage
==========

Share images to all kinds of social networks.

### Usage

```js
$('article img').shareImage();
```

### Configuration

```js
$('article img').shareImage({
  getTitle: function() {
    return $(this).data('share-title');
  },
  getUrl: fuction() {
    return window.location.href;
  }
});
```

### Customize plattforms

```js
$('article img').shareImage({
  plattforms: {
    'facebook': false,
    'custom' : {
      url: 'http://example.com/?url={url}&title={title}&img={img}',
      helper: 'example'
    }
  }
});
```

### Destroy

```js
$('article img').shareImage('destroy');
```

### Demo

http://git.squareflower.de/shareImage/
