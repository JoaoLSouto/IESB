import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Col, Container, Row, Table} from 'react-bootstrap'
import {FiEdit3} from 'react-icons/fi'
import {TbTrashOff} from 'react-icons/tb'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/router';
import Imagem from '@/components/Imagem';

const index = () => {

    const { query } = useRouter()
    const [monitor, setMonitor] = useState([])
    const [screenshotUrl, setScreenshotUrl] = useState('');

    useEffect(() => {
    
        if (query.id) {
    
          const monitores = JSON.parse(window.localStorage.getItem('monitores'))
          setMonitor(monitores[query.id])
            
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
                <h1 className='text-danger mb-5 mt-5'>Seu comprovante de inscrição</h1>
                <Row>
                    <Col>
                        <h3>Nome do monitor</h3>
                    </Col>
                        <p>{monitor.nome}</p>
                </Row>

                <Row>
                    <Col>
                        <h3>Matrícula do monitor</h3>
                    </Col>
                        <p>{monitor.matricula}</p>
                </Row>

                <Row>
                    <Col>
                        <h3>Matéria</h3>
                    </Col>
                        <p>{monitor.materia}</p>
                </Row>

                <Row>
                    <Col>
                        <h3>Dia e horário</h3>
                    </Col>
                        <p>{monitor.dia}  - {monitor.horario} </p>
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
