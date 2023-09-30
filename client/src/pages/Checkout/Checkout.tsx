import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Checkout.style.scss";

function Checkout() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  const createOrder = async () => {
    const json = await ServiceAPI.createOrderWithOneItem(
      "Test Customer",
      "test@email.com",
      productId,
    );

    if (json.error !== null) {
      setMessage(json.error);
      return;
    }

    setMessage("Order created!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(productId);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="checkout-page">
        {message && <p>{message}</p>}
        {product && (
          <>
            <h2>You are about to make an order with the following product:</h2>
            <div className="checkout-page__product">
              <h3>Title: {product.title}</h3>
            </div>
            <button onClick={() => createOrder()}>
              Create Order (with customer set in code)
            </button>
          </>
        )}
      </div>
    </Page>
  );
}

export default Checkout;
