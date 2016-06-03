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

        const url = getBaseUrl().replace(/\/$/, '');

        return Api.get(`${url}/data`);
    };
}

export default aiGamesDataProvider;
