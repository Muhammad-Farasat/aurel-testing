import { useEffect } from "react";
import { BookingScene } from "../../components/booking/BookingScene";
import { Footer } from "../../components/frame/Footer";
import { Morning } from "./Morning";
import { FourWays } from "./FourWays";
import { Capacity } from "./Capacity";
import { Standards } from "./Standards";
import { Organisations } from "./Organisations";
import { Ending } from "./Ending";
import "./home.css";

/** Home: the booking question first, then the story of one well-kept journey. */
export function Home() {
  useEffect(() => {
    document.title = "AUREL. Travel, Considered.";
  }, []);
  return (
    <div className="home">
      <BookingScene />
      <Morning />
      <FourWays />
      <Capacity />
      <Standards />
      <Organisations />
      <Ending />
      <Footer />
    </div>
  );
}
