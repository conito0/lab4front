import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { getDatosChartLineFetch, getDatosChartPieFetch } from "../../services/InstrumentosJson";
import { NavBar } from "../../navBar/NavBar";
import { getStats, getStatsDetalle } from "../../services/PedidoJson";
import { Col, Form, Row } from 'react-bootstrap';



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
    const [desde, setDesde] = useState<any>();
    const [hasta, setHasta] = useState<any>();
    
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

    const generarExcel = (desde: any, hasta: any) => {

        console.log(desde, hasta)

        if(!(desde && hasta)) {
            alert("Complete el desde y hasta para generar el informe")
            return;
        }

        desde = new Date(desde?.target?.value).toISOString();
        hasta = new Date(hasta?.target?.value).toISOString()

        window.open(`http://localhost:8080/pedido/excel?desde=${desde}&hasta=${hasta}`, "_blank");
    }  

    useEffect(() => {
        getLineChart();
        getPieChart();
    }, []);


    return (
            <>
            <Row>
                <Col>
                    <div style={{padding: "1rem"}}>
                        <h2>Reporte de pedidos</h2>
                        <div style={{width: "300px"}}>
                            <Form.Label htmlFor="inputPassword5">Desde</Form.Label>
                            <Form.Control
                                type="date"
                                id="desde"
                                aria-describedby="desde"
                                onChange={(e) => setDesde(e)}
                            />
                            <Form.Text id="desde" muted>
                                Ingrese la fecha desde para generar el reporte
                            </Form.Text>
                        </div>
                        <div style={{width: "300px"}}>
                            <Form.Label htmlFor="inputPassword5">Hasta</Form.Label>
                            <Form.Control
                                type="date"
                                id="hasta"
                                aria-describedby="hasta"
                                onChange={(e) => setHasta(e)}
                            />
                            <Form.Text id="hasta" muted>
                                Ingrese la fecha hasta para generar el reporte
                            </Form.Text>
                        </div>
                        <br></br>
                        <a className="btn btn-success" onClick={(_) => generarExcel(desde, hasta)}>Generar Excel</a>
                    </div>
                </Col>
                <Col>
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
                        
                </Col>
                <Col>
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
                </Col>
            </Row>
            </>
            )
    }
    
export default ChartsGoogle