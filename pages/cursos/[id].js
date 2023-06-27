import React, {useEffect, useState} from 'react'
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import Link from 'next/link'
import cursoValidator from '@/validators/cursoValidator'
import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import { BiCommentError } from 'react-icons/bi';

const form = () => {

  const { push, query } = useRouter()
  const {register, handleSubmit, formState: { errors }, setValue} = useForm()

  useEffect(() => {
    
    if (query.id) {

      const cursos = JSON.parse(window.localStorage.getItem('cursos'))
      const curso = cursos[query.id]

      for(let atributo in curso){
        setValue(atributo, curso[atributo]) 
      }
    }

  }, [query.id])

  function salvar(dados) {
    const cursos = JSON.parse(window.localStorage.getItem('cursos')) || []
    cursos.splice(query.id, 1, dados)
    window.localStorage.setItem('cursos', JSON.stringify(cursos))
    push('/cursos')
  }

  return (
    <>

        <Cabecalho />


        <Container>

        <h1 className='mt-4 text-danger'>Cadastre um curso</h1>

        <Form className='mt-3 center'>
            <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome do curso:
                </Form.Label>
                <Form.Control type="text" {...register('nome', cursoValidator.nome)}/>
                {
                    errors.nome && 
                    <span className='text-danger'> { errors.nome.message } <BiCommentError />  </span>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="duracao">
                <Form.Label>Duração do curso (em semestres):
                </Form.Label>
                <Form.Control type="number" {...register('duracao', cursoValidator.duracao)}/>
                {
                    errors.duracao && 
                    <span className='text-danger'> { errors.duracao.message } <BiCommentError />  </span>
                }
            </Form.Group>

            <Form.Group className="mb-3" controlId="coordenador">
                <Form.Label>Coordenador:
                </Form.Label>
                <Form.Control type="text" {...register('coordenador', cursoValidator.coordenador)}/>
                {
                    errors.coordenador && 
                    <span className='text-danger'> { errors.coordenador.message } <BiCommentError />  </span>
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