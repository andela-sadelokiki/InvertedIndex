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
    var dict = {};
    var json = readJson(filePath);
    for (var i in json) {
        for (var key in json[i]) {
            var words = json[i][key].split(' ');
            for (var j in words) {
                var word = words[j].replace(/[:,.]/g, '');
                if (dict.hasOwnProperty(word)) {
                    var posArr = dict[word];
                    if (parseInt(i)) {
                        var position = parseInt(i);
                        if (posArr.indexOf(position) < 0) {
                            posArr.push(position);
                            dict[word] = posArr;
                        }
                    }
                } else {
                    dict[word] = [parseInt(i)];
                }
            }
        }
    }
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
    var check = {};
    if (arguments) {
        for (var i in arguments) {
            if (list.hasOwnProperty(arguments[i])) {
                check[arguments[i]] = list[arguments[i]];
            } else {
                check[arguments[i]] = "not found";
            }
        }
    }
    if (typeof terms === 'object') {
        for (var i in terms) {
            if (list.hasOwnProperty(terms[i])) {
                check[terms[i]] = list[terms[i]];
            } else {
                check[terms[i]] = "not found";
            }
        }
    } else {
        check[terms] = list[terms];
    }
    return check;
};

var search = index1.searchIndex;
var searchResult = search("Alice", "in", "Wonderland");

