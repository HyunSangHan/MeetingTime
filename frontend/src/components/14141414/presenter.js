import React from "react";
//import "./styles.scss";
import PropTypes from "prop-types";


const Player = props => {
    console.log(props.joined_player.get('is_matched'));
    console.log(JSON.stringify(props.joined_player));
    return (
        <div>
        </div>

    );
};


Player.propTypes = {
    joined_player: PropTypes.shape({
        is_matched: PropTypes.bool.isRequired,
        meeting: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        profile: PropTypes.shape({
            age_range: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            is_male: PropTypes.bool.isRequired,
            company : PropTypes.shape({
                name: PropTypes.string.isRequired
            }).isRequired,
        }).isRequired,
    }).isRequired,
};


export default Player;