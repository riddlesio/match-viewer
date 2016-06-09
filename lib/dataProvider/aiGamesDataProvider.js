import { zip } from 'lodash';
import Api from '../core/http/JsonApi';

/**
 * A thunk which can be used to interact with the TheAIGames.com's API
 *
 * @returns {Function} A function which, when executed returns a promise
 *                     The promise is resolved when data is returned and
 *                     the data is succesfully parsed into JSON.
 */
function aiGamesDataProvider() {

    const getBaseUrl = () => window.location !== window.parent.location
        ? document.referrer
        : document.location;

    return () => {

        const playerNames = getListFromFrameData('data-players');
        const emailHashes = getListFromFrameData('data-emailhash');

        const playerData = zip(playerNames, emailHashes).reduce((acc, [name, emailHash]) => (
            [...acc, { name, emailHash }]
        ), []);

        const url = getBaseUrl().replace(/\/$/, '');

        return Api
            .get(`${url}/data`)
            .then(matchData => ({ matchData, playerData }));
    };
}

function getListFromFrameData(key) {

    const rawData = window.frameElement.getAttribute(key);

    if (!rawData) {
        return [];
    }

    return rawData.split(',');
}

export default aiGamesDataProvider;
