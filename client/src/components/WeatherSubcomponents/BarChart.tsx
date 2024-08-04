import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as BarChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import "chartjs-adapter-date-fns";

BarChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: number[][];
  labels: string[];
  dataLabels: string[];
  unit: string[];
  backgroundColors: string[];
}

interface DatasetsProps {
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  data: any;
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    return newTime;
  };

  let dataArrs: number[][] = props.data;
  for (let i = 0; i < dataArrs.length; i++) {
    dataArrs[i] = dataArrs[i].map((num) => parseFloat(num.toFixed(1)));
  }

  const datasetsArray: DatasetsProps[] = [];

  for (let i = 0; i < dataArrs.length; i++) {
    const datasetObj = {} as DatasetsProps;

    datasetObj.label = props.dataLabels[i];
    datasetObj.backgroundColor = props.backgroundColors[i];
    datasetObj.borderColor = "rgba(0, 0, 0, 0.1)";
    datasetObj.borderWidth = 1;
    datasetObj.data = props.labels.map((item: string, index: number) => {
      return {
        x: parseTime(item),
        y: dataArrs[i][index],
      };
    });

    datasetsArray.push(datasetObj);
  }

  const chartData = {
    datasets: datasetsArray,
  };

  const options: ChartOptions<"bar"> = {
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
        title: {
          display: true,
          text: "Time (HH:mm)",
        },
      },
      y: {
        title: {
          display: true,
          text: `${props.dataLabels[0]} (${props.unit[0]})`,
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
          label: (context: TooltipItem<"bar">) => {
            const datasetIndex = context.datasetIndex;
            const dataIndex = context.dataIndex;
            const dataset = context.chart.data.datasets[datasetIndex];
            const yData = (dataset.data[dataIndex] as { y: number }).y;
            return `${dataset.label}: ${yData}${props.unit[datasetIndex]}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
