import { ServiceBase } from "../config/service-base";

export class OrderService extends ServiceBase {
  createOrder = async (params) => {
    const order = params;
    console.log(order);
    return await this.post("/createOrder", order);
  };
  getOrder = async (params) => {
    const id = params;
    return await this.get(`/getorder/${id}`);
  };
  getOrders = async (params) => {
    const id = params;
    return await this.get(`/getorders/${id}`);
  };
  getAllOrders = async (params) => {
    return await this.get("/getallorders");
  };
  updateStatus = async (params) => {
    const { id, status_order, note } = params;
    return await this.put(`/updatestatus/${id}`, { status_order, note });
  };
  cancelOrders = async (params) => {
    const { id, message, orders } = params;
    return await this.put(`/cancelorders/${id}`, { message, orders });
  };
  updateUserInfo = async (params) => {
    const { id, name, address, phone } = params;
    return await this.put(`/updateuserinfo/${id}`, { name, address, phone });
  };
  deleteOrder = async (params) => {
    const id = params;
    return await this.delete(`/deleteorder/${id}`);
  };
  thongKe = async (params) => {
    const { dateStart, dateEnd } = params;
    return await this.post(`/thongke`, { dateStart: dateStart, dateEnd: dateEnd });
  };
}
