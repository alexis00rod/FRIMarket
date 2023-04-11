import { App } from "./App/App"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { Navbar, NavbarMenu, CartMenu, UserMenu } from './Navbar/navbar'
import { Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow, ButtonLink } from './Button/button'
import { Modal, EditProduct, ProductDetail, ShopFilter } from "./Modal/modal"
import { DetailImage, DetailTitle, DetailLocation, DetailDescription, DetailCTA, DetailCategory } from "./Detail/detail"
import { Reviews, ReviewRating } from "./Reviews/reviews"
import { InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty } from "./Form/form"
import { SellerCard, ProductCard, CategoryCard, CartProductCard, ReviewCard } from "./Card/card"
import { Select, SelectAddItem, SelectCity, SelectItem, SelectProductBrand, SelectProductType, SelectProductsSort, SelectProvince, SelectSearch, SelectSellersSort, SelectReviewsSort } from "./Select/select"
import { ProductsList, ProductsLayout } from "./Products/products"
import { PostProductDetail, PostProductLocation, PostProductPrice, PostProductThumb, PostProductUser, PostProductCategory } from "./PostProduct/postProduct"
import { Logo } from "./Logo/Logo"
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb"
import { Accordion } from "./Accordion/Accordion"
import { Slider, Hero, CategorySlider, ProductsSlider, SpecialsSlider, SimilarSlider } from "./Slider/slider"
import { Element, Loader, Main, Menu } from './Layout/layout'
import { Footer } from "./Footer/Footer"
import { CheckoutInformation, CheckoutPayment, CheckoutShipping } from "./Checkout/checkout"
import { EditProfileInfo, EditProfileShipping, ProfileInfo, ProfilePosts } from "./Profile/profile"
import { SignupUser, SignupProfile } from "./Signup/signup"

export {
  App, Logo, Accordion, Loader, ProtectedRoutes, Element, Main, Footer, Menu,
  // Navbar
  Navbar, NavbarMenu, CartMenu, UserMenu,
  // Buttons
  Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow, ButtonLink,
  // Detail
  DetailImage, DetailTitle, DetailLocation, DetailDescription, DetailCTA, DetailCategory,
  // Reviews
  Reviews, ReviewRating,
  // Cards
  ProductCard, SellerCard, CategoryCard, CartProductCard, ReviewCard,
  // Select
  Select, SelectItem, SelectProvince, SelectSellersSort, SelectProductsSort, SelectCity, SelectSearch, SelectProductBrand, SelectAddItem, SelectProductType, SelectReviewsSort,
  // Products
  ProductsList, ProductsLayout,
  // Form
  InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty,
  // Post
  PostProductDetail, PostProductLocation, PostProductPrice, PostProductThumb, PostProductUser, PostProductCategory,
  // Modal
  Modal, EditProduct, ProductDetail, ShopFilter,
  // Slider
  Slider, Hero, CategorySlider, ProductsSlider, SpecialsSlider, SimilarSlider,
  // Breadcrumb
  Breadcrumb, BreadcrumbLink,
  // Profile
  EditProfileInfo, EditProfileShipping, ProfileInfo, ProfilePosts,
  // Checkout
  CheckoutInformation, CheckoutShipping, CheckoutPayment,
  // Signup
  SignupUser, SignupProfile,
}
