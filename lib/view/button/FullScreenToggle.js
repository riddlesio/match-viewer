import component          from 'omniscient';
import React              from 'react';
import Either             from '../logic/Either';
import NormalScreenButton from './NormalScreenButton';
import FullScreenButton   from './FullScreenButton';

const propTypes = {
    fullScreen: React.PropTypes.bool.isRequired,
};

/**
 * Renders the FullScreen toggle
 * @param {Object} props
 * @returns {React.Element}
 */
function FullScreenToggle(props) {

    return <Either
        Left={ FullScreenButton }
        Right={ NormalScreenButton }
        condition={ props.fullScreen } />;
}

FullScreenToggle.propTypes = propTypes;

export default component('FullScreenToggle', FullScreenToggle);
