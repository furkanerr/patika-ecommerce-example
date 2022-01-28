import React from "react";
import { useContext, useState,createContext } from "react";

 const BasketContext = createContext();

const BasketProvider = ({ children }) => {


  const [basketItem, setBasketItem] = useState({
    cart:[]
  });
    

  const addItem=(data)=>{
    setBasketItem(
      {...basketItem,
      cart: basketItem.cart.find(item=>item._id===data._id)
       ? basketItem.cart.map(item=>item._id===data._id 
        ? {...item, count: item.count+1}
        : item )
       : [...basketItem.cart,{...data, count:1}]
    });
    
  }
  if(basketItem.cart.length>0){console.log(basketItem);}
  

  const values = {
    basketItem,
    setBasketItem,
    addItem,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);
export  { useBasket, BasketProvider };
