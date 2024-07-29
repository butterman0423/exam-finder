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
  const [outputData, setOutputData] = useState<{ [key: string]: string }>({})
  /*
  useEffect(() => {
    getFinalsData();
  })
  */

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFinalData({
      ...finalData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { classInput, sectionInput } = finalData;
    
    try {
        const classInput2 = classInput.replace(/([A-Z])-?([0-9])/,"$1 $2");
        const dat = await fetch(`/api/finals/${classInput2}/${sectionInput}`);
        const json = await dat.json();

        console.log(json);
        if(json === undefined) {
          throw Error(`${classInput} ${sectionInput} does not exist`)
        }

        setOutputData(json[0]);
        //setOutputData(<GetFinal classname={ json['day_date'] } section={ json['building_room'] } />)
    } catch(e) {
      console.error(e);
    }
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
        {
          outputData && Object.keys(outputData).length > 0 ? 
          <div>
            <h1>{outputData['day_date']}, {outputData['building_room']}</h1>
            <h1>{outputData['start_time']}, {outputData['end_time']}</h1>
          </div> :
          ""
        }
      </div>
    </div>
  );
}
export default App;
