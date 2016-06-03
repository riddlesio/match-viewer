import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Play button
 * @returns {React.Element}
 */
function PlayButton() {

    return (
        <Button onClick={ handleClick } title="Start player (space)">
            <i className="fa fa-play"></i>
        </Button>
    );
}

/**
 * Triggers the PlaybackEvent.PLAY event
 */
function handleClick() {

    PlaybackEvent.trigger(PlaybackEvent.PLAY);
}

export default PlayButton;
