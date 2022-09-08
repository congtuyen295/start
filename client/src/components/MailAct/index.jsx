import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthServices } from "../../services/auth-service";
const MailAct = () => {
  const { token } = useParams();
  const authServices = new AuthServices();
  const history = useHistory();
  const alert = useAlert();

  useEffect(() => {
    if (token) {
      const activationEmail = async () => {
        try {
          await authServices.activation({ token });
          history.push("/login");
          alert.success("Xác thực tài khoản thành công!");
        } catch (error) {
          console.log(error);
        }
      };
      activationEmail();
    }
  }, [token]);
  return <>Xác thực tài khoản</>;
};

export default MailAct;
