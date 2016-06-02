import component          from 'omniscient';
import React              from 'react';
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
        Left={ NormalScreenButton }
        Right={ FullScreenButton }
        condition={ props.fullScreen } />;
}

FullscreenToggle.propTypes = propTypes;

export default component('FullScreenToggle', FullScreenToggle);
