const ErrroCodes = {
  1001: 'Nombre de la tienda en uso.',
  1002: 'Ya tenes una tienda creada.',
  2001: 'La tienda no tiene configurado Uala Bis.',
  2002: 'Error al generar el checkout.',
}

type ErrorCode = 1001 | 1002;

const getErrorMessage = (errorCode: ErrorCode) => {
  return ErrroCodes[errorCode]
}

export default getErrorMessage