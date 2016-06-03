import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Forward button
 * @returns {React.Element}
 */
function ForwardButton() {

    return (
        <Button onClick={ handleClick } title="Step forward (right)">
            <i className="fa fa-forward"></i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.FORWARD event
 */
function handleClick () {

    PlaybackEvent.trigger(PlaybackEvent.FORWARD);
}

export default ForwardButton;
