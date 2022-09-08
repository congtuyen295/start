import { ServiceBase } from  "../config/service-base";

export class UserServices extends ServiceBase {
  // Implement method call API
  updateUser = async (params) => {
    const { name, avatar, address, phone } = params;
    return await this.patch("/auth/update", { name, avatar, address, phone });
  };
  uploadAvatar = async (params) => {
    const { avatar } = params;
    return await this.post("/upload_avatar", { avatar });
  };
  getInfo = async () => {
    return await this.get("/auth/infor");
  };
  getInfor = async (params) => {
    const { id } = params;
    return this.get(`/auth/infor/${id}`);
  };
  getUsersAllInfo = async () => {
    return await this.get("/auth/all_infor");
  };
  deleteUser = async (params) => {
    const id = params
    return await this.delete(`/auth/delete/${id}`);
  };
}
