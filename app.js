//import User from "./src/model/user";
//import $ from 'jquery';
//import jQuery from 'jquery';
//window.jQuery = require('jquery');
//import uikit from "uikit";
//import findAndReplaceDOMText from "findAndReplaceDOMText";

//import User from "./src/model/user";
//import $ from 'jquery';
//import jQuery from 'jquery';
window.jQuery = require('jquery');
var uikit = require('uikit');
var findAndReplaceDOMText = require('findAndReplaceDOMText');

findAndReplaceDOMText(document.getElementById('t'), {
    find: /Hello/,
    wrap: 'em'
});

