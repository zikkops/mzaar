import Picker from "./Picker";

export default function Page() {
  return (
    <>
      <div className="wrap">
        <header>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src="/logo.png" alt="VIPMINDS. Bold wins." />
          <div className="kicker">Beirut Duty Free × Mzaar Ski Resort · Winter 2026-27</div>
          <h1>Pick the ideas you want to start with</h1>
          <p className="lead">
            Eight partnership ideas came out of the Mzaar meetings. Tick the ones you like, add a comment if you
            want, then send us your selection. It takes five minutes.
          </p>
        </header>

        <div className="how">
          <div><span className="num">1</span><span>Read the eight ideas below.</span></div>
          <div><span className="num">2</span><span>Tap <b>Select this idea</b> on the ones you want.</span></div>
          <div><span className="num">3</span><span>Press <b>Send my selection</b> at the bottom.</span></div>
        </div>

        <Picker
          timeline={
            <section className="panel" id="timeline">
              <div className="kicker">Timing</div>
              <h2>Why we need your answer now</h2>
              <p>
                Mzaar opens early-bird sales in October and November. That is when travellers, and the diaspora
                flying home for Christmas, are the easiest to reach.
              </p>
              <ul className="timeline">
                <li><b>End of September</b><span>Your selection and sign-off on the barter terms.</span></li>
                <li><b>October</b><span>Early-bird offer live in the loyalty app. Mzaar in the first magazine edition. BDF content on the Mzaar screens.</span></li>
                <li><b>November – December</b><span>Season content, ski pass draw, BDF on the Mzaar ticket, artist chairlifts revealed at opening.</span></li>
                <li><b>March</b><span>We read the numbers together and decide next season.</span></li>
              </ul>
            </section>
          }
        />

        <footer>
          <span>VIPMINDS × Beirut Duty Free</span>
          <span>Beirut · Las Vegas · Beverly Hills</span>
        </footer>
      </div>
    </>
  );
}
