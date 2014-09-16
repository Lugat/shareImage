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

### Position and floating direction

Possible positions are:
cc: center/center
lc: left/center
rc: right/center
tl: top/left (default)
tr: top/right
tc: top/center
bl: bottom/left
br: bottom/right
bc: bottom center

Additional floating direction can be (default: vertical):
h: horizontal

```js
$('article img').shareImage({
  helper: 'tl h'
});
```

### Destroy

```js
$('article img').shareImage('destroy');
```

### Demo

http://git.squareflower.de/shareImage/
