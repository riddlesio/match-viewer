import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Forward button
 * @returns {React.Element}
 */
function ForwardButton() {

    return (
        <Button className="GamePlayer-button--forward" onClick={ handleClick } title="Step forward (right)">
            <i className="material-icons">keyboard_arrow_right</i>
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
