import React, {useState} from 'react'
import "./exportcsv.scss"


import { CSVDownload, CSVLink } from "react-csv";

var data;

function Exportcsv() {
  
  const [isLoaded, setIsLoaded] = useState(false);

   

  function exportBtn(){


    setIsLoaded(true)
    console.log(isLoaded)
    data = JSON.parse(localStorage.getItem("data"))
    console.log(data)

  };

    
        if (isLoaded == true) {
            return (
              <div className="csv-export">
              <button className="csv-btn" onClick={exportBtn}>Export</button>
              <br></br>
              <CSVLink data={data}>
              Download me
              </CSVLink>
              </div>)
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

