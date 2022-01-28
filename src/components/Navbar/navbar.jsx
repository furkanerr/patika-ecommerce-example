import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Image,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useBasket } from "../../context/BasketContext";
const Navbar = () => {
  const { loggedIn, logOut } = useAuth();
  const { basketItem } = useBasket();
  const navigate = useNavigate();

  const handleClick = async () => {
    logOut();
    navigate("/");
  };
  return (
    <div className="nav" id="nav">
      <div className="left">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        {!loggedIn && (
          <>
            {" "}
            <Link to="/signin">
              <Button className="btnSignIn" colorScheme="blue">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue">Sign Up</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            {basketItem.cart.length > 0 && (
              <Menu>
                <Link to={"/basket"}>
                <MenuButton as={Button}>Your Cats</MenuButton>
                </Link>
                <MenuList >
                  {
                    basketItem.cart.map((item,index) =>(
                     
                      <MenuItem key={index} minH="48px">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={item.photos[0]}
                        alt={item.description}
                        mr="12px"
                      />
                      <span>{item.title}</span>
                      
                      <span style={{marginLeft:"5px"}}>{item.count}</span>
                    </MenuItem>
                    
                    ))
                  }
                  </MenuList>
                
              </Menu>
            )}

            <Link to="/profile">
              <Button className="btnSignIn" colorScheme="blue">
                Profil
              </Button>
            </Link>
            <Button
              className="btnLogOut"
              colorScheme="red"
              onClick={handleClick}
            >
              Log Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
