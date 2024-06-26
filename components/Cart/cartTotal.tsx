"use client";
import { FC, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { BASE_URL } from "../../api";
import { getAddyByEmailAction } from "../../actions";
import { useScopedI18n } from "../../locales/client";

interface CartTotalProps {
  totalPrice: number;
  selectedNumber: number;
  localFilteredProducts: any[];
  productQuantities: Record<string, number>;
}

const CartTotal: FC<CartTotalProps> = ({
  totalPrice,
  selectedNumber,
  localFilteredProducts,
  productQuantities,
}) => {
  const { user } = useUser();
  const [hasAddress, setHasAddress] = useState<boolean | null>(null);
  const t = useScopedI18n("cart");

  useEffect(() => {
    const checkAddress = async () => {
      if (user && user.email) {
        try {
          const address = await getAddyByEmailAction(user.email);
          setHasAddress(address.length > 0);
        } catch (error) {
          console.error("Error fetching address:", error);
          setHasAddress(false);
        }
      }
    };

    checkAddress();
  }, [user]);

  const deliveryPrice = 12;
  const totalWithDelivery = totalPrice + deliveryPrice;

  const checkout = async () => {
    if (hasAddress) {
      await fetch(`${BASE_URL}/api/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: localFilteredProducts.map((product) => ({
            ...product,
            selectedQuantity: productQuantities[product.id],
          })),
          email: user?.email,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response?.url) {
            window.location.assign(response.url);
          }
        });
    } else {
      window.location.assign("/user/profile");
    }
  };

  return (
    <div className="cart-total-wrapper">
      <div className="cart-total-header">
        <h2>{t("payment")}</h2>
      </div>
      <ul className="cart-total-pricing">
        <li>
          <span>
            {t("products")} ({selectedNumber})
          </span>
          <span className="cart-total-value">{totalPrice.toFixed(2)} ₾</span>
        </li>
        <li>
          <span>{t("deliveryFee")}</span>
          <span className="cart-total-value accent">{deliveryPrice} ₾</span>
        </li>
      </ul>
      <div className="cart-total-total">
        <h2>{t("total")}</h2>
        <span className="cart-total-sum">{totalWithDelivery.toFixed(2)} ₾</span>
      </div>
      <span className="cart-total-secure">
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00008 14.6666C7.00008 14.6666 12.3334 11.9999 12.3334 7.99992V3.33325L7.00008 1.33325L1.66675 3.33325V7.99992C1.66675 11.9999 7.00008 14.6666 7.00008 14.6666Z"
            stroke="#52B083"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>{" "}
        {t("safePaymentMethods")}
      </span>
      <div className="cart-total-checkout">
        {hasAddress === null ? (
          <button>{t("loading")}</button>
        ) : hasAddress ? (
          <button className="cart-total-primary-hover" onClick={checkout}>
            {t("order")}
          </button>
        ) : (
          <p className="w-auto">
            {t("noAddyOne")}{" "}
            <a href="/profile/address" className="underline">
              {t("noAddyTwo")}
            </a>{" "}
            {t("noAddyThree")}
          </p>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
