import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function RevenueChart({ labels1, data1 }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data.labels = labels1;
      chartInstance.current.data.datasets[0].data = data1;
      chartInstance.current.update();
    }
  }, [labels1, data1]);

  useEffect(() => {
    if (!chartInstance.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels1,
          datasets: [
            {
              label: "Doanh thu",
              data: data1,
              barPercentage: 0.2,
              barThickness: 50,
              maxBarThickness: 40,
              minBarLength: 10,
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              hoverBackgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(255, 206, 86, 0.4)",
                "rgba(75, 192, 192, 0.4)",
                "rgba(153, 102, 255, 0.4)",
                "rgba(255, 159, 64, 0.4)",
              ],
              hoverBorderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [labels1, data1]);

  return (
    <canvas
      ref={chartRef}
      id="myChart"
      style={{ width: "700px", height: "430px" }}
      className="w-full mx-auto"
    ></canvas>
  );
}

export default RevenueChart;
