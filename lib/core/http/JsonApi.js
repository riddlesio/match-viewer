import sendRequest from './sendRequest';
import { DELETE, GET, POST, PUT } from './RequestMethod';

/**
 * @author Niko van Meurs <niko@starapple.nl>
 */

/**
 * Generic JsonApi class, exposing functions for the GET, POST, PUT and DELETE request methods
 * @class
 */
const JsonApi = {

    /**
     * Makes a request with the DELETE method
     * @param {String} url
     * @param {Object} payload
     * @param {Object} [headers]
     */
    delete: function (url, headers) {
        return sendRequest(url, [], DELETE, headers);
    },

    /**
     * Makes a request with the GET method
     * @param {String} url
     * @param {Object} [headers]
     */
    get: function (url, headers) {
        return sendRequest(url, null, GET, headers);
    },

    /**
     * Makes a request with the POST method
     * @param {String} url
     * @param {Object} payload
     * @param {Object} [headers]
     */
    post: function (url, payload, headers) {
        return sendRequest(url, payload, POST, headers);
    },

    /**
     * Makes a request with the PUT method
     * @param {String} url
     * @param {Object} payload
     * @param {Object} [headers]
     */
    put: function (url, payload, headers) {
        return sendRequest(url, payload, PUT, headers);
    },
};

export default JsonApi;
