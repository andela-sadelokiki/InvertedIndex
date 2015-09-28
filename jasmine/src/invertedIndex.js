'use strict';

var Index = function() {
  this.file = null;
  this.docs = null;
  this.index = null;
};

/* function readJson loads the books.json file in a synchronous way because the data is needed
 * during page load.
 */
Index.prototype.loadJson = function(filePath) {
  var jsonDocument;
  $.ajax({
    'async': false,
    'url': filePath,
    'dataType': 'json',
    'success': function(data) {
      jsonDocument = data;
    }
  });
  this.docs = jsonDocument;
  return this.docs;
};

//This method creates an Index from the argument, and assigns it to an instance variable
Index.prototype.createIndex = function(filePath) {
  this.file = filePath;
  var result = {};
  this.loadJson(filePath);
  var jsonFile = this.docs;
  jsonFile.forEach(function(element, index) {
    //This removes 'text', 'title', and other characters from json object
    var jsonString = JSON.stringify(element)
      .replace(/,(?=\s)|[:.{}""]|\btitle\b|\btext\b/g, '')
      .replace(/,(?=\S)/g, ' ')
      .split(' ');
    for (var i = 0; i < jsonString.length; i++) {
      if (result.hasOwnProperty(jsonString[i])) {
        var positionArray = result[jsonString[i]];
        if (positionArray.indexOf(index) < 0) {
          positionArray.push(index);
          result[jsonString[i]] = positionArray;
        }
      } else {
        result[jsonString[i]] = [index];
      }
    }
  });
  this.index = result;
};

//This method returns an object that is an accurate index of the content of the JSON file.
Index.prototype.getIndex = function(jsonPath) {
  if (jsonPath === this.file) {
    return this.index;
  }
};

//This method returns an array of numbers, representing the index of an object in the JSON file.
Index.prototype.searchIndex = function(terms) {
  var result = [],
    //Using arguments as variable name throws error in strict mode
    params = arguments;
  if (typeof terms === 'object') {
    params = terms;
  }
  for (var word in this.index) {
    for (var j = 0; j < params.length; j++) {
      if (word === params[j]) {
        for (var k = 0; k < this.index[word].length; k++) {
          result.push(parseInt(this.index[word][k]));
        }
      }
    }
  }
  return result;
};
