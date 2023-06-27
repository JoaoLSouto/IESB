import React, { useEffect, useState } from 'react'
import {Button, Container, Form } from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { mask } from 'remask'
import materiaValidator from '@/validators/materiaValidator'
import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import { BiCommentError } from 'react-icons/bi';


const form = () => {

    const {push} = useRouter()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        const cursosLocalStorage = JSON.parse(window.localStorage.getItem('cursos') || [])
        setCursos(cursosLocalStorage)
    })

    function salvar(dados) {
        const materias = JSON.parse(window.localStorage.getItem('materias')) || []
        materias.push(dados)
        window.localStorage.setItem('materias', JSON.stringify(materias))
        push('/materias')
    }

    return (
        <>

            <Cabecalho />


            <Container>

                <h1 className='mt-4 text-danger'>Cadastre uma matéria</h1>

                <Form className='mt-3 center'>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome da matéria:</Form.Label>
                        <Form.Control type="text" {...register('nome', materiaValidator.nome)}/>
                        {
                            errors.nome && 
                            <span className='text-danger'> { errors.nome.message } <BiCommentError />  </span>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="curso">
                        <Form.Label>Escolha o curso:</Form.Label>
                        <Form.Select size="lg" {...register('curso', materiaValidator.curso)}>
                            <option disabled>Escolha</option>
                            {cursos.map((item) => (
                                <option>
                                    {item.nome} 
                                </option>
                            ))} 
                        </Form.Select>
                        {
                            errors.curso && 
                            <span className='text-danger'> { errors.curso.message } <BiCommentError />  </span>
                        }
                    </Form.Group>
                                    
                    <div className='text-center'>
                        <Button variant="outline-danger" onClick={handleSubmit(salvar)}>
                            Salvar
                        </Button>
                    </div>
                </Form>

            </Container>
            <Rodape />
        </>
    )
}

export default form
