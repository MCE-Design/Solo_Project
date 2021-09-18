import './LandingPage.css'
import castle from "./Images/Castle 1-2.jpg"

const LandingPage = () => {

  return (
    <>
      <div className="container landing-page">
        <div id="where-to-box">
          <div className="splash-text text-over-image">Not sure where to go?  Roll the dice?</div>
          <a id="where-to-button" href="/spots">I'm Adventurous!</a>
        </div>
        <div id="splash-image"> {/* TODO Image rotator */}
          <img src={castle} alt="Splash"></img>
        </div>
        <h1>Explore Everywhere</h1>
      </div>
    </>
  )
}

export default LandingPage;
