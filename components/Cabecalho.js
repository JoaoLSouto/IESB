import Image from 'next/image'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Cabecalho = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">
            <Image
              alt=""
              src="/logo_iesb.png"
              width="100"
              height="100"
              className="d-inline-block align-center"
            />{' '}
            Alunos IESB
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="/cursos">Cadastro de cursos</Nav.Link>
            <Nav.Link href="/materias">Cadastro de matérias</Nav.Link>
            <Nav.Link href="/alunos">Cadastro de alunos</Nav.Link>
            <Nav.Link href="/representantes">Candidatar a representante</Nav.Link>
            <Nav.Link href="/monitores">Inscrição para monitoria</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Cabecalho