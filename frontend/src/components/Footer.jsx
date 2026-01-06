function Footer() {
  return (
    <footer
      className="text-center py-3 mt-5 footer"
      style={{
        backgroundColor: "black",
        color: "white",
        fontSize: "0.9rem",
      }}
    >
      © {new Date().getFullYear()} Campus Connect · Full-Stack MERN Project · Built by Prayas &#10084;
    </footer>
  );
}

export default Footer;
