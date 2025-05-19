export function formatPhone(numero?: string): string {
  if(!numero) return 'Telefone não definido'
  const limpo = numero.replace(/\D/g, '');

  if (limpo.length !== 11) {
    return numero;
  }

  return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7)}`;
}