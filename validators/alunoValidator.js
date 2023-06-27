const alunoValidator = {
  nome: {
      required: "Campo obrigatório",
      minLength: {
        value: 10,
        message: 'O mínimo de caracteres é 10'
      },
  
      maxLength: {
        value: 40,
        message: 'O máximo de caracteres é 40'
      }
    },
    
  matricula: {
    required: "Campo obrigatório",
    minLength: {
      value: 11,
      message: 'O mínimo de caracteres é 11'
    },
    maxLength: {
      value: 11,
      message: 'O máximo de caracteres é 11'
    },
    pattern: {
      value: /^\d+$/,
      message: 'Digite apenas números!!!'
    },
  },
  
  turma: {
    required: "Campo obrigatório",
    minLength: {
      value: 2,
      message: 'O mínimo de caracteres é 2'
    },
    maxLength: {
      value: 50,
      message: 'O máximo de caracteres é 50'
    }
  },

  data_de_aniversario: {
    required: "Campo obrigatório"
  },

  telefone: {
    required: "Campo obrigatório",
    pattern: {
      value: /^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/,
      message: 'Núimero de telefone inválido! (XX) XXXXX-XXXX'
    },
  },

}

export default alunoValidator