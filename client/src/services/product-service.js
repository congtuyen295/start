import { ServiceBase } from "../config/service-base";

export class ProductService extends ServiceBase {
  getProducts = async (params) => {
    return await this.get("/getProducts");
  };
  searchProducts = async (params) => {
    const { name } = params;
    return await this.get(`/getProducts/?limit=${100}&name[regex]=${name|| " "}`);
  };
  getProductById = async (params) => {
    const { id } = params;
    return await this.get(`getProduct/${id}`);
  };
  getProductByCategory = async (params) => {
    const { limit, category } = params;
    return await this.get(`/getProducts?category=${category}&limit=${limit}`);
  };
  getProductsByDiscount = async (params) => {
    return await this.get(`/getProducts?sort=-discount&limit=6`);
  };
  getProductByCategory2 = async (params) => {
    const { limit, sort, page, category,nsx, price } = params;
    return await this.get(
      `/getProducts?nsx=${nsx}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&limit=${limit}&page=${page}&sort=${sort}`
    );
  };

  addProduct = async (params) => {
    const image = params.images;
    return await this.post("/createProduct", { ...params, images: image });
  };
  updateProduct = async (params) => {
    const { id } = params;
    const { images } = params;
    return await this.put(`/updateProduct/${id}`, {
      ...params,
      images: images,
    });
  };
  deleteProduct = async (params) => {
    const id = params;
    return await this.delete(`/deleteProduct/${id}`);
  };
}
