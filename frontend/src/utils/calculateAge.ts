export function calculateAge(birthdate?: Date | string): number | string {

  if(!birthdate) return 'Indefinido'

  const birth = new Date(birthdate)
  const today = new Date()

  let age = today.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())

  if (!hasHadBirthdayThisYear) {
    age -= 1
  }

  return age
}