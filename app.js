import User from "./src/model/user";
import uikit from "uikit";
import findAndReplaceDOMText from "findAndReplaceDOMText";

var user = new User("Iran");
user.sayHi();

findAndReplaceDOMText(document.getElementById('t'), {
    find: /Hello/,
    wrap: 'em'
});

