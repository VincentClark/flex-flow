const initialState = {
    isOpen: true
}

export class Actions {
    static simpleAction = () => ({ type: "SIMPLE_ACTION" });
}

export function reduce(state = initialState, action) {
    switch (action.type) {
        case "SIMPLE_ACTION":
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state;
    }
}