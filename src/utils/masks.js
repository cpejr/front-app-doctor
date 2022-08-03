export const apenasLetras = (value) => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};
export const cpf = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };
  
  export const telefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };
  export const apenasNumeros = (value) => {
    return value.replace(/\D/g, "");
  };
  export const apenasNumerosCpfTel = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{11})(\d)/, "$1");
  };
  export const apenasNumerosCep = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{8})(\d)/, "$1");
  };