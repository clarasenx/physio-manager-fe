export function getFormatedDate(date?: Date | string, withTime?: boolean) {
  if (date) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...(withTime ? {hour: '2-digit', minute: '2-digit'} : {})
    })
  }
  return '-'
}