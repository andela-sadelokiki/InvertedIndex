"use strict";

describe("Index", function() {
    var json;

    describe("Read book data", function() {

        beforeEach(function() {
            json = readJson('books.json');
        });

        it("should check that JSON array is not empty", function() {
            expect(json.length).not.toBe(0);
        });

        it("should check that json array contains a property whose value is a string", function() {
            for (var i in json) {
                for (var k in json[i]) {
                    var type = typeof json[i][k];
                    expect(type).toBe("string");
                }
            }

        });
    });

});

describe("Populate Index", function() {
    var list;

    beforeEach(function() {
        list = getIndex('books.json');
    });

    it("should ensure index is created once JSON file has been read", function() {
        expect(list).toBeDefined();
    });

    it("should ensure that index is correct", function() {
        expect(list.Wonderland).toEqual([0]);
    });
    it("should ensure index is not overwritten by a new JSON file.", function() {
        expect(list.of).toEqual([0, 1]);
    });
});

describe("Search Index", function() {
    var searchResult;

    beforeEach(function() {
        searchResult = search("Alice", "in", "Wonderland");
    })

    it("should ensure index returns the correct results when searched.", function() {
        expect(searchResult.Alice).toEqual([0]);
    });
    it("should ensure searchIndex can handle a varied number of search terms as arguments.", function() {
        expect(searchResult).toEqual({
            "Alice": [0],
            "in": [0],
            "Wonderland": [0]
        });
    });
    it("should ensure searchIndex can handle an array of search terms.", function() {
        searchResult = search(["Alice", "in", "Wonderland"])
        expect(searchResult).toEqual({
            "Alice,in,Wonderland": 'not found',
            "Alice": [0],
            "in": [0],  
            "Wonderland": [0]
        });
    });
});

describe("Get Index", function() {

    var list = getIndex('books.json');

    it("should ensure getIndex method takes a string argument that specifies the location of the JSON data", function() {
        expect(list).toBeDefined();
    });
});
