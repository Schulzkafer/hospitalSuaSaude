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
               <Form.Label>O que esta procurando</Form.Label>
            </div>
            <Form.Check
               inline
               label="Indice Cardiaco Valor"
               type="radio"
               checked={intervalObject === "Indice Cardiaco Valor"}
               onChange={() => setIntervalObject("Indice Cardiaco Valor")}
            />
            <Form.Check
               inline
               label="Indice Pulmonar Valor"
               type="radio"
               checked={intervalObject === "Indice Pulmonar Valor"}
               onChange={() => setIntervalObject("Indice Pulmonar Valor")}
            />
         </Form.Group>

         <Form.Group className="mb-3 formGroup" controlId="formCaracteristicaDePaciente">
            <Form.Label>Intervalo inicial do indice</Form.Label>
            <Form.Control
               type="number"
               placeholder="Intervalo inicio"
               value={intervalStart}
               onChange={(e) => setIntervalStart(e.target.value)}
            />

            <Form.Label>Intervalo final do indice</Form.Label>
            <Form.Control
               type="number"
               placeholder="Intervalo final"
               value={intervalFinal}
               onChange={(e) => setIntervalFinal(e.target.value)}
            />
            <Form.Text className="text-muted">
               *Serao mostrados os valores mais recentes
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
            Submit
         </Button>
      </>
   )
}

export default ByRangeOfValues;