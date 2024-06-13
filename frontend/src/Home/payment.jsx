import React, { useEffect, useState } from "react";
import Layout from "../Componets/Layouts/layout";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
const Payment = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);
  console.log(instance);
  // handel payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      console.log(cart);
      console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment completed Sucessfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <div style={{ height: "20em", width: "20em" ,position:"relative",top:"10em"}}>
            {!clientToken || !auth?.token || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization:clientToken,
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "processing..." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Payment;
