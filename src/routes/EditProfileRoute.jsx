import { Route, Routes } from "react-router-dom"
import { EditProfile,EditProfileAccount,EditProfileCards,EditProfileData, EditProfileLocation } from "../pages"

export const EditProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<EditProfile />} />
      <Route path="/my-data" element={<EditProfileData />} />
      <Route path="/my-account" element={<EditProfileAccount />} />
      <Route path="/my-card" element={<EditProfileCards />} />
      <Route path="/my-location" element={<EditProfileLocation />} />
    </Routes>
  )
}
