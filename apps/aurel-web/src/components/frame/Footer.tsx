import { Link } from "react-router-dom";
import { indexGroups, legalLinks } from "../../config/sitemap";
import { tagline } from "../../config/copy";
import { market } from "../../config/market";

/** Compact index on night ground, used on every page except home and booking steps. */
export function Footer({ bare = false }: { bare?: boolean }) {
  return (
    <footer className={bare ? "footer footer--bare on-dark" : "footer on-dark"} data-ground="dark" data-hide-action>
      <div className="wrap">
        {!bare ? (
          <div className="footer__grid">
            {indexGroups.map((g) => (
              <nav key={g.title} aria-label={g.title} className="footer__group">
                <h2 className="t-label muted">{g.title}</h2>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} viewTransition>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        ) : null}
        <div className="footer__base t-small">
          <p className="footer__tag">
            <span className="t-board footer__mark">AUREL</span> <span className="muted">{tagline}</span>
          </p>
          <a className="tnum" href={market.phoneHref}>
            {market.phone}
          </a>
          <ul className="footer__legal">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
