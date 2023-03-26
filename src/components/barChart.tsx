import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { AxisBottomProps, AxisLeftProps, BarsProps, IData } from './chart.interface';


function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const xAsis = d3.select(ref.current)
        .call(d3.axisBottom(scale).tickSize(0))
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}
function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).call(d3.axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bar({
  x,
  y,
  width,
  height,
  color,
  amount
}: any) {
  const [activeFill, setActiveFill] = useState<boolean>(false)
  const radius = width * 0.15;

  const barRef = useRef<SVGPathElement | null>(null)

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .style("border-radius", "5px")
    .style("color", "white")
    .style("text-align", "center")
    .style("padding", "5px")
    .text(`$${amount}`);




  return (

    <>
      <path
        ref={barRef}
        d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - 2 * radius}
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius}
      h-${width}
      z
    `}
        onMouseOver={(e) => {
          tooltip.style("visibility", "visible")
          const { x, y, width, height } = barRef.current!.getBoundingClientRect()
          tooltip.style("left", `${x}px`)
          tooltip.style("top", `${y - 40}px`)
          // tooltip.style("width", `${width}px`)

        }}

        onMouseLeave={() => {
          setActiveFill(false)
          tooltip.style("visibility", "hidden")
        }}
        fill={activeFill ? 'hsl(186, 34%, 60%)' : color}
        className='hover: cursor-pointer' />

    </>
  );
}

function Bars({ height, scaleX, scaleY, data }: BarsProps) {
  return (
    <g>

      {data.map(({ day, amount }) => (
        <>

          <Bar
            key={`bar-${day}`}
            x={scaleX(day)}
            y={scaleY(amount)}
            width={scaleX.bandwidth()}
            height={height - scaleY(amount)}
            color="hsl(10, 79%, 65%)"
            amount={amount}
          />
        </>
      ))}
    </g>
  );
}

const BarGraph = ({ w, h, data }: { w: number, h: number, data: Array<IData> }) => {
  const margin = { top: 0, right: 0, bottom: 20, left: 0 };
  const width = w - margin.left - margin.right;
  const height = h - margin.top - margin.bottom;

  const scaleX = d3.scaleBand()
    .domain(data.map(({ day }) => day))
    .range([0, width])
    .padding(0.1)
  // .padding(0)


  const scaleY = d3.scaleLinear()
    .domain([0, Math.max(...data.map(({ amount }) => amount))])
    .range([height, 0]);



  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        {/* <AxisLeft scale={scaleY} /> */}
        <Bars scaleX={scaleX} height={height} scaleY={scaleY} data={data} />
      </g>
    </svg>
  );
};

export default BarGraph;
