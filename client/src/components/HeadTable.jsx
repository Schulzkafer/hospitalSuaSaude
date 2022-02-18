import { React } from "react";
import getTime from "../functions/getTime";
import { Table } from "react-bootstrap";
import "./styles/Table.css";

const TableComponent = ({ ind, arr }) => {

   return (
      <div className="tableContainer" >
         <Table responsive bordered >
            <thead>
               <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>{ind}</th>
               </tr>
            </thead>
            <tbody>
               {
                  arr.map(indice => {
                     return (
                        <tr key={Math.random()}>

                           {
                              ind === "ind_card" ?
                                 <>
                                    <td>{indice.ind_card_data}</td>
                                    <td>{getTime(indice.ind_card_EPOC)}</td>
                                    <td>{indice.ind_card_value}</td>
                                 </>
                                 :
                                 <>
                                    <td>{indice.ind_pulm_data}</td>
                                    <td>{getTime(indice.ind_pulm_EPOC)}</td>
                                    <td>{indice.ind_pulm_value}</td>
                                 </>
                           }
                        </tr>
                     )
                  })
               }
            </tbody>
         </Table>
      </div>
   )
}

export default TableComponent;