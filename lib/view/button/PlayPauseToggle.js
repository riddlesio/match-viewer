import component   from 'omniscient';
import React       from 'react';
import Either      from '../logic/Either';
import PlayButton  from './PlayButton';
import PauseButton from './PauseButton';

const propTypes = {
    isPlaying: React.PropTypes.bool.isRequired,
};

/**
 * Renders the Play/Pause toggle
 * @param {Object} props
 * @returns {React.Element}
 */
function PlayPauseToggle(props) {

    return <Either
        Left={ PlayButton }
        Right={ PauseButton }
        condition={ props.isPlaying } />;
}

PlayPauseToggle.propTypes = propTypes;

export default component('PlayPauseToggle', PlayPauseToggle);
