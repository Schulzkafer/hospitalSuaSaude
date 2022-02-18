import React, { useState } from "react"
import { useOutletContext } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const ByRangeOfValues = () => {

   const [intervalObject, setIntervalObject] = useState("Indice Cardiaco Valor");
   const [intervalStart, setIntervalStart] = useState("");
   const [intervalFinal, setIntervalFinal] = useState("");

   const [getNecessaryValues] = useOutletContext();

   return (
      <>
         <Form.Group className="mb-3 formGroup">
            <div>
               <Form.Label>Busca de índice</Form.Label>
            </div>
            <Form.Check
               inline
               label="Valor do índice cardíaco"
               type="radio"
               checked={intervalObject === "Indice Cardiaco Valor"}
               onChange={() => setIntervalObject("Indice Cardiaco Valor")}
            />
            <Form.Check
               inline
               label="Valor do índice pulmonar"
               type="radio"
               checked={intervalObject === "Indice Pulmonar Valor"}
               onChange={() => setIntervalObject("Indice Pulmonar Valor")}
            />
         </Form.Group>

         <Form.Group className="mb-3 formGroup" controlId="formCaracteristicaDePaciente">
            <Form.Label>Intervalo inicial do índice</Form.Label>
            <Form.Control
               type="number"
               placeholder="De 0 até 1"
               value={intervalStart}
               onChange={(e) => setIntervalStart(e.target.value)}
            />

            <Form.Label>Intervalo final do índice</Form.Label>
            <Form.Control
               type="number"
               placeholder="De 0 até 1"
               value={intervalFinal}
               onChange={(e) => setIntervalFinal(e.target.value)}
            />
            <Form.Text className="text-muted">
               *Serão mostrados os valores mais recentes
            </Form.Text>
         </Form.Group>

         <Button
            variant="primary"
            onClick={() => getNecessaryValues(
               "/getNecessaryDataByRangeOfValues",
               {
                  intervalObject,
                  intervalStart,
                  intervalFinal,
               }
            )}>
            Enviar
         </Button>
      </>
   )
}

export default ByRangeOfValues;