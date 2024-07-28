import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { ReactComponent as StevensDucksLogo } from './Stevens_Ducks.svg';

interface OutputFinalProps {
  data: string
};

interface GetFinalProps {
  classname: string,
  section: string
};

const getFinalsData = async () => {
  try{
    const response = await fetch("https://localhost:3000/api/finals/BIA 500/A");
    const data = await response.json();
    console.log(data);
  }
  catch(error){
    console.log(error);
  }
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

  useEffect(() => {
    getFinalsData();
  })

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
      <h1>Final Exam Finder</h1>
      <StevensDucksLogo className='logo'/>
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
    </div>
  );
}
export default App;
