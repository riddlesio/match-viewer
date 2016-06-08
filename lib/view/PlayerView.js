import React        from 'react';
import createMaybe  from './logic/createMaybe';
import PlayerChrome from './PlayerChrome';

const propTypes = {
    chrome: React.PropTypes.bool,
    currentState: React.PropTypes.number.isRequired,
    descriptors: React.PropTypes.array,
    fullScreen: React.PropTypes.bool.isRequired,
    isPlaying: React.PropTypes.bool.isRequired,
    playbackTimeout: React.PropTypes.shape({
        max: React.PropTypes.number.isRequired,
        min: React.PropTypes.number.isRequired,
        timeStep: React.PropTypes.number.isRequired,
    }).isRequired,
};

const MaybeChrome = createMaybe({ Component: PlayerChrome, predicate: props => props.chrome });

/**
 * Renders the Player
 * @param state
 * @returns {React.Element}
 */
function PlayerView({ state }) {

    return (
        <div className="GamePlayer">
            <MaybeChrome { ...state } />
            <div className="GamePlayer-view"></div>
        </div>
    );
}

PlayerView.propTypes = propTypes;

export default PlayerView;
