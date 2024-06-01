"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { handleProductRemove, handleQuantityChange } from "../../actions";
import CartTotal from "./cartTotal";
import { useUser } from "@auth0/nextjs-auth0/client";

interface CartProductsProps {
  filteredProducts: Product[];
  initialQuantities: Record<string, number>;
}

interface Product {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
}

const CartProducts = ({
  filteredProducts,
  initialQuantities,
}: CartProductsProps) => {
  const { user } = useUser();
  const [productQuantities, setProductQuantities] = useState(initialQuantities);
  const [localFilteredProducts, setLocalFilteredProducts] =
    useState(filteredProducts);
  const [id, setId] = useState("");

  useEffect(() => {
    if (user && user.sub) {
      setId(user.sub);
    }
  }, [user]);

  const updateQuantity = async (productId: string, quantityChange: number) => {
    const newQuantity = (productQuantities[productId] || 0) + quantityChange;

    await handleQuantityChange(productId, quantityChange, id);

    if (newQuantity <= 0) {
      await removeProduct(productId);
    } else {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    }
  };

  const removeProduct = async (productId: string) => {
    await handleProductRemove(productId, id);

    setProductQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[productId];
      return updatedQuantities;
    });

    setLocalFilteredProducts((prevProducts) =>
      prevProducts.filter((product) => product.id.toString() !== productId)
    );
  };

  const calculateTotalPrice = () => {
    return localFilteredProducts.reduce((total, product) => {
      const quantity = productQuantities[product.id.toString()] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return Object.values(productQuantities).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <div className="cart-products-list-container">
        <div className="cart-header">
          <div className="cart-header-item">Product</div>
          <div className="cart-header-item">Price</div>
          <div className="cart-header-item">Quantity</div>
          <div className="cart-header-item">Subtotal</div>
        </div>
        {localFilteredProducts.map((item: Product, index: number) => (
          <div key={`filteredProducts-${index}`}>
            <div>
              <div className="cart-item">
                <div className="cart-item-row">
                  <div className="cart-item-product">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="cart-item-image-placeholder"
                    />
                    <div className="cart-item-details">
                      <span>{item.title}</span>
                    </div>
                  </div>
                  <div className="cart-item-price">${item.price}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-quantity-btn"
                      onClick={() => updateQuantity(item.id.toString(), -1)}
                    >
                      -
                    </button>
                    <span id={`qty-${item.id}`}>
                      {productQuantities[item.id?.toString()] || 0}
                    </span>
                    <button
                      className="cart-item-quantity-btn"
                      onClick={() => updateQuantity(item.id.toString(), 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    $
                    {(
                      item.price * (productQuantities[item.id.toString()] || 0)
                    ).toFixed(2)}
                  </div>
                  <button
                    className="cart-item-remove-btn"
                    onClick={() => removeProduct(item.id.toString())}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CartTotal
        totalPrice={calculateTotalPrice()}
        selectedNumber={calculateTotalItems()}
      />
    </div>
  );
};

export default CartProducts;
