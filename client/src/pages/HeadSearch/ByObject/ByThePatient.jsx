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
               <Form.Label>O que esta procurando</Form.Label>
            </div>
            <div>
               <Form.Check
                  inline
                  label="indice cardiaco"
                  type="checkbox"
                  checked={searchForIndiceCardiaco}
                  onChange={() => setSearchForIndiceCardiaco(!searchForIndiceCardiaco)}
               />

               <Form.Check
                  inline
                  label="indice pulmonar"
                  type="checkbox"
                  checked={searchForIndicePulmonar}
                  onChange={() => setSearchForIndicePulmonar(!searchForIndicePulmonar)}
               />
            </div>
         </Form.Group>

         <Form.Group className="mb-3 formGroup" controlId="formDataStart">
            <Form.Label>{searchPeriod ? "O inicio do intervalo" : "O dia"}</Form.Label>
            <Form.Control
               type="date"
               placeholder="Data Start"
               value={dateStart}
               onChange={(e) => setDateStart(e.target.value)}
            />

            <Form.Text className="text-muted">
               *Se a data nao for escolhida, busca-se os ultimos  dados do paciente
            </Form.Text>

            <Form.Check
               className="my-2"
               type="switch"
               label="Procurar por um periodo"
               checked={searchPeriod}
               onChange={() => setSearchPeriod(!searchPeriod)}
            />

            {
               searchPeriod ?
                  <>
                     <Form.Label>O fim do intervalo</Form.Label>
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
            Submit
         </Button>

      </>
   )
}

export default ByThePatient;