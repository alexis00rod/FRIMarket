import { CartProduct } from "./CartProduct/CartProduct"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { ProductsDetailSimilar } from "./ProductDetailSimilar/ProductDetailSimilar"
import { ProductDetailReviews } from "./ProductDetailReviews/ProductDetailReviews"
import { ProfilePosts } from "./ProfilePosts/ProfilePosts"
import { HomeTabs } from "./HomeTabs/HomeTabs"
import { HomeHero } from "./HomeHero/HomeHero"
import { HomeSpecialProducts } from "./HomeSpecialProducts/HomeSpecialProducts"

import { App } from "./App/App"
import { Navbar, NavbarMenu, CartMenu, UserMenu } from './Navbar/navbar'
import { Button, BtnShare, BtnAddCart, BtnAddWishlist } from './Button/button'
import { Modal, EditProduct, ProductDetail, ShopFilter } from "./Modal/modal"
import { DetailImage, DetailTitle, DetailLocation, DetailDate, DetailDescription, DetailUser, DetailCTA } from "./Detail/detail"
import { Reviews, ReviewsSort, ReviewRating, ReviewCard } from "./Reviews/reviews"
import { InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto, InputNumber, InputSearch, InputProductQty } from "./Form/form"
import { SellerCard, ProductCard, CategoryCard } from "./Card/card"
import { Select, SelectAddItem, SelectCity, SelectItem, SelectProductBrand, SelectProductType, SelectProductsSort, SelectProvince, SelectSearch, SelectSellersSort } from "./Select/select"
import { ProductsList, ProductsLayout } from "./Products/products"
import { PostProductDetail, PostProductLocation, PostProductPrice, PostProductThumb, PostProductUser, PostProductCategory } from "./PostProduct/postProduct"
import { Logo } from "./Logo/Logo"
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb"
import { Accordion } from "./Accordion/Accordion"
import { Slider, Hero, ProductsCategory } from "./Slider/slider"

import { Element, Loader, Main } from './Layout/layout'
import { Footer } from "./Footer/Footer"

export {
  App, Logo, Accordion, Loader, ProtectedRoutes, Element, Main, Footer,
  // Navbar
  Navbar, NavbarMenu, CartMenu, UserMenu,
  // Buttons
  Button, BtnShare, BtnAddCart, BtnAddWishlist,
  // Detail
  DetailImage, DetailTitle, DetailLocation, DetailDate, DetailDescription, DetailUser, DetailCTA,
  // Reviews
  Reviews, ReviewsSort, ReviewRating, ReviewCard,
  // Cards
  ProductCard, SellerCard, CategoryCard,
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
  Slider, Hero, ProductsCategory,
  // Breadcrumb
  Breadcrumb, BreadcrumbLink,
  // Home
  HomeHero, HomeTabs, HomeSpecialProducts,
  // Cart
  CartProduct, 
  // Product details
  ProductsDetailSimilar, ProductDetailReviews,
  // Profile
  ProfileInfo, ProfilePosts,
}
