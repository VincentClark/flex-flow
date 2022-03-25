import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/CustomInsightState';
import CustomInsight from './CustomInsight';

const mapStateToProps = (state) => ({
    isOpen: state['custom_insights'].customTaskList.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
    dismissBar: bindActionCreators(Actions.dismissBar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomInsight);
