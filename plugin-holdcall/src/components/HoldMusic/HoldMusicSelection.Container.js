import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/HoldMusicState';
import holdMusicSelection from './HoldMusicSelection';

const mapStateToProps = (state) => ({
    isOpen: state['holdcall'].holdMusicState.isOpen,
    currentHoldMusicUrl: state['holdcall'].holdMusicState.currentHoldMusicUrl,
    currentHoldMusicName: state['holdcall'].holdMusicState.currentHoldMusicName,
});

const mapDispatchToProps = (dispatch) => ({
    //this needs to be fixed.
    changeHoldMusic: bindActionCreators(Actions.changeHoldMusic, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(holdMusicSelection);
