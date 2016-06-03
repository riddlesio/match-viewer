import component     from 'omniscient';
import React         from 'react';
import PlaybackEvent from '../event/PlaybackEvent';

const propTypes = {
    settings: React.PropTypes.shape({
        max: React.PropTypes.number.isRequired,
        min: React.PropTypes.number.isRequired,
        timeStep: React.PropTypes.number.isRequired,
    }).isRequired,
};

/**
 * Renders the PlaybackSpeed slider
 * @param   {Object}        props See propTypes
 * @returns {React.Element}
 * @constructor
 */
function PlaySpeedRange(props) {

    const { min, max, timeStep } = props.settings;

    return (
        <input type="range"
            className="GamePlayer-range"
            min={ min }
            max={ max }
            value={ timeStep }
            onChange={ handleChange } />
    );
}

/**
 * Triggers the CHANGE_SPEED PlaybackEvent
 * @param {Event} event The change event dispatched by the range input
 */
function handleChange(event) {

    const value = parseInt(event.target.value, 10);
    PlaybackEvent.trigger(PlaybackEvent.CHANGE_SPEED, value);
}

PlaySpeedRange.propTypes = propTypes;

export default component('PlaySpeedRange', PlaySpeedRange);