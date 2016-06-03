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
 */
(function (undefined) {
    var superFn;

    /**
     * Used to retrieve a function with name functionName from a superClass's prototype object
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf|Object.getPrototypeOf()}
     * @param {String} functionName
     * @returns {*}
     *
     * @deprecated Will be removed in favor of ES6 Classes
     */
    superFn = function (functionName) {

        var prototype = Object.getPrototypeOf(Object.getPrototypeOf(this)),
            functionName,
            args;

        args = [].slice.call(arguments, 1);

        if (prototype.hasOwnProperty(functionName)) {
            return prototype[functionName].apply(this, args);
        }
    };

    module.exports = superFn;
}());
