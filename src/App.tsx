import React from 'react';
import { useState } from 'react';
import './App.css';

// const fetchCourseFinals = async () => {
//   try{
//     const response = await fetch();
//     const data = response.json();
//   }
//   catch(error){
//     alert("Whoops, something went wrong. Please try again.");
//     console.log(error);
//   }
// }
interface OutputFinalProps {
  data: string
}
interface GetFinalProps {
  courseName: string,
  section: string
}
//Outputs final data
const OutputFinal: React.FC<OutputFinalProps> = ({data}) => {
  return (
    <h1>{data}</h1>
  )
}
//Gets the final data
const GetFinal: React.FC<GetFinalProps> = ({courseName,section}) => {
  return <OutputFinal data={courseName} />
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
      [name]: value.toUpperCase(),
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(finalData.classInput.replace(/([A-Z][A-Z][A-Z]?[\s-]?([0-9][0-9][0-9]))/,"")){
      alert("Please provide a valid class");
      return null;
    }
    else{
      const classInput = finalData.classInput.replace(/([A-Z])[-]?(\d)/, '$1 $2');
      setOutputData(<GetFinal courseName={classInput} section={finalData.sectionInput} />);
    }
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
