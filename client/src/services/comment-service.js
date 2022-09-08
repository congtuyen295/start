import { ServiceBase } from "../config/service-base";

export class CommentService extends ServiceBase {
  createComment = async (params) => {
    const { id_user, content, id_product, rating } = params;
    return await this.post("/comment", {
      id_user,
      content,
      id_product,
      rating,
    });
  };
  getComments = async (params) => {
    return await this.get(`/getComments/${params}`);
  };
  deleteComment = async (params) => {
    const id = params;
    return await this.delete(`/deleteComment/${id}`);
  };
  repComments = async (params) => {
    const { id_user, content, createAt, id_comment } = params;
    return await this.post(`/repcomment/${id_comment}`, {
      id_user,
      content,
      createAt,
    });
  };
}
