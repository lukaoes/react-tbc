import { Link } from "next-view-transitions";
import { getCurrentLocale, getI18n } from "../../locales/server";
import { FC } from "react";

interface SingleProdNavigationNames {
  titlege: string;
  titleen: string;
  id: number;
}

const SingleProdNavigation: FC<SingleProdNavigationNames> = async (props) => {
  const locale = getCurrentLocale();
  const { titlege, titleen, id } = props;
  const t = await getI18n();

  return (
    <div className="single-prod-navigation">
      <div>
        <Link href="/">{t("singleProd.home")}</Link>
        <svg
          width="20"
          height="20"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 13.5L11.25 9L6.75 4.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <Link href="/products">{t("singleProd.products")}</Link>
        <svg
          width="20"
          height="20"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 13.5L11.25 9L6.75 4.5"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <Link href={`/products/${id}`}>
        {locale === "ge"
          ? titlege
            ? titlege
            : titleen
          : titleen
          ? titleen
          : titlege}
      </Link>
    </div>
  );
};

export default SingleProdNavigation;
