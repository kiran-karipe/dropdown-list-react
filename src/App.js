
import './App.css';
import React, { useState } from 'react';
import Dropdown from './components/dropdown/dropdown';
import getOptions from './mock/data';

function App() {
  const [options, setOptions] = useState(getOptions);

  const handleSelect = selectedOptions => { // set state after each selection
    const newOptions = options.map(option => (
      {
        ...option, 
        isSelected: selectedOptions
          .map(selectedOption => selectedOption.value)
          .includes(option.value)
      }
    ));

    setOptions(newOptions);
  }

  return (
    <div className="App">
      <div className="dropdownTitle"><b>Select an option</b></div>
      <Dropdown
        options={options}
        optionSelect={handleSelect}/>
    </div>
  );
}

export default App;
