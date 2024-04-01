import * as meetingNoteService from './../services/meeting-notes-services.js';
import { setResponse, setCreateResponse, setDeleteResponse, setError } from './response-handler.js';

/**
 * Controller function to search meeting notes based on query parameters.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the search operation is complete.
 */
export const search = async (request, response) => {
    try {
        const queryParams = { ...request.query };

        // Extracting search criteria from query parameters
        const { title, content, actionItemText, startDate, endDate } = queryParams;

        // Constructing the search query
        const searchQuery = {};

        if (title) {
            searchQuery.title = { $regex: title, $options: 'i' }; // Case-insensitive regex search for title
        }

        if (content) {
            searchQuery.content = { $regex: content, $options: 'i' }; // Case-insensitive regex search for content
        }

        if (actionItemText) {
            searchQuery['actionItems.text'] = { $regex: actionItemText, $options: 'i' }; // Case-insensitive regex search for action item text
        }

        if (startDate && endDate) {
            // Convert start and end dates to Date objects
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
        
            // Increment end date by one day to include notes created on endDate
            endDateObj.setDate(endDateObj.getDate() + 1);
        
            // Filter notes created between startDate and endDate (inclusive)
            searchQuery.creationDate = { $gte: startDateObj, $lt: endDateObj };
        }

        // Perform the search using the constructed query
        const notes = await meetingNoteService.search(searchQuery);

        // Send the search results as response
        setResponse(notes, response);
    } catch (error) {
        // Handle errors
        setError(response);
    }
}


/**
 * Controller function to create a new meeting note.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the creation operation is complete.
 */
export const post = async (request, response) => {
    try {
        const noteData = { ...request.body };
        const newNote = await meetingNoteService.save(noteData);
        setCreateResponse(newNote, response);
    } catch (error) {
        setError(response);
    }
}

/**
 * Controller function to get a meeting note by its ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the retrieval operation is complete.
 */
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const note = await meetingNoteService.get(id);
        setResponse(note, response);
    } catch (error) {
        setError(response);
    }
}

/**
 * Controller function to delete a meeting note by its ID.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the deletion operation is complete.
 */
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const deletedNote = await meetingNoteService.remove(id);
        setDeleteResponse(response);
    } catch (error) {
        console.log(error)
        setError(response);
    }
}

/**
 * Controller function to update a meeting note by its ID using PUT method.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the update operation is complete.
 */
export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const newData = { ...request.body };
        const updatedNote = await meetingNoteService.update(id, newData, 'PUT');
        setResponse(updatedNote, response);
    } catch (error) {
        setError(response);
    }
}

/**
 * Controller function to update a meeting note by its ID using PATCH method.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves once the update operation is complete.
 */
export const patch = async (request, response) => {
    try {
        const id = request.params.id;
        const newData = { ...request.body };
        const updatedNote = await meetingNoteService.update(id, newData, 'PATCH');
        setResponse(updatedNote, response);
    } catch (error) {
        setError(response);
    }
}
