import CurrencyFlag from './CurrencyFlag'

const GraphHeader = ({flagCountries, finalClose, priceDifference}) => {
  // Calculates the percentage change between the first and last close prices
  const percentageChange = (priceDifference / finalClose) * 100;

  // The currency symbols to be used in the graph header
  const currencySymbols = {
    AED: "د.إ",
    ALL: "L",
    AOA: "Kz",
    ARS: "$",
    AUD: "$",
    BDT: "৳",
    BGN: "лв",
    BHD: "ب.د",
    BRL: "R$",
    CAD: "$",
    CHF: "CHF",
    CLP: "$",
    CNH: "CNH",
    CNY: "¥",
    COP: "$",
    CZK: "Kč",
    DKK: "kr",
    EGP: "E£",
    EUR: "€",
    GBP: "£",
    GHS: "GH₵",
    HKD: "HK$",
    HRK: "kn",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    INR: "₹",
    ISK: "kr",
    JOD: "د.ا",
    JPY: "¥",
    KES: "Ksh",
    KRW: "₩",
    KWD: "د.ك",
    LBP: "ل.ل",
    LKR: "රු",
    MAD: "د.م.",
    MUR: "₨",
    MXN: "$",
    MYR: "RM",
    NGN: "₦",
    NOK: "kr",
    NZD: "$",
    OMR: "ر.ع.",
    PEN: "S/",
    PHP: "₱",
    PKR: "₨",
    PLN: "zł",
    QAR: "ر.ق",
    RON: "lei",
    RUB: "₽",
    SAR: "ر.س",
    SEK: "kr",
    SGD: "$",
    THB: "฿",
    TND: "د.ت",
    TRY: "₺",
    TWD: "NT$",
    USD: "$",
    VND: "₫",
    XAF: "FCFA",
    XAG: "XAG",
    XAU: "XAU",
    XOF: "CFA",
    XPD: "XPD",
    XPT: "XPT",
    ZAR: "R",
    ZWL: "Z$",
  };

  return (
    <div className='flex flex-col pl-5 pt-2 pr-5'>
      <div className='flex flex-row space-x-2'>
        <CurrencyFlag country={flagCountries[0]}/>
        <CurrencyFlag country={flagCountries[1]}/>
        <button className='rounded-full border-2 -mt-1 p-0.5 px-4 font-bold text-[#999EA8] bg-[#F3F4F6]'>Forex.com</button>
      </div>

      <div className='flex flex-row justify-between'>
        <span className='font-bold text-2xl'>
          {flagCountries[0]}/{flagCountries[1]}
        </span>
        <div className='flex flex-col justify-end '>
          <div className='text-2xl text-right'>
            {currencySymbols[flagCountries[0]]} {finalClose}
          </div>
          <div className={`flex flex-col md:flex-row text-right ${priceDifference > 0 ? "text-green-300" : "text-red-300"}`}>
            <div>
              {priceDifference.toFixed(6)}
            </div>
            <div>
              ({percentageChange.toFixed(6)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GraphHeader