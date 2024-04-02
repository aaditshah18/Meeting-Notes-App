import { useEffect, useState } from 'react'
import './App.css'
import {NoteType, fetchNotes} from "./api/notes";
import NoteList from './components/NoteList';
import MainTitle from './components/MainTitle';

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    fetchNotes().then(res => {
      setNotes(res.data);
      
      if (!res.result) {
       // Do something in here if it's incorrect response 
      }
    });
  }, [])

  return (
    <div className='main'>
      <MainTitle />
      <NoteList data={notes} />
    </div>
  )
}

export default App
