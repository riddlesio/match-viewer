import React from 'react';

const propTypes = {
    Left: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.func,
    ]).isRequired,
    Right: React.PropTypes.oneOfType([
        React.PropTypes.element,
        React.PropTypes.func,
    ]).isRequired,
    condition: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.func,
    ]).isRequired,
    childProps: React.PropTypes.object,
};

/**
 * A React Component which renders either Left or Right depending on whether condition is truthy
 * @param   {React.Component}     Left        Renders if condition is falsy
 * @param   {React.Component}     Right       Renders if condition is truthy
 * @param   {Function|Boolean}    condition   Determines whether to render Right or Left
 * @param   {Object}              childProps  Passed to either the Left or Right component when
 *                                            rendered
 * @returns {React.Element}
 */
function Either({ Left, Right, condition, childProps }) {

    if (isRight(condition)) {
        return <Right { ...childProps }/>;
    }

    return <Left { ...childProps }/>;
}

/**
 * Returns true if condition is truthy
 * @param   {*}       condition
 * @returns {Boolean}
 */
function isRight(condition) {

    if (typeof condition === 'function') {
        return condition();
    }

    return !!condition;
}

Either.propTypes = propTypes;

export default Either;
