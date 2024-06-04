import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { getDatosChartLineFetch, getDatosChartPieFetch } from "../../services/InstrumentosJson";
import { NavBar } from "../../navBar/NavBar";
import { getStats, getStatsDetalle } from "../../services/PedidoJson";



export const optionsLine = {
        title: "Compras Vs Ventas",
        curveType: "function",
        legend: { position: "bottom" },
};

export const optionsPie = {
  title: "Cantidad de Articulos Venta",
};

function ChartsGoogle() {   

    const [datosChartLine, setDatosChartLine] = useState<any>();
    const [datosChartPie, setDatosChartPie] = useState<any>();
    
    const getLineChart =  async () => {
        //const datosBackend = await getDatosChartLineFetch();
        //console.log(datosBackend);
        setDatosChartLine([
            ["Anio - Mes", "Cantidad"],
            ...(await getStats()).map(([anio, mes, cantidad]: any[]) => {
                return [
                    anio + ' ' + mes,
                    cantidad
                ]
            })
          ]);
    }

    const getPieChart =  async () => {
        setDatosChartPie([
            ["Instrumento", "Cantidad"],
            ...await getStatsDetalle()
          ]);
    }

    useEffect(() => {
        getLineChart();
        getPieChart();
    }, []);


    return (
            <>
            <Chart
            className="pt-5"
            chartType="Bar"
            data={datosChartLine}
            options={{
                title: "Cantidad de pedidos por mes",
                curveType: "function",
                legend: { position: "bottom" },
            }}
            width="100%"
            height="400px"
            />    
            <Chart
            chartType="PieChart"
            data={datosChartPie}
            options={{
                title: "Cantidad de intrumentos en pedidos",
                curveType: "function",
                legend: { position: "bottom" },
            }}
            width={"100%"}
            height={"400px"}
            />        
            </>
            )
    }
    
export default ChartsGoogle