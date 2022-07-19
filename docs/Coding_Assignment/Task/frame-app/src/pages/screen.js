import React from 'react'
import './screen.scss'
import {ReactComponent as Image} from '../images/Files.svg'
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