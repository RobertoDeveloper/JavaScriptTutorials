/**
 * Created by RobertoRolon on 2/18/16.
 */


/**
 * Let's build a simple reusable grid component using just JavaScript and Twitter Bootstrap!
 * Required Files: ReusableGridComponent.js and ReusableGridComponent.html
 *
 * Outcomes:
 * How to use the popular extend method in JavaScript
 * How to create and expose modules to the global namespace or scope
 * How to dynamically allow implementers to set column names for their tables
 * How to dynamically allow implementers to set data for their tables
 */


/*      First, let's create a self executing anonymous function.
            Inside this function we are creating the module or namespace Helper.
            we assign this method a method that self executes itself.
        Take a look at what is going on inside this function.
            I'm using the revealing module pattern to encapsulate public and private methods
            As you can see I'm returning an object literal in the beginning of the function,
            which quickly allows another developer to see what methods are exposed by the closure and which are not.
        With that said, we can easily see that the extend method is being exposed as a public method.
            This method is quite easy to understand. The first parameter which I denote as base refers to an object
            that has properties set with default values. The second parameter refers to an object that wants to override some or
            all of the default properties set in the parameter named base.
         If you look at the body of this method, you can see that there is a simple for loop that iterates through the
            properties of the overrideBase object. Take a look at the hasOwnProperty method, this method is inherited from
            the object named Object, since the object that will be passed into this method will be a descendant from Object.
        This method simply checks if the property passed into the method exists on the overrideBase object.
        If this method yields true then we override the property in the base object to what is defined in the overrideBase
        object. Then we return the base object.
*/

(function (window) {
    var Helper = (function () {
        return {
            extend: extend
        }

        function extend(base, overrideBase) {
            for (var i in overrideBase) {
                if (overrideBase.hasOwnProperty(i)) {
                    base[i] = overrideBase[i];
                }
            }
            return base;
        }
    })();

    window.Helper = Helper;

})(window);

/*I will finish explaining the following code in a couple of days, however please
  pull this code down from GitHub and run it locally on your local machine. Review the code
  and try to understand how by just passing the necessary gridOption object to the constructor function
  of the module, you can create a grid and populate it with data without rewriting any javascript, html and css.
  Keep in mind, I have created two modules in this tutorial. With that said, each of those modules could of been defined
  in their own JavaScript file. However, in order to reduce the complexity of this tutorial I decided to
  leave them in this very file.
*/

(function (window) {

    function GridComponent(gridOptions) {
        this.gridOptions = Helper.extend(this.gridOptions, gridOptions);
        this._constructBaseTable();
    }

    GridComponent.prototype.gridOptions = {
        container: document.body,
        tableColumns: null,
        gridData: null
    }

    GridComponent.prototype._constructBaseTable = function () {
        var tc = this.gridOptions.tableColumns;
        var tableString = '';

        tableString += '<table class="table table-bordered">';
        tableString += '<thead> <tr>'

        for (var i in tc) {
            tableString += '<th>' + tc[i].displayName + '</th>';
        }

        tableString += '</tr>';
        tableString += '</thead>';

        this.tableString = tableString;

        this._fetchData();
    }

    GridComponent.prototype._fetchData = function () {
        var gridOptions = this.gridOptions,
            tc = gridOptions.tableColumns,
            gd = gridOptions.gridData,
            ts = this.tableString;

        ts += '<tbody>';

        for (var i in gd) {
            ts += '<tr>';

            for (var j in tc) {
                var propertyName = tc[j].propertyName;
                ts += '<td>' + gd[i][propertyName] + '</td>';
            }

            ts += '</tr>';
        }

        ts += '</tbody> </table>';
        gridOptions.container.innerHTML = ts;
    }


    window.GridComponent = GridComponent;

})(window);

(function () {
    var gridOptions = { container : document.getElementById('gridContainer1')};
    gridOptions.tableColumns = [{ displayName: 'First Name', propertyName: 'firstname' }, { displayName: 'Last Name',  propertyName: 'lastname'  }, { displayName: 'Twitter Account', propertyName: 'twitterAccount'}, { displayName: 'Job Title', propertyName: 'title'}];
    gridOptions.gridData = [{firstname: 'Roberto', lastname: 'Rolon', twitterAccount: '@RobertoRolon_', title: 'Software Engineer'}];

    var gridOptions2 = {container : document.getElementById('gridContainer2')};
    gridOptions2.tableColumns = [{displayName : 'Twitter Account', propertyName : 'twitterAccount'}, {displayName : 'Job Title', propertyName:'title'}];
    gridOptions2.gridData = [{twitterAccount: '@John_Papa', title: 'Principal Developer'}];

    var gridComponent = new GridComponent(gridOptions);
    var gridComponent2 = new GridComponent(gridOptions2);

})();
