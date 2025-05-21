export function getFormatedDate(date?: Date | string) {
  if (date) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
  return '-'
}