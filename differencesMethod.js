/*
    There will come a time when you need to find values that are different from one array object to another.
    This file aims to explain how you can do this. Enjoy!
*/


(function() {

    //this does not work, Array objects do not innately have a differences function. 
    //however, you can attach methods via the prototype attribute in order to make them accessible to other objects. 
    //take a look how to do this below.
    try {
         [1,2,3].differences([3,4]);        
    }catch(e) {console.log(e)}


    //Attaching this method to the Array.prototype allows other array objects to call this method
    Array.prototype.differences = function(array) {    
        var filteredArray = this.filter(function(i) {
            return array.indexOf(i) == -1;
        }); 

    return filteredArray;
}

    //this returns an array object with the values that do not exist in the [3,4] array object
    console.log([1,2,3].differences([3,4])); 
    
    console.log([3,4].differences([1,2,3]));
})();
