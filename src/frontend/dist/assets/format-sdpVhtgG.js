function formatCurrencyWithCode(amount, currencyCode) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: currencyCode === "JPY" ? 0 : 2
  }).format(amount);
}
function formatDate(timestamp) {
  const ms = typeof timestamp === "bigint" ? Number(timestamp) : timestamp;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function getCurrentMonth() {
  const now = /* @__PURE__ */ new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(month) {
  const [year, mon] = month.split("-");
  const date = new Date(Number(year), Number(mon) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
function getCurrencySymbol(currencyCode) {
  const symbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AED: "د.إ"
  };
  return symbols[currencyCode] ?? currencyCode;
}
export {
  getCurrentMonth as a,
  formatDate as b,
  formatCurrencyWithCode as f,
  getCurrencySymbol as g,
  monthLabel as m
};
