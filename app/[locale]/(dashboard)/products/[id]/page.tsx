import { getSingleProduct } from "../../../../../actions";
import SingleProdImageSlider from "../../../../../components/SingleProductPage/singleProdImageSlider";
import SingleProdMainDescription from "../../../../../components/SingleProductPage/singleProdMainDesription";
import SingleProdNavigation from "../../../../../components/SingleProductPage/singleProdNavigation";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const prodId = params.id;
  const product = await getSingleProduct(prodId);
  const displayProd = product[0];
  return (
    <div className="single-product-layout">
      <SingleProdNavigation
        titlege={displayProd.title_ge}
        titleen={displayProd.title_en}
        id={displayProd.id}
      />
      <div className="single-product-middle">
        <SingleProdImageSlider
          photos={displayProd.photo_urls}
          mainphoto={displayProd.main_photo}
        />
        <SingleProdMainDescription product={displayProd} />
        <div>იუზერის ინფორმაცია</div>
      </div>
      <div>დეტალები</div>
      <div>მსგავსი პროდუქცია</div>
    </div>
  );
};

export default SingleProductPage;
