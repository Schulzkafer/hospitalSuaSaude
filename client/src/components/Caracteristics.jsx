import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TableComponent from "./HeadTable";

import HospitalEmblem from "../images/HospitalEmblem.jpg"

const Caracteristics = ({ patientIndiceCardiaco, patientIndicePulmonar }) => {
   return (patientIndicePulmonar.length || patientIndiceCardiaco.length) ? (
      < Container fluid="xxl" >
         <Row>
            <Col xxl={!patientIndicePulmonar.length ? 12 : 6}>
               {
                  !patientIndiceCardiaco.length ? null :
                     <>
                        <h4>Indice cardiaco</h4>
                        <TableComponent ind="ind_card" arr={patientIndiceCardiaco} />
                     </>
               }
            </Col>
            <Col xxl={!patientIndiceCardiaco.length ? 12 : 6}>
               {
                  !patientIndicePulmonar.length ? null :
                     <>
                        <h4>Indice pulmonar</h4>
                        <TableComponent ind="ind_pulm" arr={patientIndicePulmonar} />
                     </>
               }
            </Col>
         </Row>
      </ Container >
   ) :
      <img src={HospitalEmblem} alt="log" style={{ maxWidth: "50vh" }} />
}

export default memo(Caracteristics);