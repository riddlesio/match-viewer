import React from 'react';

// Note: This should be replaced by Flow types
const propTypes = {
    Left: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.func,
    ]).isRequired,
    Right: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.func,
    ]).isRequired,
    isRight: React.PropTypes.func.isRequired,
};

/**
 * A React Component which renders either Left or Right depending on whether condition is truthy
 * @param   {React.Component} Left    Renders if isRight returns false
 * @param   {React.Component} Right   Renders if isRight returns true
 * @param   {Function}        isRight Determines whether to render Right or Left
 * @returns {React.Component}
 */
function createEither({ Left, Right, isRight }) {

    return function Either(props) {

        if (isRight(props)) {
            return <Right { ...props}/>;
        }

        return <Left { ...props }/>;
    };
}

createEither.propTypes = propTypes;

export default createEither;
