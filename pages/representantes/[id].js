import React, {useEffect, useState} from 'react'
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import { BiCommentError } from 'react-icons/bi';
import representantesValidator from '@/validators/representanteValidator'

const form = () => {

  const { push, query } = useRouter()
  const {register, handleSubmit, formState: { errors }, setValue} = useForm()


  useEffect(() => {
    
    if (query.id) {

      const candidatos = JSON.parse(window.localStorage.getItem('candidatos_representantes'))
      const candidatos_representantes = candidatos[query.id]

      for(let atributo in candidatos_representantes){
        setValue(atributo, candidatos_representantes[atributo]) 
      }
    }

  }, [query.id])

  function salvar(dados) {
    const candidatos_representantes = JSON.parse(window.localStorage.getItem('candidatos_representantes')) || []
    candidatos_representantes.splice(query.id, 1, dados)
    window.localStorage.setItem('candidatos_representantes', JSON.stringify(candidatos_representantes))
    push('/representantes')
  }

  return (
    <>

        <Cabecalho />


        <Container>

        <Form className='mt-3 center'>
        <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome completo:
                        </Form.Label>
                        <Form.Control type="text" {...register('nome', representantesValidator.nome)}/>
                        {
                            errors.nome && 
                            <span className='text-danger'> { errors.nome.message } <BiCommentError />  </span>
                        }
                    </Form.Group>

                <Form.Group className="mb-3" controlId="matricula">
                        <Form.Label>Matrícula:
                        </Form.Label>
                        <Form.Control type="text" {...register('matricula', representantesValidator.matricula)}/>
                        {
                            errors.matricula && 
                            <span className='text-danger'> { errors.matricula.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="nome_vice">
                        <Form.Label>Nome completo do vice-representate:
                        </Form.Label>
                        <Form.Control type="text" {...register('nome_vice', representantesValidator.nome_vice)}/>
                        {
                            errors.nome && 
                            <span className='text-danger'> { errors.nome_vice.message } <BiCommentError />  </span>
                        }
                    </Form.Group>

                <Form.Group className="mb-3" controlId="matricula_vice">
                        <Form.Label>Matrícula do vice-representante:
                        </Form.Label>
                        <Form.Control type="text" {...register('matricula_vice', representantesValidator.matricula_vice)}/>
                        {
                            errors.matricula_vice && 
                            <span className='text-danger'> { errors.matricula_vice.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="turma">
                        <Form.Label>Turma:
                        </Form.Label>
                        <Form.Control type="text" {...register('turma', representantesValidator.turma)}/>
                        {
                            errors.turma && 
                            <span className='text-danger'> { errors.turma.message } <BiCommentError />  </span>
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