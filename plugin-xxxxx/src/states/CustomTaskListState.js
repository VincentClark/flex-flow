const ACTION_DISMISS_BAR = 'DISMISS_BAR';

const initialState = {
  isOpen: true,
};

export class Actions {
  static dismissBar = () => ({ type: ACTION_DISMISS_BAR });

}

export function reduce(state = initialState, action) {
  // eslint-disable-next-line sonarjs/no-small-switch
  console.log("REDUX", action.value);
  switch (action.type) {
    case ACTION_DISMISS_BAR: {
      return ({
        ...state,
        isOpen: false,
      });
    }

    default:
      return state;
  }
}
