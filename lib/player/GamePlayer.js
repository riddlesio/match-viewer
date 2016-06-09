import { merge }           from 'lodash';
import Mousetrap           from 'mousetrap';
import React               from 'react';
import ReactDOM            from 'react-dom';
import PlaybackEvent       from '../event/PlaybackEvent';
import AbstractUIComponent from '../ui/AbstractUIComponent';
import MoveSelector        from '../ui/MoveSelector';
import DOM                 from '../util/DOM';
import defaults            from '../config/defaultPlayerSettings';
import createClass         from '../util/createClass';
import PlayerView          from '../view/PlayerView';

var GamePlayer,
    moveSelector,
    hidden,
    visibilityChange;

// class GamePlayer {
//
//     constructor(options) {
//
//         var state = _.merge(defaults, options);
//
//         state.playbackTimeout.timeStep =
//             (state.playbackTimeout.max + state.playbackTimeout.min) / 2;
//         state.playbackTimeout.timeDelta =
//             (state.playbackTimeout.max - state.playbackTimeout.min) / 10;
//
//         this.state = state;
//
//         setBrowserVisibilityChange();
//
//         bindListeners(this);
//
//         this.render(state);
//     }
// }

GamePlayer = createClass(AbstractUIComponent, {

    /**
     * Class constructor, accepts options
     * @param  {Object} options
     */
    construct: function (options) {

        var state = merge({}, defaults, options);

        state.playbackTimeout.timeStep =
            (state.playbackTimeout.max + state.playbackTimeout.min) / 2;
        state.playbackTimeout.timeDelta =
            (state.playbackTimeout.max - state.playbackTimeout.min) / 10;

        this.setState(state)
            .render(state);

        setBrowserVisibilityChange();

        bindListeners(this);
    },

    /**
     * Unbinds all listeners
     */
    destroy: function () {
        unbindListeners(this);
    },

    enterFullscreen: function () {

        var domNode = this.findDOMNode();

        if (domNode.requestFullscreen) {
            domNode.requestFullscreen();
        } else if (domNode.msRequestFullscreen) {
            domNode.msRequestFullscreen();
        } else if (domNode.mozRequestFullScreen) {
            domNode.mozRequestFullScreen();
        } else if (domNode.webkitRequestFullscreen) {
            domNode.webkitRequestFullscreen();
        }

        this.setState({ fullScreen: true });
    },

    exitFullscreen: function () {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }

        this.setState({ fullScreen: false });
    },

    triggerFullscreenChange: function () {

        if (this.getState().fullScreen
            && !(document.fullscreenElement
                || document.webkitFullscreenElement
                || document.mozFullScreenElement
                || document.msFullscreenElement)) {
            this.exitFullscreen();
        }
    },

    play: function () {

        this.setPlaybackTimer(handleTimer);

        this.setState({ isPlaying: true });
    },

    pause: function () {

        this.timer && window.clearInterval(this.timer);
        this.timer = null;

        this.setState({ isPlaying: false });
    },

    setCurrentState: function ({ state }) {

        this.setState({ currentState: state });
    },

    changePlaybackSpeed: function (value) {

        this.setState({ playbackTimeout: { timeStep: value } });
    },

    triggerSpeedFaster: function () {

        var { max, timeStep, timeDelta } = this.getState().playbackTimeout;

        PlaybackEvent.trigger(PlaybackEvent.CHANGE_SPEED, Math.min(max, timeStep + timeDelta));
    },

    triggerSpeedSlower: function () {

        var { min, timeStep, timeDelta } = this.getState().playbackTimeout;

        PlaybackEvent.trigger(PlaybackEvent.CHANGE_SPEED, Math.max(min, timeStep - timeDelta));
    },

    triggerSpeedReset: function () {

        var { min, max } = this.getState().playbackTimeout;

        PlaybackEvent.trigger(PlaybackEvent.CHANGE_SPEED, (min + max) / 2);
    },

    render: function () {

        var state = this.getState();

        ReactDOM.render(PlayerView({ state }), document.getElementById('player'));
    },

    setStateDescriptors: function (descriptors) {

        this.setState({ descriptors });
    },

    togglePlayback: function () {

        var event = this.getState().isPlaying ? PlaybackEvent.PAUSE : PlaybackEvent.PLAY;

        PlaybackEvent.trigger(event);
    },

    /**
     * Sets the timer with a timeStep that is variable
     */
    setPlaybackTimer: function (callback) {

        const internalCallback = (function () {
            return () => {

                const { min, max, timeStep } = this.getState().playbackTimeout;
                const timeout = (min + max) - timeStep;

                this.timer = window.setTimeout(internalCallback, timeout);
                callback();
            };
        }.call(this));

        this.timer = window.setTimeout(internalCallback, this.getState().playbackTimeout.timeStep);
    },
});

function bindListeners(player) {

    PlaybackEvent.on(PlaybackEvent.GOTO, player.setCurrentState, player);
    PlaybackEvent.on(PlaybackEvent.PAUSED, player.pause, player);
    PlaybackEvent.on(PlaybackEvent.PLAYING, player.play, player);
    PlaybackEvent.on(PlaybackEvent.ENTER_FULL_SCREEN, player.enterFullscreen, player);
    PlaybackEvent.on(PlaybackEvent.EXIT_FULL_SCREEN, player.exitFullscreen, player);
    PlaybackEvent.on(PlaybackEvent.FULL_SCREEN_CHANGED, player.triggerFullscreenChange, player);
    PlaybackEvent.on(PlaybackEvent.CHANGE_SPEED, player.changePlaybackSpeed, player);

    Mousetrap.bind('space', player.togglePlayback.bind(player));
    Mousetrap.bind('right', triggerForward);
    Mousetrap.bind('shift+right', triggerFastForward);
    Mousetrap.bind('left', triggerBackward);
    Mousetrap.bind('shift+left', triggerFastBackward);
    Mousetrap.bind('+', player.triggerSpeedFaster.bind(player));
    Mousetrap.bind('-', player.triggerSpeedSlower.bind(player));
    Mousetrap.bind('=', player.triggerSpeedReset.bind(player));

    document.addEventListener('fullscreenchange', triggerFullscreenChange);
    document.addEventListener('webkitfullscreenchange', triggerFullscreenChange);
    document.addEventListener('mozfullscreenchange', triggerFullscreenChange);
    document.addEventListener('MSFullscreenChange', triggerFullscreenChange);
    document.addEventListener('keydown', triggerKeyDown);
    document.addEventListener(visibilityChange, triggerLoseVisibility);
}

function unbindListeners(player) {

    PlaybackEvent.off(PlaybackEvent.GOTO, player.setCurrentState, player);
    PlaybackEvent.off(PlaybackEvent.PAUSED, player.pause, player);
    PlaybackEvent.off(PlaybackEvent.PLAYING, player.play, player);
    PlaybackEvent.off(PlaybackEvent.ENTER_FULL_SCREEN, player.enterFullscreen, player);
    PlaybackEvent.off(PlaybackEvent.EXIT_FULL_SCREEN, player.exitFullscreen, player);
    PlaybackEvent.off(PlaybackEvent.FULL_SCREEN_CHANGED, player.triggerFullscreenChange, player);
    PlaybackEvent.off(PlaybackEvent.CHANGE_SPEED, player.changePlaybackSpeed, player);

    Mousetrap.unbind('space');
    Mousetrap.unbind('shift+left');
    Mousetrap.unbind('left');
    Mousetrap.unbind('right');
    Mousetrap.unbind('shift+right');
    Mousetrap.unbind('+');
    Mousetrap.unbind('-');
    Mousetrap.unbind('=');

    document.removeEventListener('fullscreenchange', triggerFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', triggerFullscreenChange);
    document.removeEventListener('mozfullscreenchange', triggerFullscreenChange);
    document.removeEventListener('MSFullscreenChange', triggerFullscreenChange);
    document.removeEventListener('keydown', triggerKeyDown);
    document.removeEventListener(visibilityChange, triggerLoseVisibility);
}

/**
 * triggerKeyDown is the event triggerr for keyboard input
 */
function triggerKeyDown(event) {

    switch (event.which) {

    case 32:
    case 37:
    case 38:
    case 39:
    case 40:
        event.preventDefault();
        event.stopPropagation();

        return false;
    }

    return true;
}

function triggerFullscreenChange() {

    PlaybackEvent.trigger(PlaybackEvent.FULL_SCREEN_CHANGED);
}

function triggerFullscreen() {

    PlaybackEvent.trigger(PlaybackEvent.ENTER_FULL_SCREEN);
}

function triggerNormalscreen() {

    PlaybackEvent.trigger(PlaybackEvent.EXIT_FULL_SCREEN);
}

function triggerLoseVisibility() {
    if (document[hidden]) {
        PlaybackEvent.trigger(PlaybackEvent.PAUSE);
    }
}

function triggerPause() {

    PlaybackEvent.trigger(PlaybackEvent.PAUSE);
}

function triggerPlay() {

    PlaybackEvent.trigger(PlaybackEvent.PLAY);
}

function triggerForward() {

    PlaybackEvent.trigger(PlaybackEvent.FORWARD);
}

function triggerFastForward() {

    PlaybackEvent.trigger(PlaybackEvent.FAST_FORWARD);
}

function triggerBackward() {

    PlaybackEvent.trigger(PlaybackEvent.BACKWARD);
}

function triggerFastBackward() {

    PlaybackEvent.trigger(PlaybackEvent.FAST_BACKWARD);
}

function triggerMoveSelected(event) {

    var value = event.target.value;

    PlaybackEvent.trigger(PlaybackEvent.GOTO, value);
}

function triggerSpeedChange(event) {

    var value = event.target.value;

    PlaybackEvent.trigger(PlaybackEvent.CHANGE_SPEED, value);
}

function handleTimer() {

    PlaybackEvent.trigger(PlaybackEvent.FORWARD);
}

function validateOptions(options) {

    return Promise.resolve(options);
}

function setBrowserVisibilityChange() {
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        visibilityChange = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }
}

export default GamePlayer;
