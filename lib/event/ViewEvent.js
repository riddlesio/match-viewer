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
 * Emitted by the player when switching views
 */
const ViewEvent = createEvent([
    'view-change',
]);

export default ViewEvent;
