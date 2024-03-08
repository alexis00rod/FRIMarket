import { App } from "./App/App"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { ReviewCard } from "./Card/card"
import { Select, SelectAddItem, SelectItem, SelectSearch, SelectReviewsSort } from "./Select/select"
import { Logo } from "./Logo/Logo"
import { Footer } from "./Footer/Footer"

// Inputs
import { InputStock, InputText, Textarea, InputRating, InputEmail, InputPassword, InputNumber, InputCheckbox, InputPrice, InputRadio } from "./Form/form"
// Notification
import { Notification } from "./Notification/Notification"
// Button
import { BtnShare, BtnAddCart, BtnAddWishlist, ButtonLoader, BtnCart } from './Button/button'
// Edit profile
import { EditProfilePhotoURL } from "../pages/EditProfilePage/components/EditProfilePhotoURL"
// Loader
import { Loader } from "./Loader/Loader"
// Profile
import { ProfilePosts } from '../pages/ProfilePage/components/profileComponents'
// Accordion
import { Accordion } from "./Accordion/Accordion"
// Modal
import { Modal } from "./Modal/Modal"
// Cart
import { CartItem } from "../pages/CartPage/components/cartComponents"
// Navbar
import { Navbar, NavbarCart, NavbarMenu, NavbarSearch, NavbarUser } from './Navbar/navbarComponents'
// Home
import { Hero, HomeCategories, HomeFeaturedProducts, HomeOffers, HomeWishlist } from '../pages/HomePage/components/homeComponents'
// Image Magnifier
import { ImageMagnifier } from "./ImageMagnifier/ImageMagnifier"
// Detail
import { DetailTitle, DetailAdditionalInfo, DetailImages, DetailSeller, DetailCategory, DetailReviews, DetailSimiliarProducts } from '../pages/Detail/components/detailComponents'
// Products
import { ProductsList, ProductsLayout, ProductsSort, ProductCard } from "./Products/productsComponents"
// Post
import { PostBrand, PostCategory, PostChangeCategory, PostCondition, PostDescription, PostImages, PostPrice, PostShipping, PostStock, PostTitle, PostType, PostUserEmail, PostUserLocation, PostUserName, PostUserPhone } from "../pages/PostPage/components/postComponents"
// Shop
import { ShopFilter, ShopItemQty, ShopPriceRange } from '../pages/ShopPage/components/shopComponents'
// Registration
import { RegistrationStepItem } from "../pages/RegistrationPage/components/RegistrationStepItem"
// Orders
import { OrderItem, OrdersSort } from "../pages/Orders/components/ordersComponents"
// Edit product
import { EditProductTitle, EditProductImages, EditProductPrice, EditProductDescription, EditProductCondition, EditProductShipping } from "../pages/EditProductPage/components/editProductComponents"

export {
  App, Logo, Loader, ProtectedRoutes, Footer,
  // Cards
  ReviewCard,
  // Select
  Select, SelectItem, SelectSearch, SelectAddItem, SelectReviewsSort,
  // Form
  InputText, Textarea, InputRating, InputEmail, InputPassword, InputNumber, InputCheckbox, InputPrice, InputRadio, InputStock,
  // Edit product
  EditProductTitle, EditProductImages, EditProductPrice, EditProductDescription, EditProductCondition, EditProductShipping,
  // Notification
  Notification,
  // Buttons
  BtnShare, BtnAddCart, BtnAddWishlist, ButtonLoader, BtnCart,
  // Edit profile
  EditProfilePhotoURL,
  // Profile
  ProfilePosts,
  // Orders
  OrderItem, OrdersSort,
  // Accordion
  Accordion,
  // Modal
  Modal,
  // Cart
  CartItem,
  // Navbar
  Navbar, NavbarMenu, NavbarCart, NavbarSearch, NavbarUser,
  // Home
  Hero, HomeCategories, HomeOffers, HomeFeaturedProducts, HomeWishlist,
  // Image Magnifier
  ImageMagnifier,
  // Detail
  DetailTitle, DetailAdditionalInfo, DetailImages, DetailSeller, DetailCategory, DetailReviews, DetailSimiliarProducts,
  // Products
  ProductsList, ProductsLayout, ProductsSort, ProductCard,
  // Post
  PostTitle, PostCategory, PostType, PostImages, PostDescription, PostCondition, PostStock, PostChangeCategory, PostBrand, PostPrice, PostShipping, PostUserName, PostUserEmail, PostUserPhone, PostUserLocation,
  // Shop
  ShopFilter, ShopPriceRange, ShopItemQty,
  // Registration
  RegistrationStepItem
}
