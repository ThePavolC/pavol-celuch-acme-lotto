import React from "react";

import Card from "react-bootstrap/Card";

const EmptyCard = ({ text = "No lottery" }) => {
    return <Card body>{text}</Card>;
};

export default EmptyCard;
