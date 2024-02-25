import { App } from "./App/App"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow, ButtonLink } from './Button/button'
import { Modal, ProductDetail } from "./Modal/modal"
import { InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty } from "./Form/form"
import { ProductCard, CategoryCard, CartProductCard, ReviewCard } from "./Card/card"
import { Select, SelectAddItem, SelectCity, SelectItem, SelectProductBrand, SelectProductType, SelectProductsSort, SelectProvince, SelectSearch, SelectReviewsSort, SelectOrderSort } from "./Select/select"
import { Logo } from "./Logo/Logo"
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb"
import { Accordion } from "./Accordion/Accordion"
import { Slider } from "./Slider/slider"
import { Element, Loader, Main, Menu } from './Layout/layout'
import { Footer } from "./Footer/Footer"
import { CheckoutInformation, CheckoutPayment, CheckoutShipping } from "./Checkout/checkout"
import { EditProfileInfo, EditProfileShipping, ProfileInfo, ProfilePosts } from "./Profile/profile"

// Navbar
import { Navbar, NavbarCart, NavbarMenu, NavbarSearch } from './Navbar/navbarComponents'
// Home
import { Hero, HomeCategories, HomeOffers } from '../pages/HomePage/components/homeComponents'
// Image Magnifier
import { ImageMagnifier } from "./ImageMagnifier/ImageMagnifier"
// Detail
import { DetailTitle, EditProduct, DetailDescription, DetailAdditionalInfo, DetailImages, DetailPrice, DetailSeller, DetailCategory, DetailReviews, DetailSimiliarProducts, DetailAddToCart, DetailAddToWishlist, DetailShare } from '../pages/Detail/components/detailComponents'
// Products
import { ProductsList, ProductsLayout, ProductsSort } from "./Products/productsComponents"
// Post
import { PostBrand, PostCategory, PostChangeCategory, PostCondition, PostDescription, PostImages, PostPrice, PostShipping, PostStock, PostTitle, PostType, PostUserEmail, PostUserLocation, PostUserName, PostUserPhone } from "../pages/PostPage/components/postComponents"
// Shop
import { ShopFilter } from '../pages/ShopPage/components/shopComponents'
// Registration
import { RegistrationStepItem } from "../pages/RegistrationPage/components/RegistrationStepItem"

export {
  App, Logo, Accordion, Loader, ProtectedRoutes, Element, Main, Footer, Menu,
  // Buttons
  Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow, ButtonLink,
  // Cards
  ProductCard, CategoryCard, CartProductCard, ReviewCard,
  // Select
  Select, SelectItem, SelectProvince, SelectProductsSort, SelectCity, SelectSearch, SelectProductBrand, SelectAddItem, SelectProductType, SelectReviewsSort, SelectOrderSort,
  // Form
  InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty,
  // Modal
  Modal, ProductDetail,
  // Slider
  Slider,
  // Breadcrumb
  Breadcrumb, BreadcrumbLink,
  // Profile
  EditProfileInfo, EditProfileShipping, ProfileInfo, ProfilePosts,
  // Checkout
  CheckoutInformation, CheckoutShipping, CheckoutPayment,

  // Navbar
  Navbar, NavbarMenu, NavbarCart, NavbarSearch,
  // Home
  Hero, HomeCategories, HomeOffers,
  // Image Magnifier
  ImageMagnifier,
  // Detail
  DetailTitle, EditProduct, DetailDescription, DetailAdditionalInfo, DetailImages, DetailPrice, DetailSeller, DetailCategory, DetailReviews, DetailSimiliarProducts, DetailAddToCart, DetailAddToWishlist, DetailShare,
  // Products
  ProductsList, ProductsLayout, ProductsSort,
  // Post
  PostTitle, PostCategory, PostType, PostImages, PostDescription, PostCondition, PostStock, PostChangeCategory, PostBrand, PostPrice, PostShipping, PostUserName, PostUserEmail, PostUserPhone, PostUserLocation,
  // Shop
  ShopFilter,
  // Registration
  RegistrationStepItem
}
