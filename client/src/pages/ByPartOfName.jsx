import React, { useState } from "react";
import { Button, Container, Form, FormControl, Table } from "react-bootstrap";
import SpinnerComponent from "../components/Spinner";
import ButtonComponent from "../components/Button";

import useHttp from "../hooks/http.hook";

import createCSV from "../functions/createCSV";
import HospitalEmblem from "../images/HospitalEmblem.jpg";


const ByPartOfName = () => {

   const [partOfName, setPartOfName] = useState("");
   const [patients, setPatients] = useState([]);
   const { request, isLoading } = useHttp();

   const searchPatientsByPartOfName = async () => {
      setPatients([])
      if (!partOfName) return;
      try {
         const foundPatients = await request("/searchPatientsByPartOfName", "POST", { partOfName })
         setPatients(foundPatients.patients)
      } catch (e) { }
   }


   return (
      <Container className="my-5"  >
         <Form className="my-5 pt-5"  >
            <Form.Group className="mb-3 mx-auto" style={{ maxWidth: "40rem" }} >
               <FormControl
                  type="search"
                  placeholder="Buscar pacientes por parte do nome"
                  className="me-2"
                  value={partOfName}
                  onChange={(e) => setPartOfName(e.target.value)}
               />
               <div className="my-3">
                  <Button
                     variant="info"
                     onClick={searchPatientsByPartOfName}>Buscar</Button>
                  <ButtonComponent
                     func={createCSV}
                     arr={patients}
                  />
               </div>
            </Form.Group>
         </Form>

         {
            isLoading ?
               <SpinnerComponent /> :
               !patients.length ?
                  <div className="text-center">
                     <img src={HospitalEmblem} alt="logo" style={{ maxWidth: "50vh" }} /></div> :
                  <div className="tableContainer" >
                     <Table responsive bordered size="sm" >
                        <thead>
                           <tr>
                              <th>№</th>
                              <th>Nome</th>
                              <th>Idade</th>
                              <th>CPF</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              patients.map((p, i) => {
                                 return (
                                    <tr key={p.cpf}>
                                       <td>{i + 1}</td>
                                       <td>{p.nome}</td>
                                       <td>{p.idade}</td>
                                       <td>{p.cpf}</td>
                                    </tr>
                                 )
                              })
                           }
                        </tbody>
                     </Table>
                  </div>
         }
      </Container >
   )
}

export default ByPartOfName;