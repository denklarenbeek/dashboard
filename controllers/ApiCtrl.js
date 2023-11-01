const excelToJson = require("convert-excel-to-json");
const moment = require("moment");
const Order = require("../models/Order");

exports.importOrders = async (req, res) => {
    const result = excelToJson({
        source: req.file.buffer,
        header: { rows: 1 },
        columnToKey: {
            A: "id",
            B: "title",
            C: "date",
            D: "sales_rep",
            E: "value",
            F: "category",
        },
    });

    const data = result.Blad1.map(async (item) => {
        const newOrder = {
            id: item.id,
            title: item.title,
            value: item.value,
            sales_rep: item.sales_rep,
            category: item.category,
            date: moment(item.date).add(2, "h"),
        };

        try {
            const orderExist = await Order.find({ id: item.id });
            if (orderExist.length > 0) {
                await Order.findByIdAndUpdate(orderExist[0]._id, newOrder);
            } else {
                const savedOrder = await Order.create(newOrder);
            }
        } catch (error) {
            console.error(error);
        }
    });
    res.redirect("/");
};
