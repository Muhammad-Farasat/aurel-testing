import { useInView } from "../../hooks";
import { ChapterFrame } from "../../components/story/Story";
import { ButtonLink } from "../../components/Button";
import { formatMoney } from "../../config/market";

/** EXAMPLE DATA: a sample monthly statement. Names and amounts are invented for illustration. */
const rows = [
  { date: "03 Nov", who: "D. Mensah", route: "Heathrow T5 → The Ned", centre: "Sales", amount: 145 },
  { date: "06 Nov", who: "R. Iyer", route: "Canary Wharf, 4 hours", centre: "Client services", amount: 290 },
  { date: "11 Nov", who: "Visitor: K. Brandt", route: "London City → St Mary Axe", centre: "Partnerships", amount: 95 },
  { date: "18 Nov", who: "D. Mensah", route: "The Ned → Heathrow T5", centre: "Sales", amount: 145 },
  { date: "24 Nov", who: "Board dinner, 6 guests", route: "Full day, Luxury Van", centre: "Executive office", amount: 905 },
];

/** Chapter 05: for organisations. Statement left, the statement sheet right. */
export function Organisations() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const total = rows.reduce((s, r) => s + r.amount, 0);
  return (
    <section className="orgs on-dark" data-ground="dark" aria-labelledby="orgs-title">
      <ChapterFrame label="05 Business" />
      <div className="wrap grid orgs__grid">
        <div className="orgs__copy">
          <h2 id="orgs-title" className="t-display orgs__title">
            One statement for every journey your company books.
          </h2>
          <p className="orgs__body measure">
            Book for colleagues and visitors, add a cost centre to each journey, and get a single invoice at the end of
            the month.
          </p>
          <ButtonLink to="/business" variant="secondary" arrow viewTransition>
            Accounts for business
          </ButtonLink>
        </div>
        <div className={inView ? "sheet is-filled" : "sheet"} ref={ref} aria-label="Example monthly statement">
          <div className="sheet__head">
            <p className="t-label">Statement, November</p>
            <p className="t-label muted">Example</p>
          </div>
          <table className="sheet__table">
            <thead>
              <tr>
                <th scope="col" className="t-label">Date</th>
                <th scope="col" className="t-label">Traveller and journey</th>
                <th scope="col" className="t-label sheet__centre">Cost centre</th>
                <th scope="col" className="t-label sheet__num">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ ["--d" as string]: `${i * 60}ms` }} className={i > 2 ? "sheet__extra" : undefined}>
                  <td className="tnum">{r.date}</td>
                  <td>
                    <span className="sheet__who">{r.who}</span>
                    <span className="t-small sheet__route">{r.route}</span>
                  </td>
                  <td className="t-small sheet__centre">{r.centre}</td>
                  <td className="tnum sheet__num">{formatMoney(r.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ ["--d" as string]: `${rows.length * 60}ms` }}>
                <th scope="row" colSpan={3} className="t-label">
                  Total, one invoice
                </th>
                <td className="tnum sheet__num sheet__total">{formatMoney(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
