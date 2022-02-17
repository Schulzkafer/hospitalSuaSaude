import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({ func, arr }) => {

   return <Button
      className="mx-2"
      variant="secondary"
      onClick={() => func(arr)}
      disabled={!arr || !arr.length ? true : false}
   >Salvar CSV</Button>
}

export default ButtonComponent;