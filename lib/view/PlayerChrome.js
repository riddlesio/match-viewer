import React               from 'react';
import Dropdown            from './dropdown/Dropdown';
import PlaySpeedRange      from './PlaySpeedRange';
import FastBackwardButton  from './button/FastBackwardButton';
import BackwardButton      from './button/BackwardButton';
import PlayPauseToggle     from './button/PlayPauseToggle';
import ForwardButton       from './button/ForwardButton';
import FastForwardButton   from './button/FastForwardButton';
import FullScreenToggle    from './button/FullScreenToggle';
import Either              from './logic/Either';
import Nothing             from './logic/Nothing';

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
};

function PlayerChrome(props) {

    const { currentState, descriptors, fullScreen, isPlaying, playbackTimeout } = props;

    return (
        <div className="GamePlayer-chrome u-row">
            { /* viewStack && renderViewToggle() */ }
            <FastBackwardButton />
            <BackwardButton />
            <PlayPauseToggle isPlaying={ isPlaying } />
            <ForwardButton />
            <FastForwardButton />
            <div className="u-grow u-relative">
                <Either
                    Left={ Nothing }
                    Right={ Dropdown }
                    condition={ /*!!descriptors */ false }
                    childProps={{ descriptors, selectedIndex: currentState }} />
            </div>
            <PlaySpeedRange settings={ playbackTimeout } />
            <FullScreenToggle fullScreen={ fullScreen } />
        </div>
    );
}

// function renderViewToggle() {
//     return (
//         <div className="GamePlayer-viewToggle u-row u-hidden">
//             <label className="GamePlayer-label">
//                 <input type="radio" className="GamePlayer-viewOption" name="view" value="1" checked>
//                 </input>
//                 <span>1</span>
//             </label>
//             <label className="GamePlayer-label">
//                 <input type="radio" className="GamePlayer-viewOption" name="view" value="2" />
//                 <span>2</span>
//             </label>
//             <label className="GamePlayer-label">
//                 <input type="radio" className="GamePlayer-viewOption" name="view" value="3" />
//                 <span>3</span>
//             </label>
//         </div>
//     );
// }

PlayerChrome.propTypes = propTypes;

export default PlayerChrome;
