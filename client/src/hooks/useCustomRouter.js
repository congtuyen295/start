import { useHistory, useLocation } from "react-router-dom";

const useCustomRouter = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const pushQuery = ({ page, sort,category, subcategory,price }) => {
    const query = {};
    if (page) query.page = page;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    const newQuery = new URLSearchParams(query).toString();
    history.push(`${pathname}?${newQuery}&price_spe[gte]=${price[0]}&price_spe[lte]=${price[1]}`);
  };

  return { pushQuery };
};

export default useCustomRouter;
