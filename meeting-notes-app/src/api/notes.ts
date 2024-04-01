export type Note = {
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
  
export const fetchNotes = async () => {
    try {
        const res = await fetch("/api");
        const data: Note[] = await res.json();

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