/**
 * EXAMPLE DATA. Places offered by the mock autocomplete. London is a
 * placeholder market (see src/config/market.ts). Hotels are real London
 * addresses used only as sample destinations; no partnership is implied.
 */
export type PlaceKind = "airport" | "hotel" | "address";

export interface Place {
  id: string;
  kind: PlaceKind;
  /** Full label, e.g. "Heathrow Terminal 5". */
  label: string;
  /** Short label for chips, e.g. "Heathrow T5". */
  short: string;
  /** Second line in results. */
  detail: string;
  lat: number;
  lng: number;
  /** Airport code for airports. */
  code?: string;
  /** False for places outside the service area. */
  covered?: boolean;
}

export const places: Place[] = [
  { id: "lhr-t2", kind: "airport", label: "Heathrow Terminal 2", short: "Heathrow T2", detail: "LHR, Hounslow TW6", lat: 51.4694, lng: -0.4513, code: "LHR" },
  { id: "lhr-t3", kind: "airport", label: "Heathrow Terminal 3", short: "Heathrow T3", detail: "LHR, Hounslow TW6", lat: 51.4709, lng: -0.4588, code: "LHR" },
  { id: "lhr-t4", kind: "airport", label: "Heathrow Terminal 4", short: "Heathrow T4", detail: "LHR, Hounslow TW6", lat: 51.4588, lng: -0.4467, code: "LHR" },
  { id: "lhr-t5", kind: "airport", label: "Heathrow Terminal 5", short: "Heathrow T5", detail: "LHR, Longford TW6", lat: 51.4723, lng: -0.4887, code: "LHR" },
  { id: "lgw-n", kind: "airport", label: "Gatwick North Terminal", short: "Gatwick North", detail: "LGW, Horley RH6", lat: 51.1615, lng: -0.1772, code: "LGW" },
  { id: "lgw-s", kind: "airport", label: "Gatwick South Terminal", short: "Gatwick South", detail: "LGW, Horley RH6", lat: 51.1563, lng: -0.1611, code: "LGW" },
  { id: "lcy", kind: "airport", label: "London City Airport", short: "London City", detail: "LCY, Royal Docks E16", lat: 51.5048, lng: 0.0495, code: "LCY" },
  { id: "man", kind: "airport", label: "Manchester Airport", short: "Manchester", detail: "MAN, outside the London area", lat: 53.3588, lng: -2.2727, code: "MAN", covered: false },

  { id: "savoy", kind: "hotel", label: "The Savoy", short: "The Savoy", detail: "Strand, WC2R", lat: 51.5101, lng: -0.1205 },
  { id: "claridges", kind: "hotel", label: "Claridge's", short: "Claridge's", detail: "Brook Street, Mayfair W1K", lat: 51.5126, lng: -0.1478 },
  { id: "connaught", kind: "hotel", label: "The Connaught", short: "The Connaught", detail: "Carlos Place, Mayfair W1K", lat: 51.5098, lng: -0.1494 },
  { id: "langham", kind: "hotel", label: "The Langham", short: "The Langham", detail: "Portland Place, Marylebone W1B", lat: 51.5179, lng: -0.1441 },
  { id: "ned", kind: "hotel", label: "The Ned", short: "The Ned", detail: "Poultry, City of London EC2R", lat: 51.5136, lng: -0.0899 },
  { id: "shard", kind: "hotel", label: "Shangri-La The Shard", short: "The Shard", detail: "St Thomas Street, SE1", lat: 51.5045, lng: -0.0865 },
  { id: "corinthia", kind: "hotel", label: "Corinthia London", short: "Corinthia", detail: "Whitehall Place, SW1A", lat: 51.5066, lng: -0.1243 },

  { id: "grosvenor", kind: "address", label: "12 Grosvenor Square", short: "Grosvenor Sq", detail: "Mayfair, W1K", lat: 51.5113, lng: -0.1518 },
  { id: "canada-sq", kind: "address", label: "1 Canada Square", short: "Canary Wharf", detail: "Canary Wharf, E14", lat: 51.5049, lng: -0.0195 },
  { id: "st-mary-axe", kind: "address", label: "30 St Mary Axe", short: "St Mary Axe", detail: "City of London, EC3A", lat: 51.5145, lng: -0.0803 },
  { id: "kings-cross", kind: "address", label: "King's Cross St Pancras", short: "King's Cross", detail: "Euston Road, N1C", lat: 51.5308, lng: -0.1238 },
  { id: "albert-hall", kind: "address", label: "Royal Albert Hall", short: "Albert Hall", detail: "Kensington Gore, SW7", lat: 51.5009, lng: -0.1774 },
  { id: "chelsea", kind: "address", label: "48 Cheyne Walk", short: "Cheyne Walk", detail: "Chelsea, SW3", lat: 51.4826, lng: -0.1705 },
  { id: "hampstead", kind: "address", label: "9 Well Walk", short: "Well Walk", detail: "Hampstead, NW3", lat: 51.5582, lng: -0.1727 },
  { id: "windsor", kind: "address", label: "Windsor Castle", short: "Windsor", detail: "Windsor, SL4", lat: 51.4839, lng: -0.6044 },
  { id: "oxford", kind: "address", label: "Radcliffe Square", short: "Oxford", detail: "Oxford, OX1", lat: 51.7534, lng: -1.2540 },
];

export function placeById(id: string | undefined | null): Place | undefined {
  return places.find((p) => p.id === id);
}
