import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page, ProductPreviewCard } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Home.style.scss";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProducts();
      setProducts(json.data.products);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="home-page">
        <h1 className="home-page__title">Home</h1>
        <h2>Products:</h2>
        <div className="home-page__products">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={`${product.id}`}>
              <ProductPreviewCard
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                key={`${product.id}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </Page>
  );
}

export default Home;
