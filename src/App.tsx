import React from 'react';
import { useState } from 'react';
import './App.css';

interface OutputFinalProps {
  data: string
}
interface GetFinalProps {
  classname: string,
  section: string
}

const OutputFinal: React.FC<OutputFinalProps> = ({data}) => {
  return (
    <h1>{data}</h1>
  )
}

const GetFinal: React.FC<GetFinalProps> = ({classname,section}) => {
  return <OutputFinal data={classname} />
}

function App() {
  const [finalData, setFinalData] = useState({
    classInput: "",
    sectionInput: "",
  });
  const [outputData, setOutputData] = useState<React.ReactNode>(null)

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFinalData({
      ...finalData,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOutputData(<GetFinal classname={finalData.classInput} section={finalData.sectionInput} />)
  }

  return (
    <div className="App">
      <h1>Final Exam Finder</h1>.
      <div id="finalInput">
        <p>Please put in your class infomation</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="classInput"></label>
          <input 
            required
            id="classInput" 
            name="classInput" 
            value={finalData.classInput} 
            type="text" placeholder="Class" 
            onChange={handleChange} />
          <label htmlFor="sectionInput"></label>
          <input 
            required
            id="sectionInput" 
            name="sectionInput" 
            value={finalData.sectionInput} 
            type="text" placeholder='Section' 
            onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div id="outputSection">
        {outputData}
      </div>
      <footer>
        <p>Created by Saikarthik Mummadisingu, Nathaniel Andre Escaro, Esat Adiloglu and Ryan Eshan</p>
      </footer>
    </div>
  );
}
export default App;
