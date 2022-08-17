import React from "react";
import Chart from "react-apexcharts";

export default (props:any) => {
  const options:any = {
    chart: {
      zoom: {
        enabled: false,
      },
      animations: {
        easing: "linear",
        dynamicAnimation: {
          speed: 500,
        },
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 1,
      dashArray: 0,
    },
    tooltip: {
      x: {
        format: "yyyy/MM/dd HH:mm:ss.f",
      },
    },
    xaxis: {
      type: "datetime",
      range: props.range,
      labels: {
        format: "ss",
      },
    },
    yaxis: {
      labels: {
        formatter: (val:any) => val.toFixed(0),
      },
      title: { text: "Value" },
    },
  };
  return (
    <Chart
      type="line"
      options={options}
      series={props.dataList}
      width="100%"
    
      height="450"
    />
  );
};
