//create a vowl counter using regex

//is this an anagram?

//show all anagrams from a string

function showAnagram(str) {
    var anagrams = [];
    var strArray = str.split('');
    var strArrayLength = strArray.length;
    var strArrayLength = strArrayLength - 1;
    for (var i = 0; i < strArrayLength; i++) {
        for (var j = i + 1; j < strArrayLength; j++) {
            var temp = strArray[i];
            strArray[i] = strArray[j];
            strArray[j] = temp;
            anagrams.push(strArray.join(''));
            temp = strArray[i];
            strArray[i] = strArray[j];
            strArray[j] = temp;
        }
    }
    return anagrams;
}

//

console.log(showAnagram("lfginvy"));

var onresize = function (e) {
    // show button
    showButton();

}
window.addEventListener("resize", onresize);