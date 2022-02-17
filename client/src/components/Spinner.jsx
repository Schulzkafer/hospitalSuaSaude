import React from "react";
import { Spinner } from "react-bootstrap";
import "./styles/Spinner.css";

const SpinnerComponent = () => {
   return (
      <Spinner animation="border" variant="warning" id="spinner" />
   )
}

export default SpinnerComponent;