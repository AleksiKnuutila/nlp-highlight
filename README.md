# nlp-highlight
Semantic highlighting of natural language for readability

Programmers in particular are familiar with *syntax highlighting* of programming languages, colouring text to indicate the syntactical significance of words and characters. This project is a brief experiment to see whether a similar approach could improve readability of natural language.

My hypothesis is that for such highlighting to be useful, it would have to be based on the right kind of semantic distinctions, instead of syntactical ones. Adding semantic metadata to text is a hard problem, but current NLP tools have at least an indicative level of accuracy.

The demo uses the NLP SaaS TextRazor, and particularly the classifications in its entity recognition API. To make the interpretation of the highlighting sufficiently simple, the classifications are mapped to five semantic categories: people, organisations, places, numbers and quotes.

## Usage

`scripts/getjson.js` makes a request from the TextRazor API and saves the result as JSON that is later consumed to do the highlighting. The script takes the TextRazor API key as an argument, reads the analysed text from standard input and prints the JSON. An example of usage is:

```
cat article.txt | node scripts/getjson.js api-key > assets/article-analysed.js
```

The location of the JSON data is indicated in the first lines of `app.js`.

To compile the demo, run:

```
npm install
gulp
```

## Demo

https://aleksiknuutila.github.io/nlp-highlight/
