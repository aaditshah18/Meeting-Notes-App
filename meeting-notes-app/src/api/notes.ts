export type NoteType = {
    _id: string
    noteId: number
    title: string
    content: string
    creationDate: string
    actionItems: {
        text: string
        completed: boolean
        _id: string
    }[]
    __v: number
}

export const fetchNotes = async (queryParams: any = null) => {
    try {
        const url = queryParams ? `/api?searchData=${queryParams}` : '/api';
        const res = await fetch(url);
        const data: NoteType[] = await res.json();

        return {
            result: true,
            data,
        }
    } catch (e) {
        return {
            result: false,
            data: [],
        }
    }
}

export const fetchParticularNote = async (id: String) => {
    try {
        const res = await fetch(`/api/${id}`);
        const data: NoteType = await res.json();

        return {
            result: true,
            data,
        }
    } catch (e) {
        return {
            result: false,
            data: null,
        }
    }
}


export const createNewNote = async (body: NoteType) => {
    try {
        const res = await fetch("/api", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(body)
        });
        const data: NoteType = await res.json();
        return {
            result: true,
            data,
        }
    } catch (e) {
        return {
            result: false,
            data: null,
        }
    }
}

export const updateExistingNote = async (body: NoteType, id: String) => {
    try {
        const res = await fetch(`/api/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(body),
        });
        const data: NoteType = await res.json();

        return {
            result: true,
            data,
        }
    } catch (e) {
        return {
            result: false,
            data: null,
        }
    }
}

export const deleteNote = async (id: String) => {
    try {
        const res = await fetch(`/api/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify({}),
        });
        const data: NoteType = await res.json();

        return {
            result: true,
            data,
        }
    } catch (e) {
        return {
            result: false,
            data: null,
        }
    }
}