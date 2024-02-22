import { Route, Routes } from 'react-router-dom'
import { RegistrationSteps, RegistrationEmail, RegistrationName, RegistrationPassword } from '../pages'
import { RegistrationContextProvider } from '../pages/RegistrationPage/context/RegistrationContext'

export const RegistrationRoute = () => {
  return (
    <RegistrationContextProvider>
      <Routes>
        <Route path="/" element={<RegistrationSteps />} />
        <Route path="/email-validation" element={<RegistrationEmail />} />
        <Route path="/name-validation" element={<RegistrationName />} />
        <Route path="/password-validation" element={<RegistrationPassword />} />
      </Routes>
    </RegistrationContextProvider>
  )
}
