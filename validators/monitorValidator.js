const monitorValidator = {
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
      value: 8,
      message: 'O mínimo de caracteres é 8'
    },
    maxLength: {
      value: 8,
      message: 'O máximo de caracteres é 8'
    }
  },

  materia: {
    required: "Campo obrigatório", 
  },

  horario: {
    required: "Campo obrigatório", 
  },

  dia: {
    required: "Campo obrigatório", 
  },

  indicacao: {
    required: "Campo obrigatório", 
  },

}

export default monitorValidator