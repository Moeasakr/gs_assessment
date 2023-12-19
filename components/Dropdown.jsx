const Dropdown = ({ options, onChange, selectedOption }) => {
    return (
        <select onChange={onChange} className="w-1/2 md:w-full p-3 first:mr-5 md:mt-8 rounded-lg border border-gray-400 " defaultValue={selectedOption}>
          {Object.entries(options).map(entry => {
            let key = entry[0];
            let value = entry[1];
            return <option key={key} value={key}>{value}</option>
          })}
        </select>
    )
  }
  
  export default Dropdown