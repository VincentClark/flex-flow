
// This is your new function. To start, set the name and path on the left.

exports.handler = function (context, event, callback) {
    // Here's an example of setting up some TWiML to respond to with this function
    console.log("function");
    const holdMusicBase = "https://fsassets-9880.twil.io"
    const holdMusicArray = [
        "Star_Wars.wav",
        "Duel_Of_Fates.wav",
        "You_Are_Welcome.wav",
        "Smooth_Jazz.wav"
    ]

    console.log("music array", holdMusicArray)
    const musicSelection = (selection) => {
        console.log("selection x", event.selection);
        //this should be more flexible

        if (parseInt(selection) > holdMusicArray.length) {
            console.log("default", selection)
            return holdMusicArray[0]
        } else {
            return holdMusicArray[selection]
        }
    }
    const sendMusicSelection = `${musicSelection(event.selection)}`
    console.log("sendMusicSelection", sendMusicSelection);

    // You can log with console.log


    // This callback is what is returned in response to this function being invoked.
    // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
    // Or you might return JSON data to a studio flow. Don't forget it!
    return callback(null, sendMusicSelection);
};