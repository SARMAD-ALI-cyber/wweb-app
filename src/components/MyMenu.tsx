import { Fragment } from "react/jsx-runtime";
import food from "../assets/food.jpg";

interface Props {
  CardTitle: string;
  description:string;
  price:string;
  image:string;


}


export function FoodCard({ CardTitle,description,price,image }: Props) {
  return (
    <Fragment>
      <div className="card">
        <img src={image} alt="Loading..." />
        <div className="card__content">
          <p className="card__title">{CardTitle}</p>
          <p className="card__description">{description}</p>
          <p>{price}</p>
        </div>
      </div>
    </Fragment>
  );
}
