import React, {useEffect, useState} from 'react'
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import { BiCommentError } from 'react-icons/bi';
import monitorValidator from '@/validators/monitorValidator'
import { mask } from 'remask'

const form = () => {

  const { push, query } = useRouter()
  const {register, handleSubmit, formState: { errors }, setValue} = useForm()
  const [indicacao, setIndicacao] = useState([])
  const [materias, setMaterias] = useState([])

  function handleChange(event) {

      const name = event.target.name
      const valor = event.target.value
      const mascara = event.target.getAttribute('mask')
  
      setValue(name, mask(valor, mascara))
  
  }

  useEffect(() => {
    
    if (query.id) {

      const monitores = JSON.parse(window.localStorage.getItem('monitores'))
      const monitor = monitores[query.id]

      for(let atributo in monitor){
        setValue(atributo, monitor[atributo]) 
      }
    }

  }, [query.id])

  useEffect(() => {
    const materiasLocalStorage = JSON.parse(window.localStorage.getItem('materias') || [])
    setMaterias(materiasLocalStorage)
})

  function salvar(dados) {
    const monitores = JSON.parse(window.localStorage.getItem('monitores')) || []
    monitores.splice(query.id, 1, dados)
    window.localStorage.setItem('monitores', JSON.stringify(monitores))
    push('/monitores')
  }

  function salvaIndicacao (e) {
    setIndicacao(e.target.value)
}

  return (
    <>

        <Cabecalho />


        <Container>

        <Form className='mt-3 center'>
        <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome completo:
                        </Form.Label>
                        <Form.Control type="text" {...register('nome', monitorValidator.nome)}/>
                        {
                            errors.nome && 
                            <span className='text-danger'> { errors.nome.message } <BiCommentError />  </span>
                        }
                    </Form.Group>

                <Form.Group className="mb-3" controlId="matricula">
                        <Form.Label>Matrícula:
                        </Form.Label>
                        <Form.Control type="text" {...register('matricula', monitorValidator.matricula)}/>
                        {
                            errors.matricula && 
                            <span className='text-danger'> { errors.matricula.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="turma">
                        <Form.Label>Turma:
                        </Form.Label>
                        <Form.Control type="text" {...register('turma', monitorValidator.turma)}/>
                        {
                            errors.turma && 
                            <span className='text-danger'> { errors.turma.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="materia">
                        <Form.Label>Escolha a matéria que você quer ser monitor:</Form.Label>
                        <Form.Select size="lg" {...register('materia', monitorValidator.materia)}>
                            <option disabled>Escolha</option>
                            {materias.map((item) => (
                                <option>
                                    {item.nome} 
                                </option>
                            ))} 
                        </Form.Select>
                        {
                            errors.materia && 
                            <span className='text-danger'> { errors.materia.message } <BiCommentError />  </span>
                        }
                    </Form.Group>

                <Form.Group className="mb-3" controlId="horario">
                        <Form.Label>Coloque o horário que você está disponível:
                        </Form.Label>
                        <Form.Control type="text" mask='99:99' {...register('horario', monitorValidator.horario)}
                        onChange={handleChange}
                        />
                        {
                            errors.horario && 
                            <span className='text-danger'> { errors.horario.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="dia">
                        <Form.Label>Selecione o dia da semana que você está disponível</Form.Label>
                        <Form.Select {...register('dia', monitorValidator.dia)}>
                            <option disabled>Escolha um dia</option>
                            <option>Segunda-feira</option>
                            <option>Terça-feira</option>
                            <option >Quarta-feira</option>
                            <option >Quinta-feira</option>
                            <option >Sexta-feira</option>
                        </Form.Select>
                </Form.Group>   


                <Form.Group className="mb-3" controlId="indicação">
                        <Form.Label>Você foi indicado por algum professor?</Form.Label>
                        <Form.Select {...register('indicação', monitorValidator.indicação)} onClick={(e) => salvaIndicacao(e)}>
                            <option>Não</option>
                            <option>Sim</option>
                        </Form.Select>
                </Form.Group>                 

                    {
                        indicacao === "Sim"
                        ?
                            <Form.Group className="mb-3" controlId="professor">
                                    <Form.Label>Professor que indicou:
                                    </Form.Label>
                                    <Form.Control type="text" {...register('professor', monitorValidator.professor)}/>
                                    {
                                        errors.professor && 
                                        <span className='text-danger'> { errors.professor.message } <BiCommentError />  </span>
                                    }
                            </Form.Group>
                        :
                        ''
                    }  
                                    
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