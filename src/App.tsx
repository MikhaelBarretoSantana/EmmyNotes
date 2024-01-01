import React, { useEffect, useState } from 'react';
import './App.css';
import Itens from './components/itens/itens';
import { INotes } from './models/INotes.model';
import CreateSpace from './components/createSpace/createSpace';

function App() {

  const [notes, setNotes] = useState<Array<INotes> | null>([]);

  return (
    <div className="App">
        <Itens notes={notes} setNotes={setNotes}  />
        <CreateSpace setNotes={setNotes} notes={notes} />
    </div>
  );
}

export default App;
