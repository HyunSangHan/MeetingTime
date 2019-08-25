import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import myProfileActions from '../../modules/my_profile';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';

class TeamPopup extends Component {

    /* eslint-disable-next-line */
    constructor(props) {
        super(props);
    };

    render() {
        const {  MyProfileActions, is_edited_profile } = this.props;
        console.log(this.props);

        return (
            <div className={"App flex-center"}>
                <div className="box">
                    <div className={"copy-pop flex-center font-1"}>
                        <h3>미팅그룹이 생성되었습니다.</h3>

                        <button onClick={MyProfileActions.deletePopup}>확인</button>
                        
                    </div>
                </div>
    
                {/* <div className="box">
                    <div className={"copy-pop flex-center font-1"}>
                        <h3>사진이 모두 업로드 되어야 팀을 생성하실 수 있습니다.</h3>
                        <button onClick={MyProfileActions.deletePopup}>확인</button>
                    </div>
                </div> */}
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch,
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_edited_profile: state.my_profile.get('is_edited_profile'),
    my_profile: state.my_profile.get('my_profile'),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPopup);