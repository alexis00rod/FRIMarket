import { Route, Routes } from "react-router-dom"
import { PostContextProvider } from "../pages/PostPage/context/PostContext"
import { PostProduct, PostCategoryForm, PostDetailsForm, PostSaleForm, PostContactForm, PostConfirm } from "../pages"

export const PostRoute = () => {
  return (
    <PostContextProvider>
      <Routes>
        <Route index path="/" element={<PostProduct />} />
        <Route path="/category-form" element={<PostCategoryForm />} />
        <Route path="/details-form" element={<PostDetailsForm />} />
        <Route path="/sale-form" element={<PostSaleForm />} />
        <Route path="/contact-form" element={<PostContactForm />} />
        <Route path="/confirm/:idPost" element={<PostConfirm />} />
      </Routes>
    </PostContextProvider>
  )
}
