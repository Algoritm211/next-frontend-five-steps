import React from 'react';
import Menubar from "react-responsive-multi-level-menu";


const Dropdown = () => {
  const menuItems = [
    {value: "Fashion", items: [{value: "Men", items: [{value: "Shirts"}]}]},
    {value: "Electronics", items: []},
    {value: "Furnitures", items: []},
    {value: "Jewelery&watches", items: []}
  ];

  return (
    <Menubar
      data={menuItems}
      hamBurgerClassName={'burgerMultiplyCustom'}
      menuContainerWidth={200}
    />
  );
};

export default Dropdown;
