import { App } from "./App/App"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { Navbar, NavbarMenu, CartMenu, UserMenu } from './Navbar/navbar'
import { Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow, ButtonLink } from './Button/button'
import { Modal, ProductDetail } from "./Modal/modal"
import { InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty } from "./Form/form"
import { SellerCard, ProductCard, CategoryCard, CartProductCard, ReviewCard } from "./Card/card"
import { Select, SelectAddItem, SelectCity, SelectItem, SelectProductBrand, SelectProductType, SelectProductsSort, SelectProvince, SelectSearch, SelectSellersSort, SelectReviewsSort, SelectOrderSort } from "./Select/select"
import { PostProductDetail, PostProductLocation, PostProductPrice, PostProductThumb, PostProductUser, PostProductCategory } from "./PostProduct/postProduct"
import { Logo } from "./Logo/Logo"
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb"
import { Accordion } from "./Accordion/Accordion"
import { Slider, Hero, CategorySlider, ProductsSlider, SpecialsSlider } from "./Slider/slider"
import { Element, Loader, Main, Menu } from './Layout/layout'
import { Footer } from "./Footer/Footer"
import { CheckoutInformation, CheckoutPayment, CheckoutShipping } from "./Checkout/checkout"
import { EditProfileInfo, EditProfileShipping, ProfileInfo, ProfilePosts } from "./Profile/profile"
import { SignupUser, SignupProfile } from "./Signup/signup"

// Image Magnifier
import { ImageMagnifier } from "./ImageMagnifier/ImageMagnifier"
// Detail
import { DetailTitle, EditProduct, DetailDescription, DetailAdditionalInfo, DetailCTA, DetailImages, DetailPrice, DetailSeller, DetailCategory, DetailReviews, DetailSimiliarProducts } from '../pages/Detail/components/detailComponents'
// Products
import { ProductsList, ProductsLayout, ProductsSort } from "./Products/productsComponents"
// Post
import { PostBrand, PostCategory, PostChangeCategory, PostCondition, PostDescription, PostImages, PostPrice, PostShipping, PostStock, PostTitle, PostType, PostUserEmail, PostUserLocation, PostUserName, PostUserPhone } from "../pages/PostPage/components/postComponents"
// Shop
import { ShopFilter } from '../pages/ShopPage/components/shopComponents'

export {
  App, Logo, Accordion, Loader, ProtectedRoutes, Element, Main, Footer, Menu,
  // Navbar
  Navbar, NavbarMenu, CartMenu, UserMenu,
  // Buttons
  Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow, ButtonLink,
  // Cards
  ProductCard, SellerCard, CategoryCard, CartProductCard, ReviewCard,
  // Select
  Select, SelectItem, SelectProvince, SelectSellersSort, SelectProductsSort, SelectCity, SelectSearch, SelectProductBrand, SelectAddItem, SelectProductType, SelectReviewsSort, SelectOrderSort,
  // Form
  InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty,
  // Post
  PostProductDetail, PostProductLocation, PostProductPrice, PostProductThumb, PostProductUser, PostProductCategory, 
  // Modal
  Modal, ProductDetail,
  // Slider
  Slider, Hero, CategorySlider, ProductsSlider, SpecialsSlider,
  // Breadcrumb
  Breadcrumb, BreadcrumbLink,
  // Profile
  EditProfileInfo, EditProfileShipping, ProfileInfo, ProfilePosts,
  // Checkout
  CheckoutInformation, CheckoutShipping, CheckoutPayment,
  // Signup
  SignupUser, SignupProfile,

  // Image Magnifier
  ImageMagnifier,
  // Detail
  DetailTitle, EditProduct, DetailDescription, DetailAdditionalInfo,  DetailCTA, DetailImages, DetailPrice, DetailSeller, DetailCategory, DetailReviews, DetailSimiliarProducts,
  // Products
  ProductsList, ProductsLayout, ProductsSort,
  // Post
  PostTitle, PostCategory, PostType, PostImages, PostDescription, PostCondition, PostStock, PostChangeCategory, PostBrand, PostPrice, PostShipping, PostUserName, PostUserEmail, PostUserPhone, PostUserLocation,
  // Shop
  ShopFilter
}
