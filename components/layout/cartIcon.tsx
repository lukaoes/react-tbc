import Link from "next/link";
// import CartCount from "./cartCount";
// import Cart from "../../public/assets/images/cart.svg";
// import Image from "next/image";
import { getUserCart } from "../../api";
// import { getUserCart } from "../../api";

const CartIcon = async () => {
  const userId = 2;
  const cart = await getUserCart(userId);
  const productQuantities = cart.products;

  const totalCount = Object.values<number>(productQuantities).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  return (
    <Link href="/cart" className="cart-icon">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_121_301)">
          <path
            d="M7.49984 18.3332C7.96007 18.3332 8.33317 17.9601 8.33317 17.4998C8.33317 17.0396 7.96007 16.6665 7.49984 16.6665C7.0396 16.6665 6.6665 17.0396 6.6665 17.4998C6.6665 17.9601 7.0396 18.3332 7.49984 18.3332Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.6668 18.3332C17.1271 18.3332 17.5002 17.9601 17.5002 17.4998C17.5002 17.0396 17.1271 16.6665 16.6668 16.6665C16.2066 16.6665 15.8335 17.0396 15.8335 17.4998C15.8335 17.9601 16.2066 18.3332 16.6668 18.3332Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.833496 0.833496H4.16683L6.40016 11.9918C6.47637 12.3755 6.68509 12.7201 6.98978 12.9654C7.29448 13.2107 7.67575 13.341 8.06683 13.3335H16.1668C16.5579 13.341 16.9392 13.2107 17.2439 12.9654C17.5486 12.7201 17.7573 12.3755 17.8335 11.9918L19.1668 5.00016H5.00016"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_121_301">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {/* <CartCount /> */}
      <span>{totalCount}</span>
    </Link>
  );
};

export default CartIcon;
