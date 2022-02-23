import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/HoldMusicState';
import HoldMusicSelection from './HoldMusicSelection';

const mapStateToProps = (state) => ({
    // isOpen: state['holdcall'].HoldMusicSelection.isOpen,
    // currentHoldMusicUrl: state['holdcall'].HoldMusicSelection.currentHoldMusicUrl,
    // currentHoldMusicName: state['holdcall'].HoldMusicSelection.currentHoldMusicName,
});

const mapDispatchToProps = (dispatch) => ({
    //this needs to be fixed.
    dismissBar: bindActionCreators(Actions.dismissBar, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(HoldMusicSelection);
