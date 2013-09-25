
(function ($) {
    $.fn.extend({
        parseUrlLink: function (options) {
            this.each(function () {
                if (options && typeof (options) == 'object') {
                    $.extend($.parseUrlLink.input, options);
                }
                new $.parseUrlLink(this);
            });
            return;
        }
    });
    $.parseUrlLink = function (elem) {
        var o = $.parseUrlLink.options;
        var i = $.parseUrlLink.input;
        if (i.text) {
            o.result = o.text = i.text;
        } else {
            o.result = o.text = $(elem).text();
        }
        $.parseUrlLink.replaceTag('http');
        $.parseUrlLink.replaceTag('www.');
        $(elem).html(o.result);
        $.parseUrlLink.input = {};
    };
    $.parseUrlLink.options = {
        template: '<a target="_blank" href="{0}">{1}</a>',
        text: '',
        result: '',
        count: null,
        lastindex: -1,
        link: '',
        tag: '',
        templink: '',
        prevtag: '',
        option: undefined
    };
    $.parseUrlLink.input = {};
    $.parseUrlLink.replaceTag = function (str) {
        var o = $.parseUrlLink.options;
        o.template = '<a target="_blank" href="{0}">{1}</a>';
        var re = new RegExp(str, 'gi');
        o.count = o.text.match(re);
        o.prevtag = '';
        if (o.count && o.count.length > 0) {
            for (var i = 0; i < o.count.length; i++) {
                o.lastindex = o.text.toLowerCase().indexOf(' ', o.text.toLowerCase().indexOf(str));
                if (o.text.toLowerCase().indexOf(str) > 0 && o.lastindex === -1) {
                    o.lastindex = o.text.length;
                }
                o.link = o.text.substring(o.text.toLowerCase().indexOf(str), o.lastindex).trim();
                var urlExp = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/gi;
                if (urlExp.test(o.link)) {
                    o.tag = o.template;
                    o.tag = o.tag.replace('{0}', (str === 'www.' ? 'http://' + o.link : o.link)).replace('{1}', o.link);
                    if (o.link.indexOf('+') > -1) {
                        o.templink = o.link.replace(new RegExp('\\+', 'gi'), '%2B');
                        o.result = o.result.split(o.link).join(o.templink);
                        o.text = o.text.split(o.link).join(o.templink);
                        o.link = o.templink;
                    }
                    if (o.prevtag.length === 0) {
                        o.result = o.result.replace(o.link, o.tag);
                    } else {
                        o.result = o.result.substring(0, o.result.lastIndexOf(o.prevtag) + o.prevtag.length) + o.result.replace(o.result.substring(0, o.result.lastIndexOf(o.prevtag) + o.prevtag.length), '').replace(o.link, o.tag);
                    }
                    o.text = o.text.replace(o.link, '');
                    o.prevtag = o.tag;
                } else {
                    o.text = o.text.replace(o.link, '');
                }
            }
        }
    };
} (jQuery));
