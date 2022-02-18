import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Caracteristics from "../../components/Caracteristics.jsx";
import Patient from "../../components/Patient.jsx";
import ButtonComponent from "../../components/Button.jsx";
import SpinnerComponent from "../../components/Spinner.jsx";
import Message from "../../components/Message.jsx";
import Graph from "../../components/Graph.jsx";

import useHttp from "../../hooks/http.hook.js";
import createCSV from "../../functions/createCSV.js";

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import "../../components/styles/FormGroup.css";


const HeadSearch = () => {

   const [patient, setPatient] = useState([]);
   const [patientIndiceCardiaco, setPatientIndiceCardiaco] = useState([]);
   const [patientIndicePulmonar, setPatientIndicePulmonar] = useState([]);
   const [message, setMessage] = useState("");
   const [name, setName] = useState("");
   const [graphShowed, setGraphShowed] = useState(false);

   const { request, isLoading } = useHttp();

   const getNecessaryValues = async (url, values) => {
      setPatient([])
      setPatientIndiceCardiaco([])
      setPatientIndicePulmonar([])
      let nameTrimmed = name.trim();
      if (nameTrimmed.length === 0) return;
      try {
         let response = await request(url, "POST", { name: nameTrimmed, ...values })
         setMessage(response.message)
         setPatient([response.patient])
         setPatientIndiceCardiaco(response.indiceCardiaco)
         setPatientIndicePulmonar(response.indicePulmonar)
         setTimeout(() => setMessage(""), 2000)
      } catch (e) { }
   }

   return (

      <Container fluid="true" className="container my-5 justify-content-evenly">
         {isLoading ? <SpinnerComponent /> : null}
         <Row>
            <Col xl={6}>
               <Form>
                  <Form.Group className="mb-3 formGroup">
                     <Form.Label>Nome do paciente</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Nome"
                        name="nameOfPatient"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                     <Form.Text className="text-muted">
                        O preenchimento do campo é obrigatório
                     </Form.Text>
                  </Form.Group>

                  <Outlet context={[getNecessaryValues]} />

                  <ButtonComponent
                     func={createCSV}
                     arr={[...patient, ...patientIndiceCardiaco, ...patientIndicePulmonar]}
                  />

                  <Button
                     variant="secondary"
                     disabled={patientIndiceCardiaco.length === 0 && patientIndicePulmonar.length === 0 ? true : false}
                     onClick={() => setGraphShowed(!graphShowed)}>Mostrar gráfico</Button>

                  <Message>{message}</Message>
               </Form>

               <Patient patient={patient} />
            </Col>

            <Col xl={6} className="text-center">
               <Caracteristics
                  patientIndiceCardiaco={patientIndiceCardiaco}
                  patientIndicePulmonar={patientIndicePulmonar}
               />
            </Col>
         </Row>

         <div className="text-center">
            {
               [patientIndiceCardiaco, patientIndicePulmonar].map(g => {
                  return (graphShowed && g.length) > 0 ?
                     <Graph
                        key={Math.random()}
                        indices={g}
                     /> :
                     null
               })
            }
         </div>
      </Container >
   )
}

export default HeadSearch;