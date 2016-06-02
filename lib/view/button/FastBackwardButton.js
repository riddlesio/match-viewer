
import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the FastBackward button
 * @returns {React.Element}
 */
function FastBackwardButton() {

    return (
        <Button onClick={ handleClick } title="Round backward (shift+left)">
            <i className="fa fa-fast-backward"></i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.FAST_BACKWARD event
 */
function handleClick() {

    PlaybackEvent.trigger(PlaybackEvent.FAST_BACKWARD);
}

export default FastBackwardButton;
