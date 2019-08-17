import React, { Component } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../modules/join';
import * as currentMatchingActions from "../../modules/current_matching";
import MaterialIcon from 'material-icons-react';

class GiftPopup extends Component {

    /* eslint-disable-next-line */
    constructor(props) {
        super(props);
    };

    render() {
        const {  PlayerActions, handleGift, counter_profile, current_matching } = this.props;
        console.log(counter_profile);
        

        return (
            <div className={"App flex-center"}>
            {counter_profile.is_male ?
                <div className="box">
                {current_matching.is_gift_female ?
                    <div className={"copy-pop flex-center font-1"}>
                        <h3>이미 안주를 쏘셨습니다.</h3>
                        <button onClick={PlayerActions.deletePopup}>확인</button>
                    </div>
                :
                    <div className={"copy-pop flex-center font-1"}>
                        안주쏘기입니다. 이후 되돌릴 수 없습니다.
                        <button onClick={handleGift}>확인</button>
                        <button onClick={PlayerActions.deletePopup}>취소</button>
                    </div>
                }
                </div>
            :
                <div className="box">
                {current_matching.is_gift_male ?
                    <div className={"copy-pop flex-center font-1"}>
                        <h3>이미 안주를 쏘셨습니다.</h3>
                        <button onClick={PlayerActions.deletePopup}>확인</button>
                    </div>
                    :
                    <div className={"copy-pop flex-center font-1"}>
                        안주쏘기입니다. 이후 되돌릴 수 없습니다.
                        <button onClick={handleGift}>확인</button>
                        <button onClick={PlayerActions.deletePopup}>취소</button>
                    </div>
                }
                </div>
            }
            </div>
            
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    PlayerActions: bindActionCreators(playerActions, dispatch),
    CurrentMatchingActions: bindActionCreators(currentMatchingActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_counter_profile: state.player.get('is_counter_profile'),
    is_gift_popup: state.player.get('is_gift_popup'),
    is_gift_already: state.player.get('is_gift_already'),
    current_matching: state.current_matching.get('current_matching'),
    counter_profile: state.player.get('counter_profile'),

    
})

export default connect(mapStateToProps, mapDispatchToProps)(GiftPopup);