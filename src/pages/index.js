import { Checkout } from "./Checkout/Checkout";
import { EditProfile } from "./EditProfile/EditProfile";
import { Login } from "./Login/Login";
import { Order } from "./Order/Order";
import { Detail } from "./Detail/Detail";
import { Profile } from "./Profile/Profile";
import { Wishlist } from "./Wishlist/Wishlist";
import { Orders } from "./Orders/Orders";
import { EnterPass } from "./Login/EnterPass";

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
  Home,
  Detail,
  Cart,
  Profile,
  Wishlist,
  Checkout,
  EditProfile,
  Order,
  Orders,

  // Cart

  // Search
  Search,
  // Shop
  Shop,
  // Post
  PostProduct, PostCategoryForm, PostDetailsForm, PostSaleForm, PostContactForm,
  // Registration
  RegistrationSteps, RegistrationEmail, RegistrationName, RegistrationPassword,
  // Login
  Login, EnterPass
}