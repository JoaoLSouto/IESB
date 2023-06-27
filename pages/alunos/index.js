import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Container, Table} from 'react-bootstrap'
import {FiEdit3} from 'react-icons/fi'
import {TbTrashOff} from 'react-icons/tb'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import Rodape from '@/components/Rodape';

const index = () => {

    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        setAlunos(getAll())
    }, [])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('alunos')) || []
    }

    function excluir(id) {

        if (confirm('Deseja excluir o aluno?')) {
            const itens = getAll()
            itens.splice(id, 1)
            window.localStorage.setItem('alunos', JSON.stringify(itens))
            setAlunos(itens)
        }
    }
    
    return (
        <section>
            <Cabecalho />
            <Container>

                <Link href="/alunos/form" className=' mt-3 mb-5 btn btn-danger'>
                    Novo 
                </Link>

                <Table striped bordered hover variant="danger">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome do aluno</th>
                        <th>Curso</th>
                        <th>Matrícula</th>
                        <th>Turma</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/alunos/' + i}>
                                    <FiEdit3 /> 
                                </Link>
                                {' '}
                                <TbTrashOff onClick={() => excluir(i)}/>
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.curso}</td>
                            <td>{item.matricula}</td>
                            <td>{item.turma}</td>
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
