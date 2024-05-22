import { FC } from "react";

interface CartTotalProps {
  totalPrice: any;
  selectedNumber: any;
}

const CartTotal: FC<CartTotalProps> = ({ totalPrice, selectedNumber }) => {
  return (
    <div className="cart-total-wrapper">
      <div className="cart-total-header">
        <h2>გადახდა</h2>
      </div>
      <ul className="cart-total-pricing">
        <li>
          <span>პროდუქტები ({selectedNumber})</span>
          <span className="cart-total-value">{totalPrice.toFixed(2)} ₾</span>
        </li>
        <li>
          <span>ფასდაკლება</span>
          <span className="cart-total-value accent">0 ₾</span>
        </li>
      </ul>
      <div className="cart-total-total">
        <h2>ჯამური ღირებულება</h2>
        <span className="cart-total-sum">{totalPrice} ₾</span>
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
        გადახდის დაცული მეთოდები
      </span>
      <div className="cart-total-checkout">
        <a className="cart-total-primary-hover" href="/checkout/">
          შეკვეთის გაფორმება
        </a>
      </div>
    </div>
  );
};

export default CartTotal;