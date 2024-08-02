// src/components/ScrollableLineChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  TimeScale,
  TooltipItem,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  TimeScale
);

interface TemperatureLineChartProps {
  data: number[][];
  labels: string[];
  dataLabels: string[];
  unit: string[];
  borderColors: string[];
  borderDashes: number[][];
}

interface DatasetsProps {
  label: string;
  borderColor: string;
  backgroundColor: string;
  borderDash: number[];
  borderWidth: number;
  data: any;
}

const LineChart: React.FC<TemperatureLineChartProps> = ({
  data,
  labels,
  dataLabels,
  unit,
  borderColors,
  borderDashes,
}) => {
  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    return newTime;
  };

  let temp_arrs: number[][] = data;
  for (let i = 0; i < temp_arrs.length; i++) {
    temp_arrs[i] = temp_arrs[i].map((num) => parseFloat(num.toFixed(1)));
  }

  const datasetsArray: DatasetsProps[] = [];

  for (let i = 0; i < data.length; i++) {
    const datasetObj = {} as DatasetsProps;

    datasetObj.label = dataLabels[i];
    datasetObj.borderColor = borderColors[i];
    datasetObj.borderWidth = 1;
    datasetObj.borderDash = borderDashes[i];
    datasetObj.data = labels.map((item: string, index: number) => {
      return {
        x: parseTime(item),
        y: temp_arrs[i][index],
      };
    });

    datasetsArray.push(datasetObj);
  }

  const chartData = {
    datasets: datasetsArray,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "hour" as const,
          tooltipFormat: "HH:mm",
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const datasetIndex = context.datasetIndex;
            const dataIndex = context.dataIndex;
            const dataset = context.chart.data.datasets[datasetIndex];
            const yData = (dataset.data[dataIndex] as { y: number }).y;
            return `${dataset.label}: ${yData}${unit[datasetIndex]}`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "1300px",
        height: "150px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "skyblue",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
