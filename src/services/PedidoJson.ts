export const postPedido = async (items: any[], totalPedido: number | undefined) => {

    const pedido = {
        totalPedido,
        fechaPedido: new Date(),
        detalles: items.map(item => {
            return {
                instrumento: item,
                cantidad: item.cantidad
            }
        })
    }

    const data = await fetch(`http://localhost:8080/pedido`, {
            method: 'POST',
            body: JSON.stringify(pedido),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return data.json();

}

export const getStats = async () => {
    const data = await fetch(`http://localhost:8080/pedido/stats`)
    return data.json();
}

export const getStatsDetalle = async () => {
    const data = await fetch(`http://localhost:8080/pedidoDetalle/stats`)
    return data.json();
}