import { React } from "react"
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./styles/Nav.css"

const HeaderComponent = () => {

   const links = [
      { url: "/search/byThePatient", text: "pelo paciente e o dia" },
      { url: "/search/byRangeOfValues", text: "por intervalo de valores" },
      { url: "/byPartOfName", text: "por parte do nome" },
      { url: "/byDay", text: "por dia" },
   ];

   return (
      <Navbar bg="light" expand="sm" className="navbar">
         <Container fluid>
            <Navbar.Brand href="/">Escolhe sua busca:</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
               >
                  {
                     links.map(l => {
                        return (
                           <NavLink
                              key={l.url}
                              to={l.url}
                              style={({ isActive }) => ({ color: isActive ? "green" : "#01304E" })}
                           >{l.text}
                           </NavLink>
                        )
                     })
                  }
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default HeaderComponent;