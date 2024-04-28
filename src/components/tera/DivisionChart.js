import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function  DivisionChart({ labels1, data1 }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data.labels = labels1;
      const newdataSet = data1.map((item) => ({
        ...item,
        barPercentage: 0.2,
        barThickness: 50,
        maxBarThickness: 40,
        minBarLength: 10,
        borderWidth: 1,
      }));
      chartInstance.current.data.datasets = newdataSet;
      chartInstance.current.update();
    }
  }, [labels1, data1]);

  useEffect(() => {
    if (!chartInstance.current) {
      const datasets = data1.map((item) => ({
        label: item.label,
        backgroundColor: item.backgroundColor,
        data: item.data,
        barPercentage: 0.2,
        barThickness: 50,
        maxBarThickness: 40,
        minBarLength: 10,
        borderWidth: 1,
      }));

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels1 || ["1", "2", "3", "4", "5"],
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              // stacked: true,
            },
            x: {
              // stacked: true,
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

export default DivisionChart;
