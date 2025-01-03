"use client";

const StockLevel = ({ product }) => {
  const getStockLevel = () => {
    if (
      product.localstock > product.threshold &&
      product.localstock > 0 &&
      product.suppliershipdays === 1 &&
      product.productstock >= product.minqty
    )
      return 1;
    if (
      product.localstock > product.threshold &&
      product.localstock > 0 &&
      product.productstock >= product.minqty
    )
      return 2;
    return product.productstock === 0 ? 4 : 5;
  };

  const stockLevel = getStockLevel();
  const stockMessages = ["In Stock", "Limited Stock", "Out of Stock"];
  return <p>{stockMessages[stockLevel]}</p>;
};

export default StockLevel;
