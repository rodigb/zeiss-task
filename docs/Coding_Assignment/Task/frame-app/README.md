# Initialization

In order to clone the repository to the repository, open up your IDE’s terminal and use the following url when cloning:

https://{YOURGITLABUSERNAME}@gitlab.com/cz-cop-ca/1005904/rodi-gemici-bektas.git

My changes were done on my branch, as the main branch was protected and wouldn't allow changes.

Git init
Git checkout -b {your branch name}

Then whenever you want to go onto the branch use:

git checkout {your branch}


## Creating the app

Create-react-app frame-app



## Components

Found under the components folder

### navbar

```javascript

import React from 'react'
import './navbar.scss'
import { FaCog, FaUser} from 'react-icons/fa';
function navbar() {
  return (
    <nav className="navbar">
        <a href="/" className="site-title"><span className="highlight">LOGO</span></a>
        <ul className="navbar-list">
            <li>
                <a href="/balance">£44</a>
            </li>
            <li>
                <a href="/user"><FaUser/></a>
            </li>
            <li>
                <a href="/settings"><FaCog/> </a>
            </li>
        </ul>
    </nav>
  )
}

export default navbar


```

### Table

```javascript

const Table = ({ data, column }) => {

    //create table component

  return (
    <table>
      <thead>
        <tr>
            {/* row for the headers */}
            {column.map((item, index) => <TableHeadItem key ={index} item={item} />)}
        </tr>
      </thead>
      <tbody>
        {/* row for the data */}
        {data.map((item, index) => <TableRow key ={index} id={index} item={item} column={column} />)}
      </tbody>
    </table>
  )
}
//map the headings of the tble
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
//map all of the extracted data into the rows: [0] is Nr, [1] is aperature, [2] is focusDistance
const TableRow = ({ item, column, id}) => (

  <tr id={id}>
        <><td>
          <input type="checkbox" className="check"

          onChange={handleChange}

          value={item[0]+item[1]+item[2]}

          />
          </td><td id={'nr'}>{item[0]}</td><td id={'aperture'}>{item[1]}</td><td id={'focus'}>{item[2]}</td></>
  </tr>
)

const handleChange = event => {

  if ($('input.check').is(':checked')){ //Jquery for getting the selected rows TD values
    list = [...$('table tbody tr:has("input:checked")')]
    .map(tr =>
      [...$(tr).find('td')]
      .reduce((res,td) => (res[$(td).attr('id')]=$(td).text(), res),{}))

      arr = []

      for(let i=0; i<list.length;i++){
        var nr = list[i]["nr"]
        var aperture = list[i]["aperture"]
        var focus = list[i]["focus"]
        arr.push([nr,aperture,focus]) //pushing selected values to array
      }




        selectData = arr
        localStorage.setItem("data", JSON.stringify(selectData)); //saving selected row values in local storage to be extracted by export component



}


}

```


Prerequisites: react-jquery


### exportcsv

```javascript
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



```

Prerequisites: MUI, react-csv

## Pages

### Screen

``` javascript

var nr;
var aperture;
var focusDistance;
var finalValues;
var tableJSON = [];
 
 
function Screen() {
 
    //loading spinner state
    const [isLoading, setIsLoading] = useState(false);
 
    //file drop being read with FileReader()
    const onDrop = useCallback(acceptedFiles =>{
 
        setIsLoading(true)//loading while code runs
 
        acceptedFiles.forEach((file) => {
 
            var result = []
            var obj={}
 
            const reader = new FileReader()
 
            //this code is run once the file is loaded via drag and drop.
            reader.onload = () => {
 
 
                //clearing up the text files read and formatting them to be read easily for data extraction
                var textFile= reader.result
                var lines = textFile.split("\n");
                var headers=lines[0].split(",");
 
                for(var i=1;i<lines.length;i++){
 
                    var currentline=lines[i].split(":");
 
                    for(var j=0;j<headers.length;j++){
 
                      obj[currentline[j]] = currentline[1];
                      var newObject= obj
 
                    }
 
                }
 
                result.push(newObject)
                result = JSON.stringify(result)
                result = result.replace(/(?:\\[rn])+/g, "");
                result = JSON.parse(result)
 
                //get the number(Nr.) of the text files
                nr = file.name
                nr = nr.split(".")
                nr = nr[1]
 
                //extract the aperture and focusDistance values
                aperture = result[0]["aperture (type float)"]
                focusDistance = result[0]["focus (type float)"]
 
 
                //finalValues will be used to display table if it is not null
                finalValues=nr+aperture+focusDistance
 
                //created array of extracted values
                //get the extracted information in the format(NR, APERTURE, FOCUS DISTANCE)
                tableJSON.push([nr,aperture,focusDistance])
 
                //loading state false at end of code
                setIsLoading(false)
            }
            reader.readAsText(file)
        })
    })
 
 
      //dropzone const values
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
 
if(finalValues==null){
 
    return (
        //dropzone code
        <div className="screen1">
            <div {...getRootProps({ className: "dropzone" })}>
                <input id="fileItem" type="file1" className="input-zone" {...getInputProps()} />
 
                {
                isDragActive ? (
                    <p className="dropzone-content">
                        <Image width="100%"></Image>
                        Release to drop the files here
                    </p>
                    ) : (
                        isLoading ? <CircularProgress size={100}/> :
 
                        <p className="dropzone-content">
                            <Image width="100%"></Image>
                            Drag and drop the files of a sequence to extract
                            the metadata
                        </p>
                        )
                }
            </div>
        </div>
    )
                    }
                    else{
 
                        //sort table to get ascending order Nr.
                        tableJSON.sort();
 
                        //creating column values to fill out the table
                        const column = [
 
                            {heading:"Nr. ", value:"nr"},
                            {heading:"Aperture",value:"aperture"},
                            {heading:"Focus Distance",value:"focus"}
 
                          ]
 
                        return(
                            <div className="screen1">
                            <div className= "dropzone">
                            <Table data = {tableJSON} column={column}/>
                            </div>
                            <button className="export">Export</button>
                            </div>
                            )
                        }
 
}
 
 
 
export default Screen


```

Prerequisites: mui/materials, react-dropzone



## Future improvements

### 



