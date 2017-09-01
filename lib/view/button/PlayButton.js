import React         from 'react';
import PlaybackEvent from '../../event/PlaybackEvent';
import Button        from './Button';

/**
 * Renders the Play button
 * @returns {React.Element}
 */
function PlayButton() {

    return (
        <Button className="GamePlayer-button--play" onClick={ handleClick } title="Resume playback (space)">
            <i className="material-icons">play_arrow</i>
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
