import { ServiceBase } from "../config/service-base";

export class AuthServices extends ServiceBase {


  login = async (params) => {
    const { email, password } = params;
    return await this.post("/auth/login", { email, password });
  };
  activation = async (params) => {
    const { token } = params;
    return await this.post("/auth/activation", { activation_token: token });
  };
  register = async (params) => {
    const { name, email, password } = params;
    return await this.post("/auth/register", {
      name,
      email,
      password,
    });
  };
  refreshToken = async (params) => {
    return await this.get("/auth/refresh_token", { withCredentials: true });
  };
  logout = async (params) => {
    return await this.post("/auth/logout", { refeshToken: params });
  };
}
