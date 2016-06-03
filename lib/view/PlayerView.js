import React        from 'react';
import Either       from './logic/Either';
import Nothing      from './logic/Nothing';
import PlayerChrome from './PlayerChrome';

const propTypes = {
    currentState: React.PropTypes.number.isRequired,
    descriptors: React.PropTypes.array,
    fullScreen: React.PropTypes.bool.isRequired,
    isPlaying: React.PropTypes.bool.isRequired,
    playbackTimeout: React.PropTypes.shape({
        max: React.PropTypes.number.isRequired,
        min: React.PropTypes.number.isRequired,
        timeStep: React.PropTypes.number.isRequired,
    }).isRequired,
    state: React.PropTypes.shape({
        chrome: React.PropTypes.bool,
    }).isRequired,
};

/**
 * Renders the Player
 * @param state
 * @returns {React.Element}
 */
function PlayerView({ state }) {

    return (
        <div className="GamePlayer">
            <Either
                Left={ Nothing }
                Right={ PlayerChrome }
                condition={ state.chrome }
                childProps={ state } />
            <div className="GamePlayer-view"></div>
        </div>
    );
}

PlayerView.propTypes = propTypes;

export default PlayerView;
