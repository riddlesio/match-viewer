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
const { querySelector, querySelectorAll } = document;

const find = querySelector.bind(document);
const findAll = querySelectorAll.bind(document);

/**
 * Adds a className to the specified domElement
 * @param {Element} domElement
 * @param {String} className
 */
function addClass(domElement, className) {

    if (DOM.hasClass(domElement, className)) {
        return;
    }

    let classList = domElement.getAttribute('class').split(' ');
    classList.push(className);

    domElement.setAttribute('class', classList.join(' '));
}

/**
 * Checks if the specified Element has the class className
 * @param {Element} domElement
 * @param {String} className
 */
function hasClass(domElement, className) {

    const classList = domElement.getAttribute('class');

    return classList.indexOf(className) !== -1;
}

/**
 * Removes a className from the specified domElement
 * @param {Element} domElement
 * @param {String} className
 */
function removeClass(domElement, className) {

    if (!DOM.hasClass(domElement, className)) {
        return;
    }

    let classList = domElement.getAttribute('class').split(' ');
    classList.splice(classList.indexOf(className), 1);

    domElement.setAttribute('class', classList.join(' '));
}

export {
    addClass,
    find,
    findAll,
    hasClass,
    removeClass,
};
