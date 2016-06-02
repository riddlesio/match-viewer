import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the FullScreen button
 * @returns {React.Element}
 */
function FullScreenButton() {

    return (
        <Button onClick={ handleClick }>
            <i className="fa fa-compress"></i>
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
