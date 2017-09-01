import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the NormalScreen button
 * @returns {React.Element}
 */
function NormalScreenButton() {

    return (
        <Button className="GamePlayer-button--normalscreen" onClick={ handleClick }>
            <i className="material-icons">fullscreen_exit</i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.PLAY event
 */
function handleClick() {

    PlaybackEvent.trigger(PlaybackEvent.EXIT_FULL_SCREEN);
}

export default NormalScreenButton;
