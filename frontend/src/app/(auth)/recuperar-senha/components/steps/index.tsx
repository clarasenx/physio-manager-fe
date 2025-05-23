'use client'

import { useState } from "react"
import { EmailForm } from "../emailForm"
import { PasswordForm } from "../passwordForm"

export const Steps = () => {

  const [email, setEmail] = useState<string>()

  return (
    <>
      {
        !email ?
          <EmailForm setEmail={setEmail} /> :
          <PasswordForm email={email} />
      }
    </>
  )
}