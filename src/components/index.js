import { Accordion } from "./Accordion/Accordion"
import { App } from "./App/App"
import { CartProduct } from "./CartProduct/CartProduct"
import { Footer } from "./Footer/Footer"
import { Loader } from "./Loader/Loader"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { ProductsDetailSimilar } from "./ProductDetailSimilar/ProductDetailSimilar"
import { ProductDetailReviews } from "./ProductDetailReviews/ProductDetailReviews"
import { ProfilePosts } from "./ProfilePosts/ProfilePosts"
import { HomeTabs } from "./HomeTabs/HomeTabs"
import { HomeHero } from "./HomeHero/HomeHero"
import { HomeSpecialProducts } from "./HomeSpecialProducts/HomeSpecialProducts"
import { Logo } from "./Logo/Logo"
import { Slider } from "./Slider/Slider"
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb"
import { InputDisplayName } from "./InputDisplayName/InputDisplayName"
import { InputPhone } from "./InputPhone/InputPhone"
import { InputAddress } from "./InputAddress/InputAddress"
import { InputCP } from "./InputCP/InputCP"
import { InputUserID } from "./InputUserID/InputUserID"
import { InputBio } from "./InputBio/InputBio"

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

export {
  // Main
  App, Logo, Footer, Accordion, Loader, ProtectedRoutes, Slider, 
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

  // Form
  InputDisplayName, InputPhone, InputAddress, InputCP, InputUserID, InputBio,
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
