import "./Footer.style.scss";

function date() {
  let date = new Date();
  let year = date.getFullYear();
  return year;
}
function Footer() {
  return (
    <>
      <div className="footer">
        <p>©{date()} Carleton University</p>
      </div>
      ;
    </>
  );
}

export default Footer;