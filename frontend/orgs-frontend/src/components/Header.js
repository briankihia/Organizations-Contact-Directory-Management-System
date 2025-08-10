// import React, { useState, useEffect } from 'react';
// import './Header.css';
// import DropdownMenu from './DropDownMenu';
// import { useSelector, useDispatch } from 'react-redux';

// function Header() {
//   const dispatch = useDispatch();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { authenticated, user } = useSelector(state => state.session);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   useEffect(() => {
//     // Close the menu when the user logs out
//     if (!authenticated) {
//       setIsMenuOpen(false);
//     }
//   }, [authenticated]);

//   return (
//     <header className="header">
//       <div className="logo">LOGO</div>
//       <div>
//         {authenticated ? (
//           <h1>{user?.username}</h1>
//         ) : (
//           <p>Please login</p>
//         )}
//       </div>
//       <nav className="nav">
//         <button className="menu-button" onClick={toggleMenu}>☰ Menu</button>
//         {isMenuOpen && <DropdownMenu />}
//       </nav>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import './Header.css';
import DropdownMenu from './DropDownMenu'; // Make sure the file name matches exactly
import { useSelector, useDispatch } from 'react-redux';
import { logoutSession } from '../slices/sessionSlice'; // adjust path if needed

function Header() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Since your slice uses "token" instead of "authenticated"
  const { token, user } = useSelector(state => state.session || {});
  const authenticated = Boolean(token);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutSession());
    localStorage.removeItem('access'); // optional if you store token in localStorage
    localStorage.removeItem('role');   // optional if you store role
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!authenticated) {
      setIsMenuOpen(false);
    }
  }, [authenticated]);

  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <div>
        {authenticated ? (
          <h1>{user?.username || 'User'}</h1>
        ) : (
          <p>Please login</p>
        )}
      </div>
      <nav className="nav">
        <button className="menu-button" onClick={toggleMenu}>☰ Menu</button>
        {isMenuOpen && (
          <div>
            <DropdownMenu />
            {authenticated && (
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
