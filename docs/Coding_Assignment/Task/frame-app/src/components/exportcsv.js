import React, {useState} from 'react'
import "./exportcsv.scss"
import { CircularProgress } from '@mui/material';
import { CSVDownload, CSVLink } from "react-csv";

var data;

function Exportcsv() {
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function returnHome(){

    const timer = setTimeout(()=> {
      window.location.href = "/"
     },2000)

  }

  function exportBtn(){


    setIsLoaded(true)
    
    setIsLoading(true)
    console.log(isLoaded)
    data = JSON.parse(localStorage.getItem("data"))
    console.log(data);

    const timer = setTimeout(()=> {
      setIsLoading(false)
     },1000)

  };
        if (isLoaded == true) {
            return (
              <div className="csv-export">
              
              <br></br>

              {(isLoading ? <div className="loading"><CircularProgress size={100}/></div> :
              <div className="download-link">
              <CSVLink data={data}>
              <button className="csv-btn"onClick={returnHome}>Download me!</button>
              </CSVLink>
              
              </div>
               
              )}
              </div>

              )
        }

        else{

          return (

            <div className="csv-export">
            <button className="csv-btn" onClick={exportBtn}>Export</button>
 
            </div>

            )


        }



}


export default Exportcsv

