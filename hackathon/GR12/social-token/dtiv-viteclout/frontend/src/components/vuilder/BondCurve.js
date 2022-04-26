import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, ResponsiveContainer} from 'recharts';
import CustomizedDot from '../chart/CustomizedDot'

const BondCurve = (props) => {
    return (
        <ResponsiveContainer className = "response-cont" width="100%" height="100%">
            <LineChart 
                className = "line-chart"
                width={4} 
                height={420} 
                data={props.data}
                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot={<CustomizedDot current_price={props.current_price}/>}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name">
                    <Label className="chart-labal" value="VFT Sold" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'price (VITE)', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default BondCurve
