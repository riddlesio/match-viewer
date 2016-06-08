import component    from 'omniscient';
import React        from 'react';
import createEither from '../logic/createEither';
import PlayButton   from './PlayButton';
import PauseButton  from './PauseButton';

const propTypes = {
    isPlaying: React.PropTypes.bool,
};

/**
 * Renders the Play/Pause toggle
 * @param {Object} props
 * @returns {React.Element}
 */
const PlayPauseToggle = createEither({
    Left: PauseButton,
    Right: PlayButton,
    isRight: props => !props.isPlaying,
});

PlayPauseToggle.propTypes = propTypes;

export default component('PlayPauseToggle', PlayPauseToggle);
