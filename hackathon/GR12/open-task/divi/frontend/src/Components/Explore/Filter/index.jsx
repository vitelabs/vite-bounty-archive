import { useState } from 'react';
import { NavDropdown, Form } from 'react-bootstrap';
import {RangeStepInput} from 'react-range-step-input';
import './styles.css'

const Filter = (props) => {
  const [rangeValue, setRangeValue] = useState(50)

  const onChange = (e) => {
    const newVal = e.target.value;
    setRangeValue(newVal);
  }

  return (
    <div>
       <NavDropdown
          className="Filter"
          title={ props.name }
        >
          <Form.Label> { props.name } </Form.Label>
          <Form.Range onChange={onChange} value={ rangeValue } onChange={ onChange } />
          {rangeValue}
      </NavDropdown>
    </div>
  );
}

export default Filter;
