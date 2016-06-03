import fetch from 'isomorphic-fetch';
import checkStatus from './checkStatus';
import RequestMethod from './RequestMethod';

/**
 * Sends an XMLHttpRequest using the fetch API and returns a Promise
 *
 * @param   {String} url       The request url
 * @param   {Object} [payload] Additional request data
 * @param   {String} method    One of RequestMethod
 * @param   {Object} [headers] Optional additional headers
 * @returns {Promise}          Resolves with the response data parsed to JSON
 */
function sendRequest(url, payload, method = RequestMethod.GET, headers = {}) {

    const requestProps = {
        data: payload,
        headers,
        method,
    };

    return fetch(url, requestProps)
        .then(checkStatus)
        .then(response => response.json());
}

export default sendRequest;
