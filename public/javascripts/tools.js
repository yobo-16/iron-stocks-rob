require("dotenv").config();
function printTheChart(stockData) {
  const dailyData = stockData["Time Series (Daily)"];
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map((date) => dailyData[date]["4. close"]);

  const ctx = document
    .getElementById(`my-chart${dataArray.length - 1}`)
    .getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "transparent",
          borderColor: "green",
          data: stockPrices,
        },
      ],
    },
  });
}

function newData(company) {
  return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${process.env.KEY1}`;
}

module.exports = { printTheChart, newData };
