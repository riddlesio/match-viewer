import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Backward button
 * @returns {React.Element}
 */
function BackwardButton() {

    return (
        <Button onClick={ handleClick } title="Step backward (left)">
            <i className="fa fa-backward"></i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.BACKWARD event
 */
function handleClick() {

    PlaybackEvent.trigger(PlaybackEvent.BACKWARD);
}

export default BackwardButton;
