import * as d3 from 'd3';
export interface IData {
    day: string
    amount: number
}
export interface BarChartProps {
    data: Array<IData>
}
export interface BarsProps {
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
    data: Array<IData>
}
export interface AxisBottomProps {
    scale: d3.ScaleBand<string>;
    transform: string;
}
export interface AxisLeftProps {
    scale: d3.ScaleLinear<number, number, never>;
}