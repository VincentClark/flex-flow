import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from '../../states/CustomChatState';
import CustomChatComponent from './CustomChatComponent';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    //Maps the actions to the props 
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomChatComponent);