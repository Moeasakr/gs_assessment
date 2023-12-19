import 'currency-flags/dist/currency-flags.min.css'

const CurrencyFlag = ({ country }) => {
    return (
    <div className="np-theme-personal">
      <div className={`currency-flag currency-flag-${country.toLowerCase()}`}></div>
    </div>
  )
}

export default CurrencyFlag