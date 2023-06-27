import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import {Container, Table} from 'react-bootstrap'
import {FiEdit3} from 'react-icons/fi'
import {TbTrashOff} from 'react-icons/tb'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '@/components/Cabecalho';
import Rodape from '@/components/Rodape';

const index = () => {

    const [candidatos_representantes, setAlunos] = useState([])

    useEffect(() => {
        setAlunos(getAll())
    }, [])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('candidatos_representantes')) || []
    }

    function excluir(id) {

        if (confirm('Deseja excluir o candidato?')) {
            const itens = getAll()
            itens.splice(id, 1)
            window.localStorage.setItem('candidatos_representantes', JSON.stringify(itens))
            setAlunos(itens)
        }
    }
    
    return (
        <section>
            <Cabecalho />
            <Container>

                <Link href="/representantes/form" className=' mt-3 mb-5 btn btn-danger'>
                    Novo 
                </Link>

                <Table striped bordered hover variant="danger">
                <thead>
                    <tr>
                        <th></th>
                        <th>Turma</th>
                        <th>Nome do aluno</th>
                        <th>Matricula</th>
                        <th>Nome do vice</th>
                        <th>Matricula do vice</th>
                    </tr>
                </thead>
                <tbody>
                    {candidatos_representantes.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <Link href={'/representantes/' + i}>
                                    <FiEdit3 /> 
                                </Link>
                                {' '}
                                <TbTrashOff onClick={() => excluir(i)}/>
                                <Link href={'/representantes/espelho/' + i}>
                                   Comprovante
                                </Link>
                            </td>
                            <td>{item.turma}</td>
                            <td>{item.nome}</td>
                            <td>{item.matricula}</td>
                            <td>{item.nome_vice}</td>
                            <td>{item.matricula_vice}</td>
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
