import React        from 'react';
import Either       from './logic/Either';
import Nothing      from './logic/Nothing';
import PlayerChrome from './PlayerChrome';

const propTypes = {
    state: React.PropTypes.shape.isRequired({
        chrome: React.PropTypes.bool,
    }),
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
