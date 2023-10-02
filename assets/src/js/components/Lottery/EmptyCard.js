import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

const EmptyCard = ({ text = "No lottery" }) => {
    return <Card body>{text}</Card>;
};

EmptyCard.propTypes = {
    text: PropTypes.string,
};

EmptyCard.defaultProps = {
    name: "No lottery",
};

export default EmptyCard;
