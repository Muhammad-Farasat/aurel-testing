import { Navigate, Outlet, ScrollRestoration, createBrowserRouter, useMatches } from "react-router-dom";
import { Header } from "./components/frame/Header";
import { PersistentAction } from "./components/frame/PersistentAction";
import { Footer } from "./components/frame/Footer";
import { Home } from "./pages/home/Home";
import { AirportTransfers } from "./pages/AirportTransfers";
import { Fleet } from "./pages/Fleet";
import { InPreparation, NotFound } from "./pages/InPreparation";
import { BookingDetails } from "./pages/booking-details/BookingDetails";
import { BookLayout } from "./pages/book/BookLayout";
import { JourneyStep } from "./pages/book/JourneyStep";
import { VehicleStep } from "./pages/book/VehicleStep";
import { DetailsStep } from "./pages/book/DetailsStep";
import { ReviewStep } from "./pages/book/ReviewStep";
import { plannedPages } from "./config/sitemap";

interface Handle {
  footer?: "none" | "compact";
}

function SiteLayout() {
  const matches = useMatches();
  const footer = (matches.at(-1)?.handle as Handle | undefined)?.footer ?? "compact";
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      {footer === "compact" ? <Footer /> : null}
      <PersistentAction />
      <ScrollRestoration />
    </>
  );
}

function BookShell() {
  return (
    <>
      <BookLayout />
      <ScrollRestoration />
    </>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SiteLayout />,
      children: [
        { index: true, element: <Home />, handle: { footer: "none" } satisfies Handle },
        { path: "airport-transfers", element: <AirportTransfers /> },
        { path: "fleet", element: <Fleet /> },
        { path: "booking/:ref", element: <BookingDetails /> },
        ...plannedPages.map((p) => ({ path: p.path.slice(1), element: <InPreparation page={p} /> })),
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/book",
      element: <BookShell />,
      children: [
        { index: true, element: <Navigate to="journey" replace /> },
        { path: "journey", element: <JourneyStep /> },
        { path: "vehicle", element: <VehicleStep /> },
        { path: "details", element: <DetailsStep /> },
        { path: "review", element: <ReviewStep /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
