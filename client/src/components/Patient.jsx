import React from "react";
import { ListGroup } from "react-bootstrap";

const Patient = ({ patient }) => {

   return patient.length === 0 ? null :
      (
         <ListGroup className="my-5" >
            {
               <ListGroup.Item>
                  <div><b>Nome:</b> {patient[0].nome}</div>
                  <div><b>Idade:</b> {patient[0].idade}</div>
                  <div><b>CPF:</b> {patient[0].cpf}</div>
               </ListGroup.Item>
            }
         </ListGroup>
      )

}
export default Patient;