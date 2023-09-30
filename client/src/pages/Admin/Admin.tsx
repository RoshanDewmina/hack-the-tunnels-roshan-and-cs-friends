import { Link } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Admin.style.scss";

function Admin() {
  const { loggedIn } = useAccountContext();

  return (
    <Page>
      <div className="admin-page">
        <h1>Admin</h1>
        {loggedIn() === false ? (
          <div>Login to access admin</div>
        ) : (
          <div>
            <h2>Admin Actions:</h2>
            <Link to="/admin/create-product">Create Product</Link>
          </div>
        )}
      </div>
    </Page>
  );
}

export default Admin;
