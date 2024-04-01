import meetingNotesRouter from './meeting-notes-routes.js';

const initializeRoutes = (app) => {
    app.use('/meetingNotes', meetingNotesRouter);
}

export default initializeRoutes;