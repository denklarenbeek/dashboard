const moment = require("moment");
const Order = require("../models/Order");
const { formatCurrency } = require("../utils/formatting");

const targetQ4 = 3880021;

exports.dashboard = async (req, res) => {
    const orders = await Order.find();
    const totalValue = orders.reduce((total, current) => {
        return total + current.value;
    }, 0);

    const q4Intake = orders.reduce((total, current) => {
        const quarter = moment(current.date).quarter();
        if (quarter === 4) {
            return total + current.value;
        } else {
            return total;
        }
    }, 0);

    const forecastDelta = targetQ4 - q4Intake;

    res.render("dashboard", {
        total: formatCurrency(totalValue),
        targetQ4: formatCurrency(targetQ4),
        intakeQ4: formatCurrency(q4Intake),
        delta: formatCurrency(forecastDelta),
    });
};
