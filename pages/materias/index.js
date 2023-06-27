import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Container, Table} from 'react-bootstrap'
import {FiEdit3} from 'react-icons/fi'
import {TbTrashOff} from 'react-icons/tb'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import Rodape from '@/components/Rodape';

const index = () => {

    const [materias, setMaterias] = useState([])

    useEffect(() => {
        setMaterias(getAll())
    }, [])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('materias')) || []
    }

    function excluir(id) {

        if (confirm('Deseja excluir a matéria?')) {
            const itens = getAll()
            itens.splice(id, 1)
            window.localStorage.setItem('materias', JSON.stringify(itens))
            setMaterias(itens)
        }
    }
    
    return (
        <section>
            <Cabecalho />
            <Container>

                <Link href="/materias/form" className=' mt-3 mb-5 btn btn-danger'>
                    Novo 
                </Link>

                <Table striped bordered hover variant="danger">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome da matéria</th>
                        <th>Curso</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/materias/' + i}>
                                    <FiEdit3 /> 
                                </Link>
                                {' '}
                                <TbTrashOff onClick={() => excluir(i)}/>
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.curso}</td>
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
