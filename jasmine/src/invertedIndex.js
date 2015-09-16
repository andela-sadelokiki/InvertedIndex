'use strict';

/* function readJson loads the books.json file in a synchronous way because the data is needed 
 * during page load.
 */
function readJson(filePath) {
    var json;
    $.ajax({
        'async': false,
        'url': filePath,
        'dataType': 'json',
        'success': function(data) {
            json = data;
        }
    });
    return json;
}
//Assign data from 'books.json' to jsonArray
var jsonArray = readJson('books.json');

//Create index constructor
var Index = function() {};

//Create createIndex prototype of Index constructor
Index.prototype.createIndex = function(filePath) {
    //Object "bookIndex" is initialized, this is where the index will be.
    var bookIndex = {};
    //the JSON array gotten from the filepath is stored in json
    var json = readJson(filePath);
    //Loop through the json array to get the elements
    for (var i in json) {
        //loop through the array elements 
        for (var key in json[i]) {
            //the elements are split into 'text' and 'titles' and stored in words as arrays
            var words = json[i][key].split(' ');
            for (var j in words) {
                /*loop through the titles and texts, gets each word and assigns to word
                 *regular expression is also used to remove commas, colons and fullstops.
                 */
                var word = words[j].replace(/[:,.]/g, '');
                //Check if Object bookIndex has key, word
                if (bookIndex.hasOwnProperty(word)) {
                    /*if it does, we push the value which is the array position in array 
                     *called positionArray
                     */
                    var positionArray = bookIndex[word];
                    //check if the index exists
                    if (parseInt(i)) {
                        //assign indexes to position
                        var position = parseInt(i);
                        //check if the position already does not exist in positionArray, push to positionArray
                        if (positionArray.indexOf(position) < 0) {
                            positionArray.push(position);
                            /*assign bookIndex[word] as keys and positionArray as corresponding values of object
                             *bookIndex
                             */
                            bookIndex[word] = positionArray;
                        }
                    }
                    /*else if position exists,assign bookIndex[word] as keys and [parseInt(i)] as 
                     *corresponding values of object bookIndex   
                     */
                } else {
                    bookIndex[word] = [parseInt(i)];
                }
            }
        }
    }
    /*return object "bookIndex", containing the words and corresponding 
     *index when createIndex method is called
     */
    return bookIndex;
};

//Create new instance of Index constructor
var index1 = new Index();

//Call getIndex method on new instance on Index constructor
var getIndex = index1.createIndex;

//Filepath is passed in to get the bookList of words in the json file.
var bookList = getIndex('books.json');

//Create searchIndex prototype of Index constructor
Index.prototype.searchIndex = function(terms) {
    //Array "check" is initialized, this is where the search results will be.
    var check = [];
    // assign arguments to variable params
    var params = arguments;

    //check for multiple terms
    if (typeof terms === 'object') {
        params = terms;
    }
    /*Loop through booklist to check if the terms exist, then push the corresponding index
    into an array*/
    for (var word in bookList) {
        for (var j in params) {
            if (word === params[j]) {
                for (var k in bookList[word]) {
                    check.push(parseInt(bookList[word][k]));
                }
            }
        }
    }
    //return the array check when the function is called
    return check;
};

var searchResult = Index.prototype.searchIndex;
