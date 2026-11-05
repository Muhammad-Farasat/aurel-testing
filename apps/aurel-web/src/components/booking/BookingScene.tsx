import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDraft } from "../../booking/DraftContext";
import type { Service } from "../../booking/model";
import { facts } from "../../config/copy";
import { market } from "../../config/market";
import { useClock } from "../../hooks";
import { JourneyFields } from "./JourneyFields";
import "./booking.css";

/**
 * Scene 0: the booking question. Used as the first scene of home and of every
 * service page. Panel on columns 1 to 8; one line of service facts and the
 * hour on columns 9 to 12. No image.
 */
export function BookingScene({
  preset,
  lockService,
  heading,
  aside,
  label,
}: {
  preset?: Service;
  lockService?: boolean;
  heading?: ReactNode;
  aside?: ReactNode;
  label?: string;
}) {
  const { setService } = useDraft();
  const navigate = useNavigate();
  const clock = useClock();

  useEffect(() => {
    if (preset) setService(preset);
  }, [preset, setService]);

  return (
    <section className="scene0" data-ground="light" aria-labelledby="booking-question" id="booking">
      <div className="wrap grid scene0__grid">
        <div className="scene0__panel">
          {label ? <p className="t-label scene0__label">{label}</p> : null}
          <JourneyFields
            variant="entry"
            headingId="booking-question"
            heading={heading}
            lockService={lockService}
            onDone={() => navigate("/book/vehicle", { state: { from: window.location.pathname } })}
          />
        </div>
        <aside className="scene0__aside" aria-label="About the service">
          <p className="t-label scene0__hour">
            <span className="now-dot now-dot--light" aria-hidden="true" />
            {market.city} <span className="tnum">{clock}</span>
          </p>
          <div className="scene0__facts">{aside ?? <p>{facts}</p>}</div>
        </aside>
      </div>
    </section>
  );
}
