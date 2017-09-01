import React               from 'react';
import classNames from 'classnames';
import Dropdown            from './dropdown/Dropdown';
import PlaySpeedRange      from './PlaySpeedRange';
import BackwardButton      from './button/BackwardButton';
import PlayPauseToggle     from './button/PlayPauseToggle';
import ForwardButton       from './button/ForwardButton';
import FullScreenToggle    from './button/FullScreenToggle';
import createMaybe         from './logic/createMaybe';
import Button               from './button/Button';

const MaybeDropdown = createMaybe({ Component: Dropdown, predicate: () => false });

function SettingsToggle({ onToggle, toggled }) {
    return (
        <Toggle className="GamePlayer-button--settings" onToggle={ onToggle } toggled={ toggled } title="Settings">
            <i className="material-icons">settings</i>
        </Toggle>
    );
}

function ShareToggle({ onToggle, toggled }) {
    return (
        <Toggle className="GamePlayer-button--share" onToggle={ onToggle } toggled={ toggled } title="Share">
            <i className="material-icons">share</i>
        </Toggle>
    );
}

function Toggle({ className, onToggle, title, toggled, children }) {
    return (
        <Button
            className={ classNames(className, { 'is-toggled': toggled }) }
            onClick={ onToggle }
            title={ title }>
            {children}
        </Button>
    );
}

const withElementSize = Component => {

    return class WithElementSize extends React.Component {

        constructor(props, context) {
            super(props, context);

            this.state = {
                width: 0,
                height: 0
            };
        }

        componentDidMount() {
            this.setState({
                width: this.element.clientWidth,
                height: this.element.clientHeight,
            });
        }

        render() {
            const componentProps = {
                ...this.props,
                ...this.state,
            };

            return (
                <div ref={ el => this.element = el }>
                    <Component { ...componentProps } />
                </div>
            );
        }
    }
}

const PlaybackBar = withElementSize(function ({ value, width }) {
    return (
        <div className="GamePlayer-playbackBar PlaybackBar">
            <div className="PlaybackBar-track"/>
            <div className="PlaybackBar-played" style={{ transform: `scale(${ value }, 1)` }}/>
            <div className="PlaybackBar-head" style={{ transform: `translateX(${ value * width - 1.5 }px)` }}/>
        </div>
    );
});

function PlayerChrome(props) {
    const {
        currentStep,
        fullScreen,
        isPlaying,
        isSettingsVisible,
        isShareVisible,
        onToggleSettings,
        onToggleShare,
        totalSteps,
    } = props;

    return (
        <div className="GamePlayer-chrome u-column">
            <PlaybackBar value={ currentStep / totalSteps } />
            <div className="GamePlayer-controls u-row">
                <PlayPauseToggle isPlaying={ isPlaying } />
                <BackwardButton />
                <div className="Steps">
                    <span className="Steps-currentStep">{ currentStep }</span>
                    <span className="Steps-separator">/</span>
                    <span className="Steps-totalSteps">{ totalSteps }</span>
                </div>
                <ForwardButton />
                <div className="u-grow u-relative"></div>
                <ShareToggle onToggle={ onToggleShare } toggled={ isShareVisible } />
                <SettingsToggle onToggle={ onToggleSettings } toggled={ isSettingsVisible } />
                <FullScreenToggle fullScreen={ fullScreen } />
            </div>
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

export default PlayerChrome;
