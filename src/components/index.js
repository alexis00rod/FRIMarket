import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { ProfilePosts } from "./ProfilePosts/ProfilePosts"

import { App } from "./App/App"
import { Navbar, NavbarMenu, CartMenu, UserMenu } from './Navbar/navbar'
import { Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow } from './Button/button'
import { Modal, EditProduct, ProductDetail, ShopFilter } from "./Modal/modal"
import { DetailImage, DetailTitle, DetailLocation, DetailDescription, DetailUser, DetailCTA, DetailCategory } from "./Detail/detail"
import { Reviews, ReviewsSort, ReviewRating, ReviewCard } from "./Reviews/reviews"
import { InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty } from "./Form/form"
import { SellerCard, ProductCard, CategoryCard, CartProductCard } from "./Card/card"
import { Select, SelectAddItem, SelectCity, SelectItem, SelectProductBrand, SelectProductType, SelectProductsSort, SelectProvince, SelectSearch, SelectSellersSort } from "./Select/select"
import { ProductsList, ProductsLayout } from "./Products/products"
import { PostProductDetail, PostProductLocation, PostProductPrice, PostProductThumb, PostProductUser, PostProductCategory } from "./PostProduct/postProduct"
import { Logo } from "./Logo/Logo"
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb"
import { Accordion } from "./Accordion/Accordion"
import { Slider, Hero, CategorySlider, ProductsSlider, SpecialsSlider, SimilarSlider } from "./Slider/slider"
import { Element, Loader, Main } from './Layout/layout'
import { Footer } from "./Footer/Footer"

export {
  App, Logo, Accordion, Loader, ProtectedRoutes, Element, Main, Footer,
  // Navbar
  Navbar, NavbarMenu, CartMenu, UserMenu,
  // Buttons
  Button, BtnShare, BtnAddCart, BtnAddWishlist, BtnBuyNow,
  // Detail
  DetailImage, DetailTitle, DetailLocation, DetailDescription, DetailUser, DetailCTA, DetailCategory,
  // Reviews
  Reviews, ReviewsSort, ReviewRating, ReviewCard,
  // Cards
  ProductCard, SellerCard, CategoryCard, CartProductCard,
  // Select
  Select, SelectItem, SelectProvince, SelectSellersSort, SelectProductsSort, SelectCity, SelectSearch, SelectProductBrand, SelectAddItem, SelectProductType,
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
  ProfileInfo, ProfilePosts,
}
