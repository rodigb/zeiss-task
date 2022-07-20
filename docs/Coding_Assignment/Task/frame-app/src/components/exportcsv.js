import React, {useState} from 'react'
import "./exportcsv.scss"
import { CircularProgress } from '@mui/material';
import { CSVDownload, CSVLink } from "react-csv";

var data;
var headers;

function Exportcsv() {


  // states for data exports
  const [isLoaded, setIsLoaded] = useState(false);
  //state for loading spinner
  const [isLoading, setIsLoading] = useState(false);

  //function for return home when csv is downloaded
  function returnHome(){

    const timer = setTimeout(()=> {
      window.location.href = "/" 
      },2000)

  }

  //export button function
  function exportBtn(){

    //set state to true
    setIsLoaded(true) 
    setIsLoading(true)

    //get data from local storage
    data = JSON.parse(localStorage.getItem("data"))

    //create headers for csv file
    headers = ["Nr.", "Aperture", "Focus Distance"]


    //timer for loading spinner
    const timer = setTimeout(()=> {
      setIsLoading(false)
     },1000)

  }


  //if isLoaded state is true, return jsx for csv download button
  if (isLoaded == true) {

    return (

      <div className="csv-export">
      <br></br>
      {( isLoading ? <div className="loading-csv"><CircularProgress size={100}/></div> :
      <div className="download-link">
      <CSVLink data={data} headers ={headers}>
      <button className="csv-btn"onClick={returnHome}>Download Me!</button>
      </CSVLink>
      </div>
      )}

      </div>
      )
    }

      //else return export loading button
      else{

        return (

          <div className="csv-export">
          <button className="csv-btn2" onClick={exportBtn}>Export</button>

          </div>

          )
        }



}


export default Exportcsv

