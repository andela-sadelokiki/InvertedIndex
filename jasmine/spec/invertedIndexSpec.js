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
    var bookList;

    beforeEach(function() {
        bookList = getIndex('books.json');

    });

    it("should ensure index is created once JSON file has been read", function() {
        expect(bookList).toBeDefined();

    });

    it("should ensure that index is correct", function() {
        expect(bookList.Wonderland).toEqual([0]);

    });
    it("should ensure index is not overwritten by a new JSON file.", function() {
        expect(bookList.of).toEqual([0, 1]);
    });
});

describe("Search Index", function() {
    var searchResult;

    beforeEach(function() {
        searchResult = Index.prototype.searchIndex
    })

    it("should be defined", function() {
        expect(searchResult).toBeDefined();
    });

    it("should ensure index returns the correct results when searched.", function() {
        expect(searchResult("Lord")).toEqual([1]);
        expect(searchResult("of")).toEqual([0, 1]);
        expect(searchResult("Alice")).toEqual([0]);
    });

    it("should ensure searchIndex can handle a varied number of search terms as arguments.", function() {
        expect(searchResult("Alice", "in", "Rings")).toEqual([0, 0, 1]);
    });


    it("should ensure searchIndex can handle an array of search terms.", function() {
        expect(searchResult(["Alice", "in", "Rings"])).toEqual([0, 0, 1]);
    });
});


describe("Get Index", function() {

    var bookList = getIndex('books.json');

    it("should ensure getIndex method takes a string argument that specifies the location of the JSON data", function() {
        expect(bookList).toBeDefined();

    });
});
