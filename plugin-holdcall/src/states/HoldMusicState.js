const HOLD_MUSIC_SELECTED = "HOLD_MUSIC"

const initialState = {
    currentHoldMusicUrl: null,
    currentHoldMusicName: null,
    isOpen: true,
};
/*
currentHoldMusicName: holdMusic.split(":")[0],
            currentHoldMusicUrl: holdMusic.split(":")[1],
*/


export class Actions {
    //static dismissBar = () => ({ type: "HOLD_MUSIC_SELECTED"});
    // static changeHoldMusic = (holdMusicUrl) => ({ type: HOLD_MUSIC_SELECTED, holdMusicUrl });
    // static changeHoldMusicName = (holdMusicName) => ({ type: HOLD_MUSIC_SELECTED, holdMusicName });
    static changeHoldMusic = (holdMusic) => {
        console.log("music", holdMusic);
        return {
            type: "HOLD_MUSIC_SELECTED",
            value: holdMusic,
        }
    }
}
export function reduce(state = initialState, action) {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (action.type) {
        case "HOLD_MUSIC_SELECTED": {
            console.log("music", action.value);
            const holdMusic = action.value;
            const holdMusicName = holdMusic.split("|")[0]
            const holdMusicUrl = holdMusic.split("|")[1]
            return {
                ...state,
                currentHoldMusicUrl: holdMusicName,
                currentHoldMusicName: holdMusicUrl,
            };
        }
        case "IS_OPEN": {
            return {
                ...state,
                isOpen: action.isOpen,
            }
        }
        default:
            return state;
    }
}