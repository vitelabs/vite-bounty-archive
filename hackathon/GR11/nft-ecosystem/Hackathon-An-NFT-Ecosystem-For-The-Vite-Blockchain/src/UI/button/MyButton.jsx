import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {
    let rootClasses=[classes.myBtn]
    if(props.disabled) {
        rootClasses=[classes.myBtn__disabled];
    }
    return (
        <button {...props} className={rootClasses}>
            {children}
        </button>
    );
};

export default MyButton;