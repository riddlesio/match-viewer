import React from 'react';

/**
 * Presentational component which adds classes to the className string
 * @param   {Object}        props Can contain any props which can be passed to a React DOMElement
 * @returns {React.Element}
 */
function Button(props) {

    const { className = '', children, ...rest } = props;
    const compoundProps = {
        ...rest,
        className: ['Button GamePlayer-button', className].join(' ').trim(),
        type: 'button',
    };

    return <button { ...compoundProps } >{ children }</button>;
}

export default Button;
