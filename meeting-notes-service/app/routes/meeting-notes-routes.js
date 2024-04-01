import express from "express"

import * as meetingNotesController from './../controllers/meeting-notes-controller.js'

const router = express.Router();

router.route('/')
    .get(meetingNotesController.search)
    .post(meetingNotesController.post);

router.route('/:id')
    .get(meetingNotesController.get)
    .patch(meetingNotesController.patch)
    .put(meetingNotesController.put)
    .delete(meetingNotesController.remove)

export default router;