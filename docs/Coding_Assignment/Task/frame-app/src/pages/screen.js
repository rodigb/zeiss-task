import React, {useCallback} from 'react'
import './screen.scss'
import {ReactComponent as Image} from '../images/Files.svg'
import {useDropzone} from 'react-dropzone'


var nr;
var aperture;
var focusDistance;
var finalValues;
var parsed;


function Screen1() {

    //file drop being read with FileReader()
    const onDrop = useCallback(acceptedFiles =>{

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

                    //get the extracted information in the format(NR - APERTURE - FOCUS DISTANCE)
                    finalValues=nr+aperture+focusDistance
                    console.log(finalValues)


            }
            reader.readAsText(file)
        })
    })


      //dropzone const values
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (

    //dropzone code
    <div className="screen1">
        <div {...getRootProps({ className: "dropzone" })}>
            <input id="fileItem" type="file1" className="input-zone" {...getInputProps()} />
            {isDragActive ? (
                <p className="dropzone-content">
                    <Image width="100%"></Image>
                    Release to drop the files here
                </p>
                ) : (
                <p className="dropzone-content">
                    <Image width="100%"></Image>
                    Drag and drop the files of a sequence to extract
                    the metadata
                </p>
                )}
        </div>
    </div>
  )

}



export default Screen1