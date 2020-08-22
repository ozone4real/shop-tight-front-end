import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { NavLink, Switch, Route } from "react-router-dom";
import { CATEGORY_PRODUCTS } from "../../graphql/queries";
import { getIdFromUrlKey } from "../../utils/helperMethods";
import CategorySection from "../ui-molecules/CategorySection";
import SubCategoryPage from "./SubCategoryPage";
import Skeleton from "react-loading-skeleton";
import SectionSkeleton from "../ui-molecules/SectionSkeleton";

export default ({ match: { params } }) => {
  const { data } = useQuery(CATEGORY_PRODUCTS(getIdFromUrlKey(params.urlKey)), {
    fetchPolicy: "cache-and-network",
  });

  if (!data)
    return (
      <div className="category-page">
        <div className="container">
          <SectionSkeleton leftHeight="300px" rightHeight="700px" />
        </div>
      </div>
    );

  const {
    category: { categoryName, categoryDescription, subCategories },
    categoryProducts,
  } = data;

  return (
    <div className="category-page">
      <div className="container">
        <section className="main-sec">
          <div class="left-sec">
            <h3>
              <NavLink to={`/categories/${params.urlKey}`}>
                {" "}
                {categoryName}
              </NavLink>
            </h3>
            <hr />
            <ul>
              {subCategories.map((item) => (
                <li key={item.urlKey}>
                  <NavLink
                    activeClassName="path-active"
                    to={`/categories/${params.urlKey}/${item.urlKey}`}
                  >
                    {item.categoryName}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div class="right-sec">
            <Switch>
              <Route
                path="/categories/:urlKey/:subUrlKey"
                key={categoryName}
                render={(props) => <SubCategoryPage {...props} />}
              />

              <Route
                path="/categories/:urlKey"
                render={(props) => (
                  <CategorySection
                    categoryProducts={categoryProducts}
                    categoryDescription={categoryDescription}
                    categoryName={categoryName}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </section>
      </div>
    </div>
  );
};
