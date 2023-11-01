exports.formatCurrency = (value, decimal = 2) => {
    return new Intl.NumberFormat("nl-NL", {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
    }).format(value);
};
