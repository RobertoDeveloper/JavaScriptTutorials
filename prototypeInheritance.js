/*
 This tutorial seeks to explain the prototype attribute
 and how it plays a role in JavaScript inheritance.
 */

//Create a Employee object.
function Employee(name) {
    this.name = name;
}

/*
 Attach method getName to the Employee.prototype
 This allows for other instances of Employee to inherit this method.
 */

Employee.prototype.getName = function() {
    return this.name;
}

//Create a object of Employee.
var myEmployee = new Employee('Roberto');

//You can call the getName method, because the getName method was attached to the Employee.prototype
console.log(myEmployee.getName()); // Roberto


/*
 Let's create a new object. This object will serve as an example
 that we can inherit the methods and properties from another object.
 */

//Let's first create the object PaidTimeOff.
function PaidTimeOff(empId) {
    this.hours = ([1,2,3,4,5,6])[empId];
}


//Take a close look at what is happening here.
//We are attaching a object of Employee to the Prototype attribute of the PaidTimeOff object.
//This allows the PaidTimeOff object to inherit all methods and properties from the Employee object.
PaidTimeOff.prototype = new Employee('Roberto');


//You can also attach more methods to the PaidTimeOff.prototype such as getHours
PaidTimeOff.prototype.getHours = function() {
    //the this keyword has access to the name property due to
    //the prototype chain. In other words, the javascript engine looks at the current
    //object PaidTimeOff, since the property does not exist there, the js runtime looked at the
    //prototype of PaidTimeOff, which is Employee.prototype. there the property does exist
    //so the value was retrieved from there.
    return this.name + ' has '+ this.hours + ' hours of PTO.';
}

var myPTO = new PaidTimeOff(3);

//Even though the object myPTO was created with the PaidTimeOff constructor, we can still access the getName
//method from the myPTO object since, we attached the Employee object to the PaidTimeOff.prototype attribute
console.log(myPTO.getName()); //Roberto

//And here we call the getHours method that was attached to the PaidTimeOff.prototype
console.log(myPTO.getHours()); // Roberto has 4 hours of PTO.


//please comment with any questions
