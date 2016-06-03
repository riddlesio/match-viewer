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
import { prototype as emitter } from 'eventemitter3';

/**
 * Creates an EventClass
 * @param {Array} eventNames,
 * @param {function} trigger
 * @returns {Function}
 * @see createKey
 */
function createEvent(eventNames, trigger = defaultTrigger) {

    const props = eventNames.reduce((acc, eventName) => ({
        ...acc,
        [createKey(eventName)]: eventName,
    }), {});

    return {
        trigger,

        // register EventClass.off as synonym for EventClass.removeListener
        off: emitter.removeListener,

        ...emitter,
        ...props,
    };
};

/**
 * Transforms a camelCase event name into all caps separated by underscores
 * @param {String} eventName
 * @returns {String}
 */
function createKey(eventName) {
    var parts = eventName.split('-');

    return parts.slice(1).join('_').toUpperCase();
}

function defaultTrigger(...args) {

    this.emit.apply(this, args);
}

export default createEvent;
