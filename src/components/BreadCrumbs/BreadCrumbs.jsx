import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "react-router-dom";

const BreadCrumbs = () => {
  const { categories } = useSelector((state) => state.category); 
  const [searchParams] = useSearchParams();

  const currentCategoryId =
    searchParams.get("category") ||
    searchParams.get("subCatId") ||
    searchParams.get("thirdSubCatId");

  const findPath = (cats, targetId, path = []) => {
    for (let cat of cats) {
      if (cat._id === targetId) {
        return [...path, cat];
      }
      if (cat.children?.length) {
        const found = findPath(cat.children, targetId, [...path, cat]);
        if (found.length) return found;
      }
    }
    return [];
  };

  const breadcrumbItems = useMemo(() => {
    if (!currentCategoryId) return [];
    return findPath(categories, currentCategoryId);
  }, [categories, currentCategoryId]);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>

      {breadcrumbItems.map((cat, idx) =>
        idx === breadcrumbItems.length - 1 ? (
          <Typography key={cat._id} color="text.primary">
            {cat.name}
          </Typography>
        ) : (
          <Link
            key={cat._id}
            underline="hover"
            color="inherit"
            href={`?category=${cat._id}`}
          >
            {cat.name}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
