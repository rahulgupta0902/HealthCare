import React  , {useState} from 'react';
import Select from 'react-select';
import './Dropdown.css'
export const  Dropdown = () => {
  const data = [
    {
      value: 1,
      label: 'I work on my skills and make impressive presentations'
    },
    {
      value: 2,
      label: "I learn from my failures and succeed."
    },
    {
      value: 3,
      label: "There is always hope for me."
    },
    {
      value: 4,
      label: "I will need sometime to adjust my routine to get back to office. Till then I can continue working as a responsible employee from home."
    }
    
  ];

  const [selectedOption, setSelectedOption] = useState<any>(null);

  // handle onChange event of the dropdown
  const handleChange = (e: any) => {
    setSelectedOption(e);
  }

  return (
    <div className="dropdown">
      

      <Select
        placeholder="Choose your thoughts"
        value={selectedOption} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
      />

      
    </div>
  );
}


