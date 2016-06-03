import _ from 'lodash';
import createClass from '../util/createClass';
import { find } from '../util/DOM';

const AbstractUIComponent = (function () {

    let domNode;
    let state;

    return createClass({

        construct: function () {},

        destroy: function () {},

        /**
         * Returns the DOMNode according to the selector in this.settings
         * @return {DOMElement}
         */
        findDOMNode: function () {

            domNode = domNode || find(state.selector);

            return domNode;
        },

        /**
         * Sets the component state
         * @param {Object} diff
         * @return {AbstractUIComponent}
         */
        setState: function (diff) {

            const shouldComponentUpdate = this.shouldComponentUpdate;
            const currentState = state;
            const nextState    = _.merge({}, state, diff);

            state = nextState;

            if (state && shouldComponentUpdate && !shouldComponentUpdate(currentState, nextState)) {
                return this;
            }

            window.requestAnimationFrame(() => {
                this.render(state);
                domNode = null;
            });

            return this;
        },

        getState: function () {

            return state;
        },

        /**
         * Renders the component
         * @throws {Error} If called directly
         */
        render: function () {
            throw new Error('The UIComponent should implement this function');
        },
    });
}());

export default AbstractUIComponent;
