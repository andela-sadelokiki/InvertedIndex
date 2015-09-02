"use strict";

var json = require("../books.json");
var Index = require("../src/invertedIndex");

describe("Index", function() {

    describe("Read book data", function() {

        it("should check that JSON array is not empty", function() {
            expect(json).not.toBe([]);
        });

        it("should check that json array contains a property whose value is a string", function() {
            for (var i in json) {
                // console.log(json[i]);
                for (var k in json[i]) {
                    var type = typeof json[i][k];
                    expect(type).toBe("string");
                }
            }

        });
    });

    describe("Populate Index", function() {

        var index1 = new Index();
        var getIndex = index1.createIndex(json);

        // })

        it("should ensure index is created once JSON file has been read", function() {
            expect(getIndex).toBeDefined();
        });
        it("should ensure that index is correct", function() {
            expect(getIndex.Wonderland).toEqual([0]);
        });
        it("should ensure index is not overwritten by a new JSON file.", function() {
            expect(getIndex.of).toEqual([0, 1]);
        });
    });

    describe("Search Index", function() {

        var index1 = new Index();
        var search = index1.searchIndex("Alice");

        it("should ensure index returns the correct results when searched.", function() {
            expect(search.Alice).toEqual([0]);
        });
        it("should ensure searchIndex can handle a varied number of search terms as arguments.", function() {
            var search = index1.searchIndex("Alice", "in", "Wonderland");
            expect(search).toMatch({
                "Alice": [0],
                "in": [0],
                "Wonderland": [0]
            });
        });
        it("should ensure searchIndex can handle an array of search terms.", function() {
            var search = index1.searchIndex(["Alice", "in", "Wonderland"]);
            expect(search).toMatch({
                "Alice": [0],
                "in": [0],
                "Wonderland": [0]
            });
        });
    });

    describe("Get Index", function() {

        var index1 = new Index();
        var getJsonIndex = index1.createIndex("../books.json");

        it("should ensure getIndex method takes a string argument that specifies the location of the JSON data", function() {
            expect(getJsonIndex).toBeDefined();
        });
    });
});
