function drawCanvas() {
  const fields = document.querySelectorAll("canvas");
  fields.forEach((e) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${e.id}&apikey=FSM9BH6JKAPCX2OJ`
      )
      .then((responseFromAPI) => {
        printTheChart(responseFromAPI.data, e.id);
      })
      .catch((err) => console.log("Error while getting the data: ", err));
  });
}

function printTheChart(stockData, id) {
  const dailyData = stockData["Time Series (Daily)"];
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map((date) => dailyData[date]["4. close"]);

  const ctx = document.getElementById(id).getContext("2d");
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

document.addEventListener("load", drawCanvas());
