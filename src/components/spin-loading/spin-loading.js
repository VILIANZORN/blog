import React from "react";
import {Spin} from 'antd'

export default function SpinLoading() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spin />
        </div>
    )
}