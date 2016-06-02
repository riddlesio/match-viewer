/**
 * A thunk which can be used to inject fixture data
 *
 * @returns {Function} Returns a resolved promise containing
 *                     the json data passed to the thunk
 */
function fixtureDataProvider(json) {

    return () => Promise.resolve(json);
}

export default fixtureDataProvider;
