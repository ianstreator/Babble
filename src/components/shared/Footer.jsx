import images from "../../images/export";

function Footer() {
  return (
    <footer>
      <p>
        Developed by
        <a
          href="https://github.com/ianstreator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={images.Github} width={50} />
          ianstreator
        </a>
      </p>
      |
      <p>
        Powered by
        <a
          href="https://cloud.google.com/translate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={images.Cloud} width={50} />
          Cloud Translation
        </a>
      </p>
    </footer>
  );
}

export default Footer;
