import { useState } from "react";
import classes from './MyDropDown.module.css'

const MyDropDown = ({onChange, options }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={classes.dropdown}>
      <div className={classes.btn} onClick={(e) => setIsActive(!isActive)}>
        Choose account
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className={classes.content}>
          {options.map((option) => (
            <div
              onClick={(e) => {
                onChange(option.address);
              }}
              key={option.address}
              className={classes.item}
            >
              {option.name}    {option.address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDropDown;