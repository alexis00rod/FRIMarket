import { Navigate, Route, Routes } from "react-router-dom"
import { EditProfile,EditProfileAccount,EditProfileCards,EditProfileData,EditProfileLayout, EditProfileLocation } from "../pages"

export const EditProfileRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/editProfile/my-profile' />} />
      <Route path="/" element={<EditProfileLayout />}>
        <Route path="/my-profile" element={<EditProfile />} />
        <Route path="/my-data" element={<EditProfileData />} />
        <Route path="/my-account" element={<EditProfileAccount />} />
        <Route path="/my-card" element={<EditProfileCards />} />
        <Route path="/my-location" element={<EditProfileLocation />} />
      </Route>
    </Routes>
  )
}
