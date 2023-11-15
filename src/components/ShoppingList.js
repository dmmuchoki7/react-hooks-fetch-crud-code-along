import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //useEffect
  useEffect(()=>{
    fetch("http://localhost:3000/items")
    .then((res)=> res.json())
    .then((items)=> (items));
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  //Callback function 1 to itemform.js
  function handleAddItem(newItem){
    console.log("In Shoppign list:", newItem)
    setItems([...items,newItem]);
  }

  //Callback function 2 to item.js add state from items
  function handleUpdateItem(updatedItem) {
    console.log("In ShoppingCart:", updatedItem);
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  //callback function to handle delete
  function handleDeleteItem(deletedItem) {
    console.log("In ShoppingCart:", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem= {handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem= {handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
