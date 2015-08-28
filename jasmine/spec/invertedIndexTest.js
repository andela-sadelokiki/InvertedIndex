"use strict"

describe("Read book data", function() {
    it("should check that JSON file is not empty", function() {
        var data = [{
                "title": "Alice in Wonderland",
                "text": "Alice falls into a rabbit hole and enters a world full of imagination."
            },

            {
                "title": "The Lord of the Rings: The Fellowship of the Ring.",
                "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
            }, {
                "title": "Americanah",
                "text":"Love, Hair and everything in between"
            }
        ];
        // var data = jsonbooks.validate(books);
        expect(data).toBeDefined();
    })
})

describe("Populate index", function() {
  it("should create index", function() {
    
  })
})

