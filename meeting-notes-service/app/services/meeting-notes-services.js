import meetingNotes from './../models/meeting-notes-models.js';

/**
 * Search meeting notes based on keywords 
 * in title, meeting points or content.
 * @param {*} params 
 * @returns 
 */

export const search = async (params = {}) => {
    const registrations = await meetingNotes.find(params).exec();
    return registrations;
}


/**
 * Save the meeting notes data to the database
 * @param {*} noteData 
 * @returns 
 */
export const save = async (noteData) => {
    const meetingNote = new meetingNotes(noteData);
    return await meetingNote.save()
}

/**
 * GET a particular meeting note by ID
 * @param {*} id 
 * @returns 
 */
export const get = async (id) => {
    const note = await meetingNotes.findOne({ noteId: id }).exec();
    return note;
}

/**
 * Update a meeting note by ID
 * @param {*} id 
 * @param {*} newData 
 * @returns 
 */
export const update = async (id, newData, method) => {
    let updatedNote;

    if (method === 'PUT') {
        // For PUT requests, replace the entire resource with the new data
        updatedNote = await meetingNotes.findOneAndUpdate({ noteId: id }, newData, { new: true }).exec();
    } else if (method === 'PATCH') {
        // For PATCH requests, apply partial modifications to the resource
        updatedNote = await meetingNotes.findOneAndUpdate({ noteId: id }, { $set: newData }, { new: true }).exec();
    } else {
        throw new Error('Invalid method provided');
    }

    return updatedNote;
}


/**
 * Delete a meeting note by ID
 * @param {*} id 
 * @returns 
 */
export const remove = async (id) => {
    const deletedNote = await meetingNotes.findOneAndDelete({ noteId: id }).exec();
    return deletedNote;
}
