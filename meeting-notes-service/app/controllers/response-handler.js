export const setResponse = (data, response) => {
    response.status(200).json(data);
}

export const setCreateResponse = (data, response) => {
    response.status(201).json(data);
};

export const setDeleteResponse = (response) => {
    response.status(204).json({});
};

export const setError = (response) => {
    response.status(500).json({
        error: {
            code: 'InternalServerError',
            message: 'An error occurred while processing the request'
        }
    });
};
