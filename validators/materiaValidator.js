const materiaValidator = {
    nome: {
        required: "Campo obrigatório",
        minLength: {
          value: 3,
          message: 'O mínimo de caracteres é 3'
        },
    
        maxLength: {
          value: 15,
          message: 'O máximo de caracteres é 15'
        }
      },
  

    curso: {
      required: "Campo obrigatório"
    }

}

export default materiaValidator