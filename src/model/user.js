class User {
	constructor(name){
		this.name = name;
	}

	sayHi(){
		console.log('Hi ' + this.name);
	}
}

module.exports = User;