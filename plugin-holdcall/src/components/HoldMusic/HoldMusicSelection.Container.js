import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/HoldMusicState';
import holdMusicSelection from './HoldMusicSelection';

const mapStateToProps = (state) => ({
    isOpen: state['holdcall'].holdMusicState.isOpen,
    currentHoldMusicUrl: state['holdcall'].holdMusicState.currentHoldMusicUrl,
    currentHoldMusicName: state['holdcall'].holdMusicState.currentHoldMusicName,
    currentAd: state['holdcall'].holdMusicState.currentAd,
    currentHoldValid: state['holdcall'].holdMusicState.currentHoldValid,
    customerAdHoldMusic: state['holdcall'].holdMusicState.customerAdHoldMusic,
    customerHoldMusic: state['holdcall'].holdMusicState.customerHoldMusic,
});

const mapDispatchToProps = (dispatch) => ({
    //this needs to be fixed.
    changeHoldMusic: bindActionCreators(Actions.changeHoldMusic, dispatch),
    changeAd: bindActionCreators(Actions.changeAd, dispatch),
    setCustomerHoldMusic: bindActionCreators(Actions.setCustomerHoldMusic, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(holdMusicSelection);
