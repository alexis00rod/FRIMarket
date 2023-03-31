import { Accordion } from "./Accordion/Accordion"
import { App } from "./App/App"
import { CartProduct } from "./CartProduct/CartProduct"
import { Footer } from "./Footer/Footer"
import { Loader } from "./Loader/Loader"
import { PostBrand } from "./PostBrand/PostBrand"
import { PostType } from "./PostType/PostType"
import { ProductModal } from "./ProductModal/ProductModal"
import { PostThumb } from "./PostThumb/PostThumb"
import { PostCategory } from "./PostCategory/PostCategory"
import { PostName } from "./PostName/PostName"
import { PostDescription } from "./PostDescription/PostDescription"
import { PostPrice } from "./PostPrice/PostPrice"
import { PostStock } from "./PostStock/PostStock"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes"
import { Searchbox } from "./Searchbox/Searchbox"
import { ProductsDetailSimilar } from "./ProductDetailSimilar/ProductDetailSimilar"
import { ProductDetailReviews } from "./ProductDetailReviews/ProductDetailReviews"
import { ProfilePosts } from "./ProfilePosts/ProfilePosts"
import { EditProduct } from "./EditProduct/EditProduct"
import { ShopFiltersMenu } from "./ShopFiltersMenu/ShopFiltersMenu"
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
import { Modal } from "./Modal/Modal"
import { DetailImage, DetailTitle, DetailLocation, DetailDate, DetailDescription, DetailUser, DetailCTA } from "./Detail/detail"
import { Reviews, ReviewsSort, ReviewRating, ReviewCard } from "./Reviews/reviews"
import { InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto } from "./Form/form"
import { SellerCard, ProductCard } from "./Card/card"
import { Select, SelectCity, SelectItem, SelectProductsSort, SelectProvince, SelectSearch, SelectSellersSort } from "./Select/select"
import { ProductsList, ProductsLayout } from "./Products/products"

export {
  // Main
  App, Logo, Footer, Accordion, Loader, ProtectedRoutes, Searchbox, Slider, Modal,
  // Navbar
  Navbar, NavbarMenu, CartMenu, UserMenu,
  // Buttons
  Button, BtnShare, BtnAddCart, BtnAddWishlist,
  // Detail
  DetailImage, DetailTitle, DetailLocation, DetailDate, DetailDescription, DetailUser, DetailCTA,
  // Reviews
  Reviews, ReviewsSort, ReviewRating, ReviewCard,
  // Cards
  ProductCard, SellerCard,
  // Select
  Select, SelectItem, SelectProvince, SelectSellersSort, SelectProductsSort, SelectCity, SelectSearch,
  // Products
  ProductsList, ProductsLayout,
  // Form
  InputText, Textarea, InputRating, InputEmail, InputPassword, InputPhoto,
  // Form
  InputDisplayName, InputPhone, InputAddress, InputCP, InputUserID, InputBio,
  // Breadcrumb
  Breadcrumb, BreadcrumbLink,
  // Home
  HomeHero, HomeTabs, HomeSpecialProducts,
  // Shop
  ShopFiltersMenu,
  // Product
  ProductModal,
  // Cart
  CartProduct, 
  // Post
  PostCategory, PostName, PostDescription, PostPrice, PostStock, PostThumb, PostType, PostBrand, 
  // Product details
  ProductsDetailSimilar, ProductDetailReviews, EditProduct,
  // Profile
  ProfileInfo, ProfilePosts,
}
