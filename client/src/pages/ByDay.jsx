import React, { useState } from "react";

import SpinnerComponent from "../components/Spinner";
import ButtonComponent from "../components/Button";

import useHttp from "../hooks/http.hook";
import createCSV from "../functions/createCSV";
import getTime from "../functions/getTime";

import { Button, Container, Form, FormControl, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import HospitalEmblem from "../images/HospitalEmblem.jpg";

const ByDay = () => {

   const [date, setDate] = useState("");
   const [indiceCardiaco, setIndiceCardiaco] = useState([]);
   const [indicePulmonar, setIndicePulmonar] = useState([]);
   const [displayedTable, setDisplayedTable] = useState("Indice Cardiaco");

   const { request, isLoading } = useHttp();


   const searchByDay = async () => {
      setIndiceCardiaco([])
      setIndicePulmonar([])
      if (!date) return;
      try {
         const foundPatients = await request("/searchAllCaracteristicsOfDay", "POST", { date })
         setIndiceCardiaco(foundPatients.indiceCardiaco)
         setIndicePulmonar(foundPatients.indicePulmonar)
      } catch (e) { }
   }

   const changeDisplayedTable = () => {
      setDisplayedTable(displayedTable === "Indice Cardiaco" ? "Indice Pulmonar" : "Indice Cardiaco")
   }

   return (
      <Container className="my-5" style={{ height: "100%" }}>

         <Form className="mt-5 pt-5">
            <Form.Group className="mb-3 mx-auto" style={{ maxWidth: "40rem" }} >
               <FormControl
                  type="date"
                  placeholder="Buscar por dia"
                  className="me-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
               />
               <div className="my-3">
                  <Button
                     variant="info"
                     onClick={searchByDay}>Buscar</Button>
                  <ButtonComponent
                     func={createCSV}
                     arr={displayedTable === "IndiceCardiaco" ? indiceCardiaco : indicePulmonar}
                  />
               </div>
            </Form.Group>
         </Form>

         {
            isLoading ?
               <SpinnerComponent /> :
               !indiceCardiaco.length ?
                  <div className="text-center"><img src={HospitalEmblem} alt="Logo" style={{ maxWidth: "50vh" }} /></div> :
                  (
                     <>
                        <div
                           className="mt-3 mb-1 text-center"
                        >
                           <OverlayTrigger
                              placement="top"
                              overlay={
                                 <Tooltip id={`tooltip-top`}>
                                    Clique aqui para mudar o tipo de índice na tabela
                                 </Tooltip>
                              }
                           >
                              <h3
                                 onClick={changeDisplayedTable}
                                 className="d-inline-block showHovered"
                              >{displayedTable === "Indice Cardiaco" ? "Índice Cardíaco" : "Índice Pulmonar"}
                                 <span className="text-warning">&#8680;</span>
                              </h3>
                           </OverlayTrigger>
                        </div>

                        <div className="tableContainer">
                           <Table responsive bordered className="table" >
                              <thead>
                                 <tr>
                                    <th>№</th>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>CPF</th>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Índice</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    (displayedTable === "Indice Cardiaco" && indiceCardiaco.length > 0) ?
                                       indiceCardiaco.map((v, i) => {
                                          return (
                                             <tr key={Math.random()} >
                                                <td>{i + 1}</td>
                                                <td >{v.nome}</td>
                                                <td>{v.idade}</td>
                                                <td>{v.cpf}</td>
                                                <td>{v.ind_card_data}</td>
                                                <td>{getTime(v.ind_card_EPOC)}</td>
                                                <td>{v.ind_card_value}</td>
                                             </tr>
                                          )
                                       }) :
                                       (displayedTable === "Indice Pulmonar" && indicePulmonar.length > 0) ?
                                          indicePulmonar.map((v, i) => {
                                             return (
                                                <tr key={Math.random()} >
                                                   <td>{i + 1}</td>
                                                   <td >{v.nome}</td>
                                                   <td>{v.idade}</td>
                                                   <td>{v.cpf}</td>
                                                   <td>{v.ind_pulm_data}</td>
                                                   <td>{getTime(v.ind_pulm_EPOC)}</td>
                                                   <td>{v.ind_pulm_value}</td>
                                                </tr>
                                             )
                                          }) :
                                          null
                                 }
                              </tbody>
                           </Table>
                        </div>
                     </>
                  )
         }
      </Container >
   )
}

export default ByDay;