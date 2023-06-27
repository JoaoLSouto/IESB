const cursoValidator = {
    nome: {
        required: "Campo obrigatório",
        minLength: {
          value: 3,
          message: 'O mínimo de caracteres é 3'
        },
    
        maxLength: {
          value: 100,
          message: 'O máximo de caracteres é 100'
        }
      },
      
    duracao: {
        required: "Campo obrigatório",
        min: {
          value: 2.5,
          message: 'O mínimo são 2.5 semestres'
        },
        max: {
          value: 10,
          message: 'O máximo são 10 semestres'
        },
    },

    coordenador: {
        required: "Campo obrigatório",
        minLength: {
          value: 5,
          message: 'O mínimo de caracteres é 5'
        },
    
        maxLength: {
          value: 30,
          message: 'O máximo de caracteres é 50'
        },

        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Digite apenas letras!!!'
          },
      },

}

export default cursoValidator