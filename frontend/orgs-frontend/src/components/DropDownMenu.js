import React from 'react';
import './DropDownMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { logoutSession } from '../slices/sessionSlice'; // Import logoutSession action
import { logout } from '../auth'; // Import the logout function
// import { clearCart, saveCart } from '../slices/cartSlice'; // Import clearCart and saveCart actions

function DropdownMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
//   const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state
  const user = useSelector((state) => state.session.user); // Get user from Redux state

  const handleLogout = async () => {
    console.log('Logout button clicked');
    if (user) {
      console.log('Saving cart data for user:', user.username);
    //   await dispatch(saveCart({ userId: user.id, cartItems })); // Save cart data to backend
    }
    logout(); // Clear tokens from localStorage
    dispatch(logoutSession()); // Clear session data from Redux state
    // dispatch(clearCart()); // Clear cart data from Redux state
    navigate('/Login'); // Redirect to the login page
  };

  return (
    <ul className="dropdown-menu">
      <li><Link to="/">Homepage</Link></li>
      <li><Link to="/Login">Login</Link></li>
      <li><Link to="/Register">Register</Link></li>
      <li><Link to="/Cart">Cart</Link></li>
      <li><Link to="/Checkout">Checkout</Link></li>
      <li><Link to="/CheckoutPage">CheckoutPage</Link></li>  
      <li><Link to="/">Contact Us</Link></li>
      {/* <li><a onClick={handleLogout}>Logout</a></li> Logout button */}
      <li>
  <button type="button" onClick={handleLogout} className="logout-link">
    Logout
  </button>
</li>

    </ul>
  );
}

export default DropdownMenu;