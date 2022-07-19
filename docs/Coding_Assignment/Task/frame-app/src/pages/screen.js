import React from 'react'
import './screen.scss'

import {useDropzone} from 'react-dropzone'





function Screen1() {
    //dropzone const values
    const {getRootProps, getInputProps, isDragActive} = useDropzone();


  return (

    //dropzone code
    <div className="screen1">
        <div {...getRootProps({ className: "dropzone" })}>
            <input id="fileItem" type="file1" className="input-zone" {...getInputProps()} />
            {isDragActive ? (

                <p className="dropzone-content">
                    Release to drop the files here
                </p>
                ) : (
                <p className="dropzone-content">
                    Drag and drop the files of a sequence to extract the metadata
                </p>
                )}
        </div>
    </div>
  )

}



export default Screen1