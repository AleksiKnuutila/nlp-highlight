import User from "./src/model/user";
import findAndReplaceDOMText from "findAndReplaceDOMText";

var user = new User("Iran");
user.sayHi();

findAndReplaceDOMText(document.getElementById('t'), {
    find: /Hello/,
    wrap: 'em'
});

