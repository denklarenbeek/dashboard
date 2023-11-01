exports.formatCurrency = (value, decimal = 0) => {
    return new Intl.NumberFormat("nl-NL", {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
    }).format(value);
};
