import React, { Component } from "react";
import Player from "./presenter";
import * as joinActions from '../modules/join';


class Container extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { JoinActions } = this.props;
        CurrentMeetingActions.getCurrentMeeting();
        JoinActions.getJoinedUser();
    }


    render() {
        { joined_user } = this.props;
        return (
             <Player 
                {...this.props}
                {...this.state}
            />
        );
    };
}

export default Container;