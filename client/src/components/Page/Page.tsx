import { Footer, Navbar } from "../../components";
import "./Page.style.scss";

interface Props {
  children: React.ReactNode;
}

function Page({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="page">{children}</div>
      <Footer />
    </>
  );
}

export default Page;
