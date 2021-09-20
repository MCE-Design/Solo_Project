import './FourOhFour.css';
import Lost1 from "./Images/Lost 1-1.jpg";

const FourOhFourPage = () => {

  return (
    <>
      <div className="container four-oh-four-page">
        <div id="where-to-box" className="four-oh-four-page">
          <div className="lost-text text-over-image">
            <h1>404</h1>
            <p>Uh Oh!  You've lost your way!</p>
            </div>
          <a id="where-to-button" href="/">Head Home!</a>
        </div>
        <div id="splash-image"> {/* TODO Image rotator */}
          <img src={Lost1} alt="Splash"></img>
        </div>
      </div>
    </>
  )
}

export default FourOhFourPage;
