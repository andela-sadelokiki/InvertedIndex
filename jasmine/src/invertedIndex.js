var data = [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
];
var arr = [];
var dict = {}
for (var i in data) {
    for(var key in data[i]) {
        var words = data[i][key].split(" ");
        for(var j in words) {
            var word = words[j];
            if(dict.hasOwnProperty(word)) {
                var posArr = dict[word];
                if(parseInt(i)) {
                posArr.push(parseInt(i));
                dict[word] = posArr
                }
            }
            else {
                dict[word] = [parseInt(i)];
            }
        }
    }
}
dict;