import React from 'react'
import { Result } from 'antd'
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Thanks() {
    let query = useQuery();
    const status = query.get("status");
    let icon, title = "";
    switch (status) {
        case "0":
            icon = "success"
            title = "Unprocessed"
            break;
        case "1":
            icon = "success"
            title = "In Process"
            break;
        case "2":
            icon = "success"
            title = "Payment Success"
            break;
        case "3":
            icon = "error"
            title = "Payment Failed"
            break;
        case "4":
            icon = "success"
            title = "Payment Reversal"
            break;
        case "5":
            icon = "404"
            title = "No Bills Found"
            break;
        case "7":
            icon = "warning"
            title = "Payment Expired"
            break;
        case "8":
            icon = "warning"
            title = "Payment Cancelled"
            break;
        case "9":
            icon = ""
            title = "Unknown"
            break;
        default:
            icon = ""
            title = "Unknown"
            break;
    }
    return (
        <div>
            <Result
                status={icon}
                title={title}
            />,    
        </div>
    )
}
