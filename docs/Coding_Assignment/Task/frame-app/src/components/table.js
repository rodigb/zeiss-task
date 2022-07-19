import './table.scss'

const Table = ({ data, column }) => {

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
        {data.map((item, index) => <TableRow item={item} column={column} />)}
      </tbody>
    </table>
  )
}
//map the headings of the tble
const TableHeadItem = ({ item }) => <th>{item.heading}</th>
//map all of the extracted data into the rows: [0] is Nr, [1] is aperature, [2] is focusDistance
const TableRow = ({ item, column }) => (

  <tr>
        <><td>{item[0]}</td><td>{item[1]}</td><td>{item[2]}</td></>
  </tr>
)

export default Table