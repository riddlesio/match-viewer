/**
 * Throws an error if response status code not in the 2xx range
 *
 * @param   {Response} response Response returned by fetch
 * @returns {Response}
 * @throws  {Error}    If response status is not within the 2xx range
 */
function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error;
}

export default checkStatus;
