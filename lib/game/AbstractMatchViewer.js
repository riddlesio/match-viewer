import invariant  from 'invariant';
import GamePlayer from '../player/GamePlayer';
import createClass from '../util/createClass';

/**
 * AbstractMatchViewer takes care of two things:
 *
 * - Rendering the player chrome if enabled
 * - Retrieval of match data, which it passes on to the handleData method defined by its subclass
 *
 * @abstract
 */

// class AbstractMatchViewer {
const AbstractMatchViewer = createClass({
    /**
     * Instantiates the player chrome and initiates data retrieval
     *
     * @param  {Object}   props              Contains the dataProvider and possible flags which
     *                                       influence the rendering of the Player chrome
     * @param  {Function} props.dataProvider Should return a promise when executed which, when resolved
     *                                       returns the Match's JSON data. Default implementations are
     *                                       provided in @riddles/match-viewer/lib/core/dataProvider/
     * @throws {Error}                       If no dataProvider is passed
     */
    constructor(props) {},

    construct(props) {
        console.log(props);

        const { dataProvider, ...options } = props;

        invariant(dataProvider, 'Game should receive a dataProvider through its props');

        this.player = new GamePlayer(options);

        dataProvider().then(this.handleData.bind(this));
    },

    /**
     * Returns the root DOMElement for the MatchViewer
     *
     * @returns {Element}
     */
    getDOMNode() {

        return document.querySelector('.GamePlayer-view');
    },

    // /**
    //  * Sets the state descriptors
    //  *
    //  * @param   {Array}               descriptors [description]
    //  * @returns {AbstractMatchViewer}
    //  */
    // setStateDescriptors(descriptors) {
    //
    //     this.player.setStateDescriptors(descriptors);
    //
    //     return this;
    // }

    // Event listeners

    /**
     * Abstract function, called when data is loaded
     * @abstract
     * @param  {Object} data
     * @throws {Error}  Throws an error if called. Any implementation of
     *                  Abstract game should implement this callback.
     */
    handleData(data) {

        throw new Error('Your Viewer implementation should implement a handleData callback');
    },
});

//}

export default AbstractMatchViewer;
