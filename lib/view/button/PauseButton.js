import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Pause button
 * @returns {React.Element}
 */
function PauseButton() {

    return (
        <Button onClick={ handleClick } title="Pause player (space)">
            <i className="fa fa-pause"></i>
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
