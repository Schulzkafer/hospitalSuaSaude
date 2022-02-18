import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const ByThePatient = () => {

   const [searchPeriod, setSearchPeriod] = useState(false);
   const [dateStart, setDateStart] = useState("");
   const [dateEnd, setDateEnd] = useState("");
   const [searchForIndiceCardiaco, setSearchForIndiceCardiaco] = useState(true);
   const [searchForIndicePulmonar, setSearchForIndicePulmonar] = useState(true);

   const [getNecessaryValues] = useOutletContext();

   return (
      <>

         <Form.Group className="mb-3 formGroup">
            <div>
               <Form.Label>Busca de índice</Form.Label>
            </div>
            <div>
               <Form.Check
                  inline
                  label="índice cardíaco"
                  type="checkbox"
                  checked={searchForIndiceCardiaco}
                  onChange={() => setSearchForIndiceCardiaco(!searchForIndiceCardiaco)}
               />

               <Form.Check
                  inline
                  label="índice pulmonar"
                  type="checkbox"
                  checked={searchForIndicePulmonar}
                  onChange={() => setSearchForIndicePulmonar(!searchForIndicePulmonar)}
               />
            </div>
         </Form.Group>

         <Form.Group className="mb-3 formGroup" controlId="formDataStart">
            <Form.Label>{searchPeriod ? "Início do intervalo" : "Data"}</Form.Label>
            <Form.Control
               type="date"
               placeholder="Data Start"
               value={dateStart}
               onChange={(e) => setDateStart(e.target.value)}
            />

            <Form.Text className="text-muted">
               *Se a data não for escolhida, buscam-se os últimos dados do paciente
            </Form.Text>

            <Form.Check
               className="my-2"
               type="switch"
               label="Procurar por intervalo de data"
               checked={searchPeriod}
               onChange={() => setSearchPeriod(!searchPeriod)}
            />

            {
               searchPeriod ?
                  <>
                     <Form.Label>Fim do intervalo</Form.Label>
                     <Form.Control
                        type="date"
                        placeholder="Data End"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                     />
                  </> :
                  null
            }
         </Form.Group>


         <Button
            variant="primary"
            onClick={() => getNecessaryValues(
               "/getPatients",
               {
                  dateStart,
                  dateEnd,
                  searchForIndiceCardiaco,
                  searchForIndicePulmonar
               })}>
            Enviar
         </Button>

      </>
   )
}

export default ByThePatient;