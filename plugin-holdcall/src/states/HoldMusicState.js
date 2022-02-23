//copied from taskListState.js


const HOLD_MUSIC_SELECTED = 'NO NEED FOR THIS NOISE';

const initialState = {
    holdMusicArray: [],
    currentHoldMusicUrl: "",
    currentHoldMusicName: "",
    isOpen: true,
};



export class Actions {
    static dismissBar = () => ({ type: HOLD_MUSIC_SELECTED });
}

export function reduce(state = initialState, action) {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (action.type) {
        case "HOLD_MUSIC_SELECTED": {
            return {
                ...state,
                currentHoldMusicUrl: action.holdMusicUrl,
                currentHoldMusicName: action.holdMusicName,
                isOpen: false,
            };
        }
        default:
            return state;
    }
}