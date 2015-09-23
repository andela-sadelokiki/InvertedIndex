'use strict';

describe('Index', function() {

  var jsonFile = loadJson('books.json');
  var index = new Index();
  index.createIndex('books.json');
  var result = index.getIndex('books.json');

  describe('Read book data', function() {
    it('should check that JSON array is not empty', function() {
      expect(jsonFile.length).not.toBe(0);
    });

    it('should check that json array contains a property whose value is a string', function() {
      for (var i in jsonFile) {
        for (var k in jsonFile[i]) {
          expect(typeof jsonFile[i][k]).toEqual(jasmine.any(String));
        }
      }
    });
  });

  describe('Populate Index', function() {
    it('should ensure index is created once JSON file has been read', function() {
      expect(result.length).not.toBe(0);
    });

    it('should ensure that index is correct', function() {
      expect(result['Wonderland']).toEqual([0]);
    });

    it('should ensure index is not overwritten by a new JSON file.', function() {
      expect(result['of']).toEqual([0, 1]);
    });
  });

  describe("Search Index", function() {
    it('should be defined', function() {
      expect(index.searchIndex()).toBeDefined();
    });

    it('should ensure index returns the correct results when searched.', function() {
      expect(index.searchIndex('Lord')).toEqual([1]);
      expect(index.searchIndex('of')).toEqual([0, 1]);
      expect(index.searchIndex('Alice')).toEqual([0]);
    });

    it('should ensure searchIndex can handle a varied number of search terms as arguments.', function() {
      expect(index.searchIndex('Alice', 'of', 'Rings')).toEqual([0, 0, 1, 1]);
    });

    it('should ensure searchIndex can handle an array of search terms.', function() {
      expect(index.searchIndex(['Alice', 'of', 'Rings'])).toEqual([0, 0, 1, 1]);
    });
  });

  describe('Get Index', function() {
    it('should ensure getIndex method takes a string argument that specifies the location of the JSON data', function() {
      expect(index.getIndex('books.json')).toBeDefined();
    });
  });

});
