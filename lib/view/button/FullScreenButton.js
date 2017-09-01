import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the FullScreen button
 * @returns {React.Element}
 */
function FullScreenButton() {

    return (
        <Button className="GamePlayer-button--fullscreen" onClick={ handleClick }>
            <i className="material-icons">fullscreen</i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.ENTER_FULL_SCREEN event
 */
function handleClick() {

    PlaybackEvent.trigger(PlaybackEvent.ENTER_FULL_SCREEN);
}

export default FullScreenButton;
