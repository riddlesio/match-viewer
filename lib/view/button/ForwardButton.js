import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Forward button
 * @returns {React.Element}
 */
function ForwardButton() {

    return (
        <Button onClick={ handleClick } title="Round forward (right)">
            <i className="fa fa-fast-forward"></i>
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
