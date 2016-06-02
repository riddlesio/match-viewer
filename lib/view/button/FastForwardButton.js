import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the FastForward button
 * @returns {React.Element}
 */
function FastForwardButton() {

    return (
        <Button onClick={ handleClick } title="Round forward (shift+right)">
            <i className="fa fa-fast-forward"></i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.FAST_FORWARD event
 */
function handleClick () {

    PlaybackEvent.trigger(PlaybackEvent.FAST_FORWARD);
}

export default FastForwardButton;
