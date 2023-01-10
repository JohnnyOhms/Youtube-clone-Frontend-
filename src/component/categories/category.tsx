import React, { useEffect, useState } from "react";
import { CategoryItem } from "../../utils/data";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { videoAPI } from "../../slice/getAPIslice";
import { requestType } from "../../slice/getAPIslice";

const Category = () => {
  const [categoryName, setCategoryName] = useState<requestType<string>>("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(videoAPI(`search`));
  }, [dispatch]);
  const category = CategoryItem.map((item, index) => {
    return (
      <span
        className="Category__section"
        style={{
          background: item === categoryName ? "white" : "#565050",
          color: item === categoryName ? "black" : "white",
        }}
        onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
          setCategoryName(item);
          setSearchParams({ filter: item });
          // dispatch(videoAPI(`search`));
        }}
        key={index}
      >
        {item}
      </span>
    );
  });
  return <div className="Category">{category}</div>;
};

export default Category;
