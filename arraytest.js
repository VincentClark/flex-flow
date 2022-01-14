let obj = [
    {
        "subtopic":
            [
                { "topic": "thanks for sending this to me though this is not what support is for." },
                {
                    "data": "All good",
                    "heading": "If passenger agrees"
                },
                { "data": "Thank you for helping us verify" }
            ]
    },
    {
        "subtopic":
            [
                { "topic": "thanks for sending" },
                {
                    "data": "All goodHere is your ticket",
                    "heading": "If passenger agrees and has a ticket"
                },
                { "data": "Thank you for helping us verify Weird" }
            ]
    }
]


let search = obj.length;
parseObject = (point) => {

    let result = obj[point].subtopic.filter(x => x.data)
    //data into an array
    let arr = new Array()
    // put data into arr
    for (let i = 0; i < result.length; i++) {
        arr.push(result[i].data)
    }
    console.log(arr);

}
for (let ix = 0; ix < search; ix++) {
    parseObject(ix)
}

// //extract data from array ignore topic and heading
// let data = arr.map(x => {
//     if (x.data !== undefined) {
//         return x.data
//     }
// })

// console.log(data)
// //remove undefined from data
// let data2 = data.filter(x => x !== undefined)
// console.log(data2)

//extract tropic from array

