import './table.scss'
import {Checkbox, List} from '@mui/material'
import { useState, useRef } from 'react';
import $, { data } from 'jquery'
import { CSVDownload, CSVLink } from "react-csv";
import React from 'react'
import CsvDownload from 'react-json-to-csv'

var selectData =[];
var list
var newList;

const headers = ["Nr", "Aperture", "Focus Distance"]
  

const dataValues = selectData





const Table = ({ data, column }) => {
 

  function csvExport(){
 

  }

    //create table component

  return (


    <table>
      <thead>
        <tr>
            {/* row for the headers */}
            {column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
      </thead>
      <tbody>
        {/* row for the data */}
        {data.map((item, index) => <TableRow id={index} item={item} column={column} />)}
      </tbody>
       
      <CSVLink data={data} headers={headers}>
      Download me
      </CSVLink>
    </table>
  )
}
//map the headings of the tble
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
//map all of the extracted data into the rows: [0] is Nr, [1] is aperature, [2] is focusDistance
const TableRow = ({ item, column, id}) => (

  <tr id={id}>
        <><td>
          <input type="checkbox" class="check"

          onChange={handleChange}

          value={item[0]+item[1]+item[2]}

          />
          </td><td id={'nr'}>{item[0]}</td><td id={'aperture'}>{item[1]}</td><td id={'focus'}>{item[2]}</td></>
  </tr>
)

const handleChange = event => {

  $('.check').on('change', function() {
    list = [...$('table tbody tr:has("input:checked")')]
    .map(tr =>
      [...$(tr).find('td:lt(4)')]
        .reduce((res,td) => (res[$(td).attr('id')]=$(td).text(), res),{}))


         

        selectData = list


})


 

}



export default Table