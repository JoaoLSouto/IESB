import React, {useEffect, useState} from 'react'
import {Button, Container, Form, InputGroup} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import Cabecalho from '@/components/Cabecalho'
import Rodape from '@/components/Rodape'
import { BiCommentError } from 'react-icons/bi';
import materiaValidator from '@/validators/materiaValidator'
import alunoValidator from '@/validators/alunoValidator'

const form = () => {

  const { push, query } = useRouter()
  const {register, handleSubmit, formState: { errors }, setValue} = useForm()
  const [cursos, setCursos] = useState([])

  function handleChange(event) {

    const name = event.target.name
    const valor = event.target.value
    const mascara = event.target.getAttribute('mask')

    setValue(name, mask(valor, mascara))

  }

  useEffect(() => {
      const cursosLocalStorage = JSON.parse(window.localStorage.getItem('cursos') || [])
      setCursos(cursosLocalStorage)
  })

  useEffect(() => {
    
    if (query.id) {

      const alunos = JSON.parse(window.localStorage.getItem('alunos'))
      const aluno = alunos[query.id]

      for(let atributo in aluno){
        setValue(atributo, aluno[atributo]) 
      }
    }

  }, [query.id])

  function salvar(dados) {
    const alunos = JSON.parse(window.localStorage.getItem('alunos')) || []
    alunos.splice(query.id, 1, dados)
    window.localStorage.setItem('alunos', JSON.stringify(alunos))
    push('/alunos')
  }

  return (
    <>

        <Cabecalho />


        <Container>

        <Form className='mt-3 center'>
        <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome completo:
                        </Form.Label>
                        <Form.Control type="text" {...register('nome', alunoValidator.nome)}/>
                        {
                            errors.nome && 
                            <span className='text-danger'> { errors.nome.message } <BiCommentError />  </span>
                        }
                    </Form.Group>

                <Form.Group className="mb-3" controlId="matricula">
                        <Form.Label>Matrícula:
                        </Form.Label>
                        <Form.Control type="text" {...register('matricula', alunoValidator.matricula)}/>
                        {
                            errors.matricula && 
                            <span className='text-danger'> { errors.matricula.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="turma">
                        <Form.Label>Turma:
                        </Form.Label>
                        <Form.Control type="text" {...register('turma', alunoValidator.turma)}/>
                        {
                            errors.turma && 
                            <span className='text-danger'> { errors.turma.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="data_de_aniversario">
                        <Form.Label>Data de nascimento:
                        </Form.Label>
                        <Form.Control type="text" mask='99/99/9999' {...register('data_de_aniversario', alunoValidator.data_de_aniversario)}
                        onChange={handleChange}
                        />
                        {
                            errors.data_de_aniversario && 
                            <span className='text-danger'> { errors.data_de_aniversario.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone atualizado:
                        </Form.Label>
                        <Form.Control type="text"  mask='(99) 99999-9999' {...register('telefone', alunoValidator.telefone)} onChange={handleChange}/>
                        {
                            errors.telefone && 
                            <span className='text-danger'> { errors.telefone.message } <BiCommentError />  </span>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="curso">
                        <Form.Label>Escolha o curso:</Form.Label>
                        <Form.Select size="lg" {...register('curso', alunoValidator.curso)}>
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