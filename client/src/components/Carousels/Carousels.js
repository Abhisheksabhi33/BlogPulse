import Carousel from "react-bootstrap/Carousel";
import slider1img from "../../images/slider-1.jpg";
import slider2img from "../../images/slider-2.jpg";
import slider3img from "../../images/slider-3.jpg";

function UncontrolledExample() {
  const imageStyle = {
    display: "block",
    width: "90%", 
    height: "50vh", 
    objectFit: "cover",
    margin: "auto",
    borderRadius: "22px",
  };

  const captionStyle = {
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
  };

  const titleStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const descriptionStyle = {
    fontSize: "16px",
    lineHeight: "1.4",
  };

  return (
    <div className="container mt-2">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src={slider1img}
            alt="First slide"
            style={imageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            <h3 style={titleStyle}>Welcome to BlogPulse</h3>
            <p style={descriptionStyle}>
              Unveiling the future through the lens of technology, one article at a time.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src={slider2img}
            alt="Second slide"
            style={imageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            <h3 style={titleStyle}>Global Perspectives</h3>
            <p style={descriptionStyle}>
            Uncover the truth, ignite your curiosity. Dive into our captivating news articles and explore the stories that shape our world.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto"
            src={slider3img}
            alt="Third slide"
            style={imageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            <h3 style={titleStyle}>Opinion & Commentary</h3>
            <p style={descriptionStyle}>
            Trending Topics: Explore the Buzzworthy Stories of the Moment
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
