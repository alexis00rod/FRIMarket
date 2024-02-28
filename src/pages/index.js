import { EditProfile } from "./EditProfile/EditProfile";
import { Login } from "./Login/Login";
import { Detail } from "./Detail/Detail";
import { Profile } from "./Profile/Profile";
import { Orders } from "./Orders/Orders";
import { EnterPass } from "./Login/EnterPass";

// Wishlist
import { Wishlist } from "./WishlistPage/Wishlist";
// Checkout
import { Checkout, CheckoutConfirm, CheckoutOrder, CheckoutPayment, CheckoutShipping, CheckoutUser } from "./CheckoutPage/checkout";
// Cart
import { Cart } from "./CartPage/Cart";
// Search
import { Search } from "./SearchPage/Search";
// Home
import { Home } from "./HomePage/Home";
// Registration
import { RegistrationSteps, RegistrationEmail, RegistrationName, RegistrationPassword } from "./RegistrationPage/registration";
// Post
import { PostProduct, PostCategoryForm, PostDetailsForm, PostSaleForm, PostContactForm, } from "./PostPage/post";
// Shop
import { Shop } from "./ShopPage/Shop";

export {
  Detail,
  Profile,
  EditProfile,
  Orders,
  
  // Wishlist
  Wishlist,
  // Checkout
  Checkout, CheckoutShipping, CheckoutUser, CheckoutPayment, CheckoutConfirm, CheckoutOrder,
  // Cart
  Cart,
  // Search
  Search,
  // Home
  Home,
  // Shop
  Shop,
  // Post
  PostProduct, PostCategoryForm, PostDetailsForm, PostSaleForm, PostContactForm,
  // Registration
  RegistrationSteps, RegistrationEmail, RegistrationName, RegistrationPassword,
  // Login
  Login, EnterPass
}