import React from "react";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

const EmptyBallots = ({ text = "No ballots" }) => {
    return <Card body>{text}</Card>;
};

EmptyBallots.propTypes = {
    text: PropTypes.string,
};

EmptyBallots.defaultProps = {
    name: "No ballots",
};

export default EmptyBallots;
