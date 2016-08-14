var args = process.argv.slice(2);

var getJson = function(text) {

  var TextRazor = require('textrazor');
  var tr = new TextRazor(args[0]);

  tr.exec(text, { languageOverride: 'eng' })
    .then(res => formatJson(res, text))
    .catch(err => console.error(err));

}

var formatJson = function(data, text) {
  json = {};
  json['text'] = text;
  json['entities'] = data['response']['entities'];
  process.stdout.write(JSON.stringify(json));
}

process.stdin.resume();
process.stdin.setEncoding('utf8');
 
process.stdin.on('data', function (chunk) {
  var data = getJson(chunk);
});
