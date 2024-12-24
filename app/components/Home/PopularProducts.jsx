"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import ProductsGrid from "../Product/ProductView";

const PopularProducts = () => {
  const { globalState } = useGlobalContext();
  const { initialData, isLoading, error } = globalState;
  const [products, setProducts] = useState([]);
  const popularProductIds = useMemo(
    () => initialData?.menu?.homepage?.populairproducts,
    [initialData?.menu?.homepage?.populairproducts]
  );

  const app = useMemo(() => initialData?.menu, [initialData?.menu]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("/data/popularProducts.json");
  //       console.log("product response",response.data);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const text = await response.text();
  //       console.log("text",text);
  //       let data;

  //       try {
  //         data = JSON.parse(text);
  //         console.log("Data: ",data);
  //       } catch (parseError) {
  //         throw new Error("Received malformed JSON from the server.");
  //       }
  //       const allProducts = Object.values(data.res);
  //       const filteredProducts = allProducts.filter((product) =>
  //         popularProductIds.includes(product.productid)
  //       );
  //       setProducts(filteredProducts);
  //     } catch (error) {
  //       console.error("Error fetching products:", error.message);
  //     } finally {
  //     }
  //   };

  //   if (popularProductIds.length > 0) {
  //     fetchProducts();
  //   }
  // }, [popularProductIds]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch the JSON file from the public/data directory
        const response = await fetch("/data/popularProducts.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filter the products based on popular product IDs
        const allProducts = Object.values(data.data);
        const filteredProducts = allProducts.filter((product) =>
          popularProductIds.includes(product.productid)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    if (popularProductIds.length > 0) {
      fetchProducts();
    }
  }, [popularProductIds]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <section className="productsv2 light popularproducts">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2 className="below-frame">Featured products TrailerPlus</h2>
          </div>
        </div>

        <div id="popularproducts" style={{ height: "94px" }}>
          <strong id="productcount">
            <b>{products.length}</b>
            <strong> Results</strong>
          </strong>
          <ProductsGrid products={products} app={app} />
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
