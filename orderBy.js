
/*
   Sometimes when hacking around with JavaScript, you come across the 
   need to find values of an array that do not exist in another array. 
   This tutorial explains how to create a method that does just that.
   Enjoy!
*/

var d = ['b', 'd', 'c', 'a'];

for(var i = 0; i < d.length; i++) {
    for(var j = 0; j < d.length; j++) {
        if(j == d.length - 1) break;

        if(d[i] > d[(i + 1) + j]) {
            var saveGreaterValue = d[i];
            d[i] = d[(i + 1) + j];
            d[(i + 1) + j] = saveGreaterValue;
        }
    }
}

console.log(d); //["a", "b", "c", "d"]

//Now that you know how to order an array. Think about how you can resuse this method in your JavaScript code?
Hint(create orderby method on the Array prototype!)
