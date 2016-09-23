window.jQuery = require('jquery');
var Mustache = require('mustache');
var uikit = require('uikit');
var findAndReplaceDOMText = require('findAndReplaceDOMText');

var replaceText = function(json) {
  var template = window.jQuery('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {textbody: json['text']});
  window.jQuery('#target').html(nl2br(rendered));
  window.jQuery('#target2').html(nl2br(json['text']));
}

highlightText = function(json) {
  for(i=0;i<json['entities'].length;i++) {
    if(json['entities'][i]['matchedText']) {
      var types = [];
      if(json['entities'][i]['type']) {
        types = json['entities'][i]['type'];
      }
      findAndReplaceDOMText(document.getElementById('target'), {
        find: new RegExp('\\b'+json['entities'][i]['matchedText']+'\\b', 'g'),
        replace: function(portion) {
      		var el = document.createElement('span');
					for(j=0;j<types.length;j++) {
        		el.className += 'type-'+ types[j].toLowerCase() + ' ';
					}
      		el.innerHTML = portion.text;
      		return el;
      	}
      });
    }
  }
}

function nl2br (str) {
    var breakTag = '<br />';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

window.jQuery.getJSON('/assets/clarkson.json', function(data) {
  replaceText(data);
  highlightText(data);
});

// ['type'] = ['Work']
// ['type'] = ['Agent']
// ['type'] = ['Place']
// ['type'] = ['Company']
// ['type'] = ['Number']
// ['type'] = ['Duration']
// ['type'] = ['Duration']
