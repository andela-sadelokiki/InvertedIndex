var data = [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
        "title": "The Alice Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
];
var arr = [];
var dict = {}

var getIndex = function() {
    for (var i in data) {
        for (var key in data[i]) {
            var words = data[i][key].split(" ");
            for (var j in words) {
                var word = words[j].replace(/[:,.]/g, '') 
                if (dict.hasOwnProperty(word)) {
                    var posArr = dict[word];
                    if (parseInt(i)) {
                        var position = parseInt(i)
                        if (posArr.indexOf(position) < 0) {
                            posArr.push(parseInt(i));
                            dict[word] = posArr
                        }
                    }
                } else {
                    dict[word] = [parseInt(i)];
                }
            }
        }
    }
    console.log(dict);
    return dict
}

getIndex();

var searchIndex = function(terms) {
    var check = {};
    check[terms] = getIndex()[terms]
    console.log(check);
    return check;
}
searchIndex("man");
