/**
 * DRAFT COPY. Standards wording and values are an open question for the owner
 * (DESIGN_DIRECTION.md, Open question 6). Keep claims concrete and checkable;
 * replace with the owner's commitments before launch.
 */
import { serviceRules } from "./serviceRules";

export const tagline = "Travel, Considered.";
export const philosophy = "The journey should feel as carefully considered as the destination.";

export const facts =
  "Pre-booked chauffeurs for transfers, airports, hours or a whole day. Fixed price before you confirm.";

export const standards = [
  { n: "01", text: "Your chauffeur is at arrivals before you are." },
  { n: "02", text: "If your flight moves, your pickup moves with it." },
  { n: "03", text: "The price you confirm is the price you pay." },
  { n: "04", text: "You know your chauffeur's name the evening before." },
] as const;

/** Chapter 01, one morning minute by minute. A sample journey, example data. */
export const morning = [
  {
    time: "06:40",
    title: "Flight checked before the car leaves.",
    line: "BA117 from New York is due to land at Heathrow Terminal 5 at 07:35.",
  },
  {
    time: "07:25",
    title: "Landed twelve minutes early.",
    line: "Touchdown at 07:23. The pickup moves from 08:05 to 07:53. Nobody had to call.",
  },
  {
    time: "07:55",
    title: "At arrivals, holding your name.",
    line: "Your chauffeur is in the hall before you clear passport control.",
  },
  {
    time: "08:40",
    title: "At the door in Mayfair.",
    line: "The price is the one you confirmed. Nothing added for the early landing.",
  },
] as const;

export const sampleBoardName = "Ms E. Hartley";

export const terms = [
  `Free cancellation up to ${serviceRules.freeCancellationHours} hours before pickup. After that, the full fare is charged.`,
  `Waiting time is included as set for your service. Extra waiting is charged in 15-minute steps.`,
  `Changes are free until your chauffeur leaves for the pickup.`,
] as const;
