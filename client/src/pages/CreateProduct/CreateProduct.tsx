import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import { useAccountContext } from "../../context";
import "./CreateProduct.style.scss";

function CreateProduct() {
  const { jwt, loggedIn } = useAccountContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const createProduct = async () => {
    try {
      const json = await ServiceAPI.createProduct(
        jwt,
        "Test Product",
        "Test Product Description",
        1.99,
      );

      console.log(json);

      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setMessage("Product created!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (loggedIn() === false) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Page>
      <div className="create-project-page">
        {message && <p>{message}</p>}
        <h1>Create Product</h1>
        <button onClick={() => createProduct()}>
          Create Product (with data set in code)
        </button>
      </div>
    </Page>
  );
}

export default CreateProduct;
