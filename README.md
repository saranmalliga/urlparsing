urlparsing
==========

urlparsing provides you to parse urls in text content.

For example:

It will read all text content of a div and replace all urls with anchor tags
Here's an example:

```
$('.desc').parseUrlLink();
```



we can also assign some dynamic text to element
Here's an example:
```
$('.type2').parseUrlLink({
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. http://google.com/ '
});
```
