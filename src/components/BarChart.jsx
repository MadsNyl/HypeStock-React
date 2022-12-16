import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export function BarChart({ chartData, color }) {
    Chart.defaults.color = color;

    return (
        <div className="max-w-lg w-full">
            <Bar 
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: "day / month",
                                color: color
                            },
                            grid: {
                                display: false,
                                color: color
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: "Volume traded",
                                color: color
                            },
                            grid: {
                                display: false,
                                color: color
                            }
                        }
                    }
                }}
            />
        </div>
    );
}