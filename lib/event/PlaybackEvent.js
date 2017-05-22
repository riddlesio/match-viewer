/**
 * This file is part of the Riddles.io MatchViewer base library
 *
 * (c) Riddles.io B.V. <developers@riddles.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @author Niko van Meurs <niko@riddles.io>
 */
import createEvent from '../util/createEvent';

/**
 * Used to manage playback
 */
const PlaybackEvent = createEvent(
    [
        'playback-enter-full-screen',
        'playback-exit-full-screen',
        'playback-full-screen-changed',
        'playback-play',
        'playback-playing',
        'playback-pause',
        'playback-paused',
        'playback-step-forward',
        'playback-forward',
        'playback-fast-forward',
        'playback-step-backward',
        'playback-backward',
        'playback-fast-backward',
        'playback-change-speed',
        'playback-goto',
    ],

    // @ifdef DEBUG
    function trigger(...args) {
        console.log('PlaybackEvent', args);
        this.emit.apply(this, args);
    },

    // @endif
);

export default PlaybackEvent;
