# nlp-highlight
Semantic highlighting of natural language for readability

Programmers in particular are familiar with *syntax highlighting* of programming languages, colouring text to indicate the syntactical significance of words and characters. This project is a brief experiment to see whether a similar approach could improve readability of natural language.

My hypothesis is that for such highlighting to be useful, it would have to be based on the right kind of semantic distinctions, instead of syntactical ones. Adding semantic metadata to text is a hard problem, but current NLP tools have at least an indicative level of accuracy.

The demo uses the NLP SaaS TextRazor, and particularly the classifications in its entity recognition API. To make the interpretation of the highlighting sufficiently simple, the classifications are mapped to five semantic categories: people, organisations, places, numbers and quotes.

## Usage

`scripts/

## Demo

https://aleksiknuutila.github.io/nlp-highlight/
