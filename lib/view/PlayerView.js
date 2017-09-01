import React        from 'react';
import createMaybe  from './logic/createMaybe';
import PlayerChrome from './PlayerChrome';

const MaybeChrome = createMaybe({ Component: PlayerChrome, predicate: props => props.chrome });

function Modal({ children, title }) {
    return (
        <div className="Modal">
            <div className="Modal-content">{ children }</div>
        </div>
    );
}

function Share() {
    return (
        <Modal>
            <div className="Modal-title">Embed</div>
            <div className="Embed-code">
                { '<iframe width="500" height="350" src="https://www.riddles.io/embed/match/cd1d226c-9576-4e2e-8cad-d3d838838cab" allowfullscreen=""></iframe>' }
            </div>
        </Modal>
    );
}

function Settings({ playbackSpeed }) {
    return (
        <Modal>
            <div className="Modal-title">Speed</div>
            <PlaySpeedRange value={ playbackSpeed } />
        </Modal>
    );
}

const shouldShowModal = ({ show }) => !!show;

const MaybeSettings = createMaybe({
    Component: Settings,
    predicate: shouldShowModal,
});

const MaybeShare = createMaybe({
    Component: Share,
    predicate: shouldShowModal,
});

const noop = _ => null;

/**
 * Renders the Player
 * @param state
 * @returns {React.Element}
 */
function PlayerView({ state }) {

    const
        chrome = true,
        currentStep = 125,
        fullScreen = false,
        isPlaying = false,
        isSettingsVisible = false,
        isShareVisible = false,
        onToggleSettings = noop,
        onToggleShare = noop,
        playbackSpeed = 0.5,
        totalSteps = 250
    ;

    return (
        <div className="GamePlayer">
            <MaybeChrome
                chrome={ chrome }
                currentStep={ currentStep }
                fullScreen={ fullScreen }
                isPlaying={ isPlaying }
                isSettingsVisible={isSettingsVisible}
                isShareVisible={isShareVisible}
                onToggleSettings={onToggleSettings}
                onToggleShare={onToggleShare}
                totalSteps={totalSteps}
            />
            <MaybeSettings show={ isSettingsVisible } playbackSpeed={ playbackSpeed } />
            <MaybeShare show={ isShareVisible } />
            <div className="GamePlayer-view"></div>
        </div>
    );
}

export default PlayerView;
