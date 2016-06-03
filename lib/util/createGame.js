/**
 * This file is part of the The AI Games game js library
 *
 * (c) Niko van Meurs <nikovanmeurs@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * @author Niko van Meurs <niko@starapple.nl>
 */
import AbstractGame from '../game/AbstractMatchViewer';
import createClass from './createClass';

/**
 * Mixes the mixins into the passed prototype
 * @param prototype
 * @param mixins
 *
 * @deprecated because ES6 Classes do not support mixins
 */
function createGame(prototype, mixins) {

    mixins && mixins.forEach((mixin) => mixin.applyTo(prototype));

    return createClass(AbstractGame, prototype);
}

export default createGame;
