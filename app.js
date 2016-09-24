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

var findAndReplace = function(targetElement, regexp, types) {
  findAndReplaceDOMText(targetElement, {
    find: new RegExp(regexp, 'g'),
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

highlightText = function(json) {
  // NLP processor doesn't pick up on quotes so we'll do that separately
  findAndReplace(document.getElementById('target'), '“.*?”', ['quote']);
  // Go through all of the entities recognised by the NLP processor
  for(i=0;i<json['entities'].length;i++) {
    if(json['entities'][i]['matchedText']) {
      var types = [];
      if(json['entities'][i]['type']) {
        types = json['entities'][i]['type'];
      }
      findAndReplace(document.getElementById('target'), '\\b'+json['entities'][i]['matchedText']+'\\b', types);
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
