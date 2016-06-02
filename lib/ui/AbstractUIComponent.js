(function () {

    const
        _           = require('lodash'),
        createClass = require('../util/createClass'),
        DOM         = require('../util/DOM');

    var AbstractUIComponent;

    AbstractUIComponent = (function () {

        var domNode,
            state;

        return createClass({

            construct: function () {},

            destroy: function () {},

            /**
             * Returns the DOMNode according to the selector in this.settings
             * @return {DOMElement}
             */
            findDOMNode: function () {

                domNode = domNode || DOM.find(state.selector);

                return domNode;
            },

            /**
             * Sets the component state
             * @param {Object} diff
             * @return {AbstractUIComponent}
             */
            setState: function (diff) {

                var self = this,
                    currentState,
                    nextState,
                    shouldComponentUpdate = self.shouldComponentUpdate;

                currentState = state;
                nextState    = _.merge({}, state, diff);
                state        = nextState;

                if (state && shouldComponentUpdate && !shouldComponentUpdate(currentState, nextState)) {
                    return self;
                }

                window.requestAnimationFrame(function () {

                    self.render(state);
                    domNode = null;
                });

                return self;
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
            }

        });
    }());

    module.exports = AbstractUIComponent;
}());
