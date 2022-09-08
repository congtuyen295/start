import { ServiceBase } from "../config/service-base";

export class CategoryService extends ServiceBase {
  getCategory = async () => {
    return await this.get("/category");
  };
  detailCategory = async (params) => {
    const id = params;
    return await this.get(`/category/${id}`);
  };
  newCategory = async (params) => {
    const { name ,subCategories} = params;
    return await this.post("/category", { name,subCategories });
  };
  updateCategory = async (params) => {
    const { id, name,subCategories } = params;
   
    return await this.put(`/category/${id}`, { name,subCategories });
  };
  deleteCategory = async (params) => {
    const id = params;
    return await this.delete(`/category/${id}`);
  };
  getSubCategories = async (params) => {
    const name = params;

    return await this.get(`/subcategory/${name}`);
  };
}
