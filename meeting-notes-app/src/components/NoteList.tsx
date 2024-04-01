import { Note } from "../api/notes";

interface Props {
    data: Note[];
}

export default function NoteList(props: Props) {
    const {data} = props;
    
    return (
        <ul>
            {data.map(n => {
                return (
                <li key={n._id}>{`${n.title} (${n.creationDate})`}</li>
                )
            })}
      </ul>
    )
}