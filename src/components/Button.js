import React from "react";

const Button = () => {

    const [count, setCount] = React.useState(0);

    const handleCountChange = () => {
        setCount(count + 1);
    };

    return (<div><button onClick={handleCountChange}>Count is {count}</button></div>)
};

export default Button;