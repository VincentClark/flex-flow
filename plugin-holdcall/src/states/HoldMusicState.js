const HOLD_MUSIC_SELECTED = "HOLD_MUSIC"

const initialState = {
    currentHoldMusicUrl: null,
    customerHoldMusic: null,
    customerAdHoldMusic: null,
    currentHoldMusicName: null,
    currentAd: "UpSell",
    currentHoldValid: false,
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
    static changeAd = (ad) => {
        console.log("hold-music-ad", ad);
        return {
            type: "SET_AD",
            value: ad
        }
    }
    static setCustomerHoldMusic = (customerHoldMusic, currentAd, createHoldMusic) => {
        console.log("hold-music-customer", customerHoldMusic);
        console.log("hold-music-state", currentAd);

        return {
            type: "SET_AD_URL",
            value: customerHoldMusic,
            currentAd: currentAd,
            createHoldMusic: createHoldMusic
        }
    }
}
export function reduce(state = initialState, action) {
    // eslint-disable-next-line sonarjs/no-small-switch
    // This needs to be centralized
    const holdMusicBase = "https://phone-4798.twil.io/";
    const createFriendlyName = (holdMusic) => {
        let holdMusicName = holdMusic.split("."[0]);
        //replace underscores with spaces
        holdMusicName = holdMusicName.replace(/_/g, " ");
        holdMusicUrl = `${holdMusicBase}${holdMusic}`;
        return [holdMusicName, holdMusicUrl];
    }

    const createUpSellMusic = (holdMusicInput, ad) => {
        let holdMusic = holdMusicInput.split(".")[0];
        console.log("hold-music-input", holdMusicInput, holdMusic, ad);
        holdMusic = `${holdMusicBase}PHONE_ADS_${holdMusic}_${ad}.wav`;
        return holdMusic;
    }



    switch (action.type) {
        case "HOLD_MUSIC_SELECTED": {
            console.log("music", action.value);
            const holdMusic = action.value;
            const holdMusicName = createFriendlyName(holdMusic)[0];
            const holdMusicUrl = createFriendlyName(holdMusic)[1];
            return {
                ...state,
                currentHoldMusicName: holdMusicName,
                currentHoldMusicName: holdMusicUrl,
            };
        }
        case "SET_CUSTOMER_HOLD_MUSIC": {
            const holdMusic = action.value;
            return {
                ...state,
                customerHoldMusic: holdMusic,
            }
        }
        case "SET_AD_URL": {
            const holdMusicCustomer = createUpSellMusic(action.value, action.currentAd);
            console.log("hold-music-new", holdMusicCustomer);
            action.createHoldMusic(holdMusicCustomer);
            return {
                ...state,
                customerAdHoldMusic: holdMusicCustomer,
                currentHoldMusicName: `${action.value}`,


            }
        }
        case "SET_AD": {
            return {
                ...state,
                currentAd: action.value,
            }
        }
        default:
            return state;
    }
}