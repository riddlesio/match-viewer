import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Pause button
 * @returns {React.Element}
 */
function PauseButton() {

    return (
        <Button className="GamePlayer-button--pause" onClick={ handleClick } title="Pause playback (space)">
            <i className="material-icons">pause</i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.PAUSE event
 */
function handleClick() {

    PlaybackEvent.trigger(PlaybackEvent.PAUSE);
}

export default PauseButton;
