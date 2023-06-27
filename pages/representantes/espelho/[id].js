
import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';

const index = () => {

    const { query } = useRouter()
    const [candidato, setCandidato] = useState([])
    const [screenshotUrl, setScreenshotUrl] = useState('');

    useEffect(() => {
    
        if (query.id) {
    
          const candidatos = JSON.parse(window.localStorage.getItem('candidatos_representantes'))
          console.log(candidatos)
          setCandidato(candidatos[query.id])
            
        }
    
      }, [query.id])

      const handleScreenshot = (id) => {
        console.log(id)
          const element = document.getElementById(id);
          html2canvas(element).then((canvas) => {
              const url = canvas.toDataURL();
              setScreenshotUrl(url);
          }).catch((error) => {
              console.error('Erro ao tirar o print:', error);
          });
      };
  
      const handleDownload = () => {
          const link = document.createElement('a');
          link.href = screenshotUrl;
          link.download = 'screenshot.png';
          link.click();
      };
    

    return (
        <section>
            <Cabecalho/>
            <Container>
            <section id='print'>
                <h1 className='text-danger mb-5 mt-5'>Seu comprovante de inscrição na eleição</h1>
                <Row>
                    <Col>
                        <h3>Nome do candidato</h3>
                    </Col>
                        <p>{candidato.nome}</p>
                </Row>

                <Row>
                    <Col>
                        <h3>Matrícula do candidato</h3>
                    </Col>
                        <p>{candidato.matricula}</p>
                </Row>


                </section>

                <button className='btn btn-danger' onClick={() => handleScreenshot('print')}>Tirar print</button>
                <button className='btn btn-success ms-3' onClick={handleDownload} disabled={!screenshotUrl}>
                    Baixar print
                </button>

            </Container>
        </section>
    )
}

export default index
