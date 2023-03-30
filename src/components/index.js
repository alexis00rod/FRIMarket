import { Accordion } from "./Accordion/Accordion";
import { App } from "./App/App";
import { CartProduct } from "./CartProduct/CartProduct";
import { Footer } from "./Footer/Footer";
import { Loader } from "./Loader/Loader";
import { PostBrand } from "./PostBrand/PostBrand";
import { PostType } from "./PostType/PostType";
import { ProductCard } from "./ProductCard/ProductCard";
import { ProductModal } from "./ProductModal/ProductModal";
import { ProductsLayout } from "./ProductsLayout/ProductsLayout";
import { PostThumb } from "./PostThumb/PostThumb";
import { PostCategory } from "./PostCategory/PostCategory";
import { PostName } from "./PostName/PostName";
import { PostDescription } from "./PostDescription/PostDescription";
import { PostPrice } from "./PostPrice/PostPrice";
import { PostStock } from "./PostStock/PostStock";
import { SignupName } from "./SignupName/SignupName";
import { SignupEmail } from "./SignupEmail/SignupEmail";
import { SignupPass } from "./SignupPass/SignupPass";
import { LoginEmail } from "./LoginEmail/LoginEmail";
import { LoginPass } from "./LoginPass/LoginPass";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { SignupUserID } from "./SignupUserID/SignupUserID";
import { SignupPhoto } from "./SignupPhoto/SignupPhoto";
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes";
import { Searchbox } from "./Searchbox/Searchbox";
import { ProductsDetailSimilar } from "./ProductDetailSimilar/ProductDetailSimilar";
import { ProductDetailReviews } from "./ProductDetailReviews/ProductDetailReviews";
import { ProfilePosts } from "./ProfilePosts/ProfilePosts";
import { SellerCard } from "./SellerCard/SellerCard";
import { EditProduct } from "./EditProduct/EditProduct";
import { SignupLocation } from "./SignupLocation/SignupLocation";
import { ShopFiltersMenu } from "./ShopFiltersMenu/ShopFiltersMenu";
import { SellersLocations } from "./SellersLocation/SellersLocations";
import { SellersSort } from "./SellersSort/SellersSort";
import { ProductsSort } from "./ProductsSort/ProductsSort";
import { HomeTabs } from "./HomeTabs/HomeTabs";
import { HomeHero } from "./HomeHero/HomeHero";
import { HomeSpecialProducts } from "./HomeSpecialProducts/HomeSpecialProducts";
import { Logo } from "./Logo/Logo";
import { ProductsList } from "./ProductsList/ProductsList";
import { Slider } from "./Slider/Slider";
import { Breadcrumb, BreadcrumbLink } from "./Breadcrumb/Breadcrumb";
import { SelectProvince } from "./SelectProvince/SelectProvince";
import { SelectCity } from "./SelectCity/SelectCity";
import { InputDisplayName } from "./InputDisplayName/InputDisplayName";
import { InputEmail } from "./InputEmail/InputEmail";
import { InputPhone } from "./InputPhone/InputPhone";
import { InputAddress } from "./InputAddress/InputAddress";
import { InputCP } from "./InputCP/InputCP";
import { InputUserID } from "./InputUserID/InputUserID";
import { InputBio } from "./InputBio/InputBio";
import { InputPhoto } from "./InputPhoto/InputPhoto";

import { Navbar, NavbarMenu, CartMenu, UserMenu } from './Navbar/navbar'
import { Button, BtnShare, BtnAddCart, BtnAddWishlist } from './Button/button'
import { Modal } from "./Modal/Modal";
import { DetailImage, DetailTitle, DetailLocation, DetailDate, DetailDescription, DetailUser, DetailCTA } from "./Detail/detail";
import { Reviews, ReviewsSort, ReviewRating, ReviewCard } from "./Reviews/reviews";
import { InputText, Textarea, InputRating } from "./Form/form";

export {
  // Main
  App, Logo, Footer, Accordion, Loader, ProtectedRoutes, Searchbox, Slider, Modal,
  // Navbar
  Navbar, NavbarMenu, CartMenu, UserMenu,
  // Button
  Button, BtnShare, BtnAddCart, BtnAddWishlist,
  // Detail
  DetailImage, DetailTitle, DetailLocation, DetailDate, DetailDescription, DetailUser, DetailCTA,
  // Reviews
  Reviews, ReviewsSort, ReviewRating, ReviewCard,
  // Form
  InputText, Textarea, InputRating,
  // Form
  InputDisplayName, InputEmail, InputPhone, InputAddress, InputCP, InputUserID, InputBio, InputPhoto,
  // Select
  SelectProvince, SelectCity,
  // Breadcrumb
  Breadcrumb, BreadcrumbLink,
  // Home
  HomeHero, HomeTabs, HomeSpecialProducts,
  // Shop
  ShopFiltersMenu,
  // Product
  ProductsLayout, ProductCard, ProductModal, ProductsSort, ProductsList,
  // Cart
  CartProduct, 
  // Post
  PostCategory, PostName, PostDescription, PostPrice, PostStock, PostThumb, PostType, PostBrand, 
  // Product details
  ProductsDetailSimilar, ProductDetailReviews, EditProduct,
  // Sellers
  SellerCard, SellersLocations, SellersSort,
  // Profile
  ProfileInfo, ProfilePosts,
  // Signup
  SignupUserID, SignupName, SignupPhoto, SignupEmail, SignupPass, SignupLocation,
  // Login
  LoginEmail, LoginPass,
}
