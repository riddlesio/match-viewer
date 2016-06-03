/**
 * This file is part of the StarApple CRM package
 *
 * (c) StarApple B.V. <developers@starapple.nl>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @author Niko van Meurs <niko@starapple.nl>
 * @author Sid Mijnders <sid@starapple.nl>
 */
 import superFn from './super';

let shouldConstructSuper = false;

/**
 * Creates a class constructor
 * @param {Function} [SuperClass]
 * @param {Object} prototype
 *
 * @deprecated Will be removed in favor of ES6 Classes
 */
function createClass(...args) {

    let SuperClass;
    let prototype;

    if (typeof args[0] === 'function') {
        SuperClass = args.shift();
    }

    const props = args.shift();

    /**
     * The class constructor
     * @constructor
     */
    function Constructor(...args) {

        if ((this instanceof Constructor) === false) {
            return new Constructor(arguments);
        }

        // Super constructor should be called if this class doesn't have its own construct function
        if (!Object.getPrototypeOf(this).hasOwnProperty('construct')) {
            shouldConstructSuper = true;
        }

        // Call construct throughout the prototype chain
        if (this.construct && typeof this.construct === 'function') {

            args.unshift('construct');
            this.super.apply(this, args);

            if (!shouldConstructSuper) {
                this.construct.apply(this, args.slice(1));
            }
        }

        shouldConstructSuper = false;
    }

    // Construct the prototype
    if (SuperClass != null) {
        shouldConstructSuper = true;
        prototype = new SuperClass();

        for (let key in props) {

            if (props.hasOwnProperty(key)) {
                prototype[key] = props[key];
            }
        }
    } else {
        // Add super to the prototype chain if SuperClass is undefined
        props.super = superFn;
    }

    Constructor.prototype = prototype || props;

    return Constructor;
}

export default createClass;
