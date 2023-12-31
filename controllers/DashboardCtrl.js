const moment = require("moment");
const Order = require("../models/Order");
const { formatCurrency } = require("../utils/formatting");

const targetQ4 = 3621592;

const calculateWeekOrderIntake = (orders, weeknumber) => {
    const value = orders.reduce((total, current) => {
        const orderWeek = moment(current.date).week();

        if (weeknumber === orderWeek) {
            return total + current.value;
        } else {
            return total;
        }
    }, 0);
    return value;
};

exports.dashboard = async (req, res) => {
    const thisWeek = moment().week();
    const lastWeek = thisWeek - 1;
    const weekEndYear = 51;
    const orders = await Order.find();
    const totalValue = orders.reduce((total, current) => {
        return total + current.value;
    }, 0);

    const birthdayBo = moment("2023-12-18", "YYYY-MM-DD");
    const today = moment(new Date(), "YYYY-MM-DD");

    const daystoBirthdayBo = Math.floor(
        moment.duration(birthdayBo.diff(today)).asDays()
    );

    const q4Intake = orders.reduce((total, current) => {
        const quarter = moment(current.date).quarter();
        if (quarter === 4) {
            return total + current.value;
        } else {
            return total;
        }
    }, 0);

    const forecastDelta = targetQ4 - q4Intake;

    const orderValueThisWeek = calculateWeekOrderIntake(orders, thisWeek);
    const orderValueLastWeek = calculateWeekOrderIntake(orders, lastWeek);

    const numberOfWeeksLeft = weekEndYear + 1 - thisWeek; // Add one week to make sure the actual week is also calculated
    const weekTargetOrderIntake = forecastDelta / (numberOfWeeksLeft - 1);
    const positiveWeekTarget = weekTargetOrderIntake - orderValueThisWeek < 0;

    res.render("dashboard", {
        total: formatCurrency(totalValue),
        targetQ4: formatCurrency(targetQ4),
        intakeQ4: formatCurrency(q4Intake),
        delta: formatCurrency(forecastDelta),
        thisWeek: formatCurrency(orderValueThisWeek),
        lastWeek: formatCurrency(orderValueLastWeek),
        positiveWeekTarget: positiveWeekTarget,
        weektarget: formatCurrency(weekTargetOrderIntake),
        weeksToGo: formatCurrency(numberOfWeeksLeft),
        daystoBirthdayBo: daystoBirthdayBo,
    });
};

exports.settings = async (req, res, next) => {
    res.render("settings", { targetQ4 });
};
