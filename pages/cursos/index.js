import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Container, Table} from 'react-bootstrap'
import {FiEdit3} from 'react-icons/fi'
import {TbTrashOff} from 'react-icons/tb'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import Rodape from '@/components/Rodape';

const index = () => {

    const [cursos, setCursos] = useState([])

    useEffect(() => {
        setCursos(getAll())
    }, [])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('cursos')) || []
    }

    function excluir(id) {

        if (confirm('Deseja excluir o curso?')) {
            const itens = getAll()
            itens.splice(id, 1)
            window.localStorage.setItem('cursos', JSON.stringify(itens))
            setCursos(itens)
        }
    }
    
    return (
        <section>
            <Cabecalho />
            <Container>

                <Link href="/cursos/form" className=' mt-3 mb-5 btn btn-danger'>
                    Novo 
                </Link>

                <Table striped bordered hover variant="danger">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome do curso</th>
                        <th>Coordenador</th>
                    </tr>
                </thead>
                <tbody>
                    {cursos.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/cursos/' + i}>
                                    <FiEdit3 /> 
                                </Link>
                                {' '}
                                <TbTrashOff onClick={() => excluir(i)}/>
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.coordenador}</td>
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
