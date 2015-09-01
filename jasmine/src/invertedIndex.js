"use strict";

var json = require("../books.json"),
    Index = function() {};

Index.prototype.createIndex = function(filePath) {
    var dict = {};
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
var index1 = new Index(),
    getIndex = index1.createIndex(json);

Index.prototype.searchIndex = function(terms) {
    var check = {};
    if (arguments) {
        for (var i in arguments) {
            if (getIndex.hasOwnProperty(arguments[i])) {
                check[arguments[i]] = getIndex[arguments[i]];
            } else {
                check[arguments[i]] = "not found";
            }
        }
    }
    if (typeof terms === 'object') {
        for (var i in terms) {
            if (getIndex.hasOwnProperty(terms[i])) {
                check[terms[i]] = getIndex[terms[i]];
            } else {
                check[terms[i]] = "not found";
            }
        }
    } else {
        check[terms] = getIndex[terms];
    }
    return check;
};
var searchIndex = index1.searchIndex(["Alice", "in", "Wonderland", "slept"]);
