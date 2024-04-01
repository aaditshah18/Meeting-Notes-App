import { useEffect, useState } from 'react'
import './App.css'
import {Note, fetchNotes} from "./api/notes";
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes().then(res => {
      setNotes(res.data);
      
      if (!res.result) {
       // Do something in here if it's incorrect response 
      }
    });
  }, [])

  if (notes.length === 0) {
    return (
      <div>
        This is empty
      </div>
    )
  }

  return (
    <div>
      <NoteList data={notes} />
    </div>
  )
}

export default App
