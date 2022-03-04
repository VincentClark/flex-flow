import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/CustomChatState';
import CustomChatComponent from './CustomChatComponent';

const mapStateToProps = (state) => ({
  isOpen: state['customchat'].customTaskList.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  // dismissBar: bindActionCreators(Actions.dismissBar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomChatComponent);
