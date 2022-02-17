//create a vowl counter using regex

const vowelCounter = (str) => {
    const regex = /[aeiou]/gi;
    const matches = str.match(regex);
    return matches.length;
}

//list gps coordinates

