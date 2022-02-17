import { React } from "react"
import { Container, Navbar, } from "react-bootstrap";

import "./styles/Nav.css";
import "./styles/Footer.css"

const FooterComponent = () => {
   return (
      <Navbar bg="light" expand="lg" className="navbar" id="footer">
         <Container fluid>
            <Navbar.Brand href="https://curriculoschulzkafer.herokuapp.com/">Developer: Aleksandr K.</Navbar.Brand>
         </Container>
      </Navbar>
   )
}

export default FooterComponent;