/**
 * A thunk which can be used to interact with the Riddles.io API
 *
 * @returns {Function} A function which, when executed returns a promise
 *                     The promise is resolved when data is returned and
 *                     the data is succesfully parsed into JSON.
 */
function riddlesDataProvider() {
    // TODO: implement riddlesDataProvider
    return () => Promise.resolve({});
}

export default riddlesDataProvider;
