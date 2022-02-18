import { React } from "react"
import { Container, Nav, Navbar, } from "react-bootstrap";
import "./styles/Nav.css";

const FooterComponent = () => {
   return (
      <Navbar bg="light" expand="lg" className="navbar navbarFooter">
         <Container fluid>
            <Nav.Link href="https://curriculoschulzkafer.herokuapp.com/">Desenvolvedor: Aleksandr K.</Nav.Link>
         </Container>
      </Navbar>
   )
}

export default FooterComponent;