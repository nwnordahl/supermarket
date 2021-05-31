import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailNutrition from "./ProductDetailNutrition";
import ProductDetailStorage from "./ProductDetailStorage";

export default function ProductDetails(props) {
  const [details, setDetails] = useState([]);
  const params = useParams();
  const match = useRouteMatch();
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");

  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then((data) => {
        if (data) {
          setDetails(data);
        }
      })
      .catch((error) => console.log(error));
  }, [get, params.id]);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{details.name}</h2>
        <img
          src={details.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={details.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={`${match.url}/nutrition`}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={`${match.url}/storage`}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={match.path}>
            <ProductDetailInfo
              details={details}
              onProductAdd={props.onProductAdd}
            />
          </Route>
          <Route exact path={`${match.path}/nutrition`}>
            <ProductDetailNutrition details={details} />
          </Route>
          <Route exact path={`${match.path}/storage`}>
            <ProductDetailStorage details={details} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
