import './table.scss'
import {Checkbox, List} from '@mui/material'
import { useState, useRef } from 'react';
import $, { data } from 'jquery'
import { CSVDownload, CSVLink } from "react-csv";
import React from 'react'


var selectData =[];
var list
var newList;
var dataValues
var arr = [];


console.log(selectData)



const csvExport = () => {

  return(
  <CSVLink data={"hi"} >
  Download me
  </CSVLink>
  )
}


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

  if ($('input.check').is(':checked')){
    list = [...$('table tbody tr:has("input:checked")')]
    .map(tr =>
      [...$(tr).find('td')]
        .reduce((res,td) => (res[$(td).attr('id')]=$(td).text(), res),{}))


        arr = []

        for(let i=0; i<list.length;i++){
          var nr = list[i]["nr"]
          var aperture = list[i]["aperture"]
          var focus = list[i]["focus"]
          arr.push([nr,aperture,focus])
        }

        selectData = arr
        localStorage.setItem("data", JSON.stringify(selectData));



}

console.log(selectData)


}



export default Table
