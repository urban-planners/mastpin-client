import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { PresentationInterface } from "../../../../types";

const CompareResultsChart = ({
  simulationData,
  evaluationData,
}: {
  simulationData: PresentationInterface;
  evaluationData: PresentationInterface;
}) => {
  const [chart, setChart] = useState<Chart | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Chart.register(...registerables);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d") as CanvasRenderingContext2D;
      const newChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(simulationData),
          datasets: [
            {
              label: "Simulation",
              data: Object.values(simulationData),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
              fill: false,
            },
            {
              label: "Evaluation",
              data: Object.values(evaluationData),
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
              fill: false,
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
      setChart(newChartInstance);
    }
  }, [simulationData, evaluationData]);

  return <canvas ref={chartRef} />;
};

export default CompareResultsChart;
