/**
 * A thunk which can be used to interact with the Riddles.io API
 *
 * @returns {Function} A function which, when executed returns a promise
 *                     The promise is resolved when data is returned and
 *                     the data is succesfully parsed into JSON.
 */
function riddlesDataProvider() {

    return () => {

        const data = window.__data__;
        delete window.__data__;

        return Promise.resolve(data);
    };
}

export default riddlesDataProvider;
