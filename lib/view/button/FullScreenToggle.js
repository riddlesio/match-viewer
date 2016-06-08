import component          from 'omniscient';
import React              from 'react';
import createEither       from '../logic/createEither';
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
const FullScreenToggle = createEither({
    Left: NormalScreenButton,
    Right: FullScreenButton,
    isRight: props => !props.fullScreen,
});

FullScreenToggle.propTypes = propTypes;

export default component('FullScreenToggle', FullScreenToggle);
