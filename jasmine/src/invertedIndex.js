"use strict";

// function readJson loads the books.json file in a synchronous way because the data is needed 
// during page load.
function readJson(filePath) {
    var json;
    $.ajax({
        'async': false,
        'url': filePath,
        'dataType': "json",
        'success': function(data) {
            json = data;
        }
    });
    return json;
}

//Create index constructor
var Index = function() {};

//Create createIndex prototype of Index constructor
Index.prototype.createIndex = function(filePath) {
    //Object "dict" is initialized, this is where the index will be.
    var dict = {};
    //the JSON array gotten from the filepath is stored in json
    var json = readJson(filePath);
    //Loop through the json array to get the elements
    for (var i in json) {
        //loop through the array elements 
        for (var key in json[i]) {
            //the elements are split into 'text' and 'titles' and stored in words as arrays
            var words = json[i][key].split(' ');
            for (var j in words) {
                //loop through the titles and texts, gets each word and assigns to word
                //regular expression is also used to remove commas, colons and fullstops.
                var word = words[j].replace(/[:,.]/g, '');
                //Check if Object dict has key, word
                if (dict.hasOwnProperty(word)) {
                    //if it does, we push the value which is the array position in array called posArr
                    var posArr = dict[word];
                    //check if the index exists
                    if (parseInt(i)) {
                        //assign indexes to position
                        var position = parseInt(i);
                        //check if the position already does not exist in posArr, push to posArr
                        if (posArr.indexOf(position) < 0) {
                            posArr.push(position);
                            //assign dict[word] as keys and posArr as corresponding values of object dict
                            dict[word] = posArr;
                        }
                    }
                    //else if position exists,assign dict[word] as keys and [parseInt(i)] as 
                    //corresponding values of object dict   
                } else {
                    dict[word] = [parseInt(i)];
                }
            }
        }
    }
    //return object "dict", containing the words and corresponding index when createIndex method is called 
    return dict;
};

//Create new instance of Index constructor
var index1 = new Index();

//Call getIndex method on new instance on Index constructor
var getIndex = index1.createIndex;

//Filepath is passed in to get the list of words in the json file.
var list = getIndex("books.json");



//Create searchIndex prototype of Index constructor
Index.prototype.searchIndex = function(terms) {
    //Object "check" is initialized, this is where the search results will be.
    var check = {};
    //check for single terms as arguments
    if (arguments) {
        //loop through the argument
        for (var i in arguments) {
            //check if it exists in list
            if (list.hasOwnProperty(arguments[i])) {
                //assign check[arguments[i]] as keys and list[arguments[i]] as 
                //corresponding values of object check
                check[arguments[i]] = list[arguments[i]];
            }
            //if it does not exist in the list, print "not found"
            else {
                check[arguments[i]] = "not found";
            }
        }
    }
    //check for multiple terms as arguments
    if (typeof terms === 'object') {
        //loop through the arguments
        for (var i in terms) {
            //check if it exists in list
            if (list.hasOwnProperty(terms[i])) {
                //assign check[terms[i]] as keys and list[terms[i]] as 
                //corresponding values of object check
                check[terms[i]] = list[terms[i]];
            } //if it does not exist in the list, print "not found"
            else {
                check[terms[i]] = "not found";
            }
        }
    } else {
        check[terms] = list[terms];
    }
    //return object "check", containing the searchresults and corresponding index 
    //when searchIndex method is called 
    return check;
};

var search = index1.searchIndex;
