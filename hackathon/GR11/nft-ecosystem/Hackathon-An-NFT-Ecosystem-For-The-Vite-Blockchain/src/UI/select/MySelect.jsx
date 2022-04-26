import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange}) => {
    return(
        <select className={classes.MySlct}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
          <option  value="">{defaultValue}</option>
          {options.map(option =>
            <option 
                value={option.address}
                key={option.address}
                >
                {option.name}  {option.address}
                </option>
            )}
        </select>
    );
};


export default MySelect;