import React, { Component } from "react";
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS


class CounterPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };  

    }

    componentDidMount() {

    }

    
    
    render() {
        const { counter_profile } = this.props;  

        
        return (
            <div className="total-container">
                <div className="counter-container">
                        <div className="team-info">
                            <div className="team-name font-notosan">
                                {counter_profile.team_name}
                            </div>
                            <div className="age-range font-notosan">
                                {counter_profile.age_range}
                            </div>
                            <div className="company font-notosan">
                                {counter_profile.company.name}
                            </div>
                        </div>
                        <div className="team-intro font-notosan">
                            <p>{counter_profile.team_introduce}</p>
                        </div>

                        <div className="margin-wrap" />
                </div>
                <div className="images-wrapper">
                            <div className="images">
                                <div className="each-image flex-center" >
                                    <div className="App">
                                        <img src={counter_profile.image || require("./../../images/noPhoto.jpg")} />
                                    </div>
                                </div>

                                <div className="each-image flex-center" >
                                    <div className="App">
                                        <img src={counter_profile.image_two || require("./../../images/noPhoto.jpg")} />
                                    </div>
                                </div>


                                <div className="each-image flex-center" >
                                    <div className="App">
                                        <img src={counter_profile.image_three || require("./../../images/noPhoto.jpg")} />
                                    </div>
                                </div>

                                <div className="last-child-gap"/>
                            </div>
                </div>
            </div>
        )
    };
};


export default CounterPlayer;