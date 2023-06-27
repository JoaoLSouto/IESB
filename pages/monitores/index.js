import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Container, Table} from 'react-bootstrap'
import {FiEdit3} from 'react-icons/fi'
import {TbTrashOff} from 'react-icons/tb'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import html2canvas from 'html2canvas';
import Rodape from '@/components/Rodape';

const index = () => {

    const [monitores, setMonitores] = useState([])
    const [screenshotUrl, setScreenshotUrl] = useState('');

    useEffect(() => {
        setMonitores(getAll())
    }, [])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('monitores')) || []
    }

    function excluir(id) {

        if (confirm('Deseja excluir o candidato?')) {
            const itens = getAll()
            itens.splice(id, 1)
            window.localStorage.setItem('monitores', JSON.stringify(itens))
            setMonitores(itens)
        }
    }
    
    return (
        <section>
            <Cabecalho />
            <Container>

                <Link href="/monitores/form" className=' mt-3 mb-5 btn btn-danger'>
                    Novo 
                </Link>
                  <Table striped bordered hover variant="danger">
                <thead>
                    <tr>
                        <th></th>
                        <th>Turma</th>
                        <th>Nome do aluno</th>
                        <th>Matricula</th>
                        <th>Matéria</th>
                        <th>Dia</th>
                        <th>Hora</th>
                    </tr>
                </thead>
                <tbody id="screenshot-target">
                    {monitores.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/monitores/' + i}>
                                    <FiEdit3 /> 
                                </Link>
                                {' '}
                                <TbTrashOff onClick={() => excluir(i)}/>
                                <Link href={'/monitores/espelho/' + i}>
                                   Comprovante
                                </Link>
                            </td>
                            <td>{item.turma}</td>
                            <td>{item.nome}</td>
                            <td>{item.matricula}</td>
                            <td>{item.materia}</td>
                            <td>{item.dia}</td>
                            <td>{item.horario}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
            <Rodape />
        </section>
    )
}

export default index
