window.jQuery = require('jquery');
var Mustache = require('mustache');
var uikit = require('uikit');
var findAndReplaceDOMText = require('findAndReplaceDOMText');

// Find parts of text based on regexp and wrap it in span elements according to types
var findAndWrap = function(targetElement, regexp, types) {
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

// Highlight text based on types of entities found by NLP processor
var highlightText = function(entities, targetElement) {
  // NLP processor doesn't pick up on quotes so we'll do that separately
  findAndWrap(targetElement, '“.*?”', ['quote']);
  // Go through all of the entities recognised by the NLP processor
  for(i=0;i<entities.length;i++) {
    if(entities[i]['matchedText']) {
      var types = [];
      if(entities[i]['type']) {
        types = entities[i]['type'];
      }
      findAndWrap(targetElement, '\\b'+entities[i]['matchedText']+'\\b', types);
    }
  }
}

// New line into break elements
var nl2br = function(str) {
	var breakTag = '<br />';
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

// Unorthodox approach: let's modify the CSS rules instead of elements
var getCSSRule = function(ruleName) {
	ruleName = ruleName.toLowerCase();
	var result = null;
	var find = Array.prototype.find;
	find.call(document.styleSheets, styleSheet => {
		result = find.call(styleSheet.cssRules, cssRule => {
			return cssRule instanceof CSSStyleRule
				&& cssRule.selectorText.toLowerCase() == ruleName;
		});
		return result != null;
	});
	return result;
}

// Most direct way to toggle a CSS rule is by renaming it
var toggleCSSRule = function(ruleName) {
  ruleName = 'span.type-'+ruleName;
  var rule = getCSSRule(ruleName);
  if (rule) {
    rule.selectorText = ruleName+'-disabled';
    // if rule not there, assume it's disabled
  } else {
    var rule = getCSSRule(ruleName+'-disabled');
    rule.selectorText = ruleName;
  }
}

// Place the un-highlighted text in the right elements
// (TODO: remove hardcoded IDs from function)
var replaceText = function(json) {
  var template = window.jQuery('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {textbody: json['text']});
  window.jQuery('#target').html(nl2br(rendered));
  window.jQuery('#target2').html(nl2br(json['text']));
}

// Toggles whether type of entity is highlighted
// This is called from button onclick events
var toggleHighlight = function(type) {
  // change colour of button
  var button = document.querySelector('#button-'+type);
  button.classList.toggle('button-off');
  // TODO: we need some clustering of types here
  // We combine several types recognised by NLP processor, to make UI simpler
  var map = {
    'place': ['place'],
    'agent': ['company','product','organisation','newspaper'],
//    'person': ['person', 'agent'],
    'person': ['person'],
    'number': ['number','duration'],
    'quote': ['quote']
  };
  types = map[type];
  // change colour in text
  for(i=0;i<types.length;i++) {
    toggleCSSRule(types[i]);
  }
}

window.jQuery.getJSON('/assets/clarkson.json', function(data) {
  replaceText(data);
  highlightText(data['entities'], document.getElementById('target'));
  document.getElementById('button-person').addEventListener('click', function() { toggleHighlight('person'); });
  document.getElementById('button-agent').addEventListener('click', function() { toggleHighlight('agent'); });
  document.getElementById('button-place').addEventListener('click', function() { toggleHighlight('place'); });
  document.getElementById('button-quote').addEventListener('click', function() { toggleHighlight('quote'); });
  document.getElementById('button-number').addEventListener('click', function() { toggleHighlight('number'); });
});
