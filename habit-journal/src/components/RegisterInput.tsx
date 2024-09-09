import React, { useEffect } from 'react'

interface Props{
    error: string;
    reference:  React.RefObject<HTMLInputElement>;
    placeholder: string;
    password: boolean
}
const RegisterInput = ({error, reference, placeholder, password}: Props) => {
    return (
    <div>
            {error && <p>{error}</p>}
            <input
              className="register-input"
              type={password === true ? "password": "text"}
              name="email"
              placeholder={placeholder}
              ref={reference}
            ></input>
    </div>
  )
}

export default RegisterInput