import { useState } from 'react';
import './App.css';
import { BackendDataProvider } from './contexts/backendDataContext';
import Router from './router'

function App() {
  const [bData, setBData] = useState({})

  return (
    <div className="App">
      <BackendDataProvider value={{data: bData, setData: setBData}}>
        <Router/>
      </BackendDataProvider>
    </div>
  );
}

export default App;
