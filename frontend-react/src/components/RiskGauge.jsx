import {
  RadialBarChart,
  RadialBar
} from "recharts";

export default function RiskGauge({
  score
}) {

  const data = [
    {
      name: "Risk",
      value: score
    }
  ];

  return (

    <RadialBarChart
      width={300}
      height={300}
      data={data}
      innerRadius="20%"
      outerRadius="100%"
    >
      <RadialBar
        dataKey="value"
      />
    </RadialBarChart>

  );
}