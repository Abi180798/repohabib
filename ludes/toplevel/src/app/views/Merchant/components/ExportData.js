import React, { useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { getDateTimeArrayIndo, thousandSeparator } from "../../../utils/index";
import { Button } from "antd";
import { USER } from "../../../utils/constants";
import store from "store";

const ExportData = (props) => {
  const [state,setState] = useState({
    data: null,
    dates: null
  })
  function print() {
    setState({
      data: props.data,
      dates: props.dates
    })
  }
  useEffect(() => {
    print()
  }, [props])
  return (
    <div>
      <ReactHTMLTableToExcel
        table="table-to-xls"
        filename={`Laporan Penjualan ${props.name} ${
          getDateTimeArrayIndo(new Date())[0].split(", ")[1]
        }`}
        sheet={`${getDateTimeArrayIndo(new Date())[0].split(", ")[1]}`}
        buttonText={
          <Button
            type="primary"
            style={{ textTransform: "capitalize" }}
          >{`Cetak`}</Button>
        }
      />

      <table
        id="table-to-xls"
        style={{ display: "none", fontFamily: "Arial Narrow", fontSize: 15 }}
      >
        <tr>
          <th colspan={3}>Laporan Penjualan {props.name}</th>
          <th></th>
          <th></th>
          <td colspan={2} style={{ textDecoration: "underline" }}>
            Patra Park Food Culinary
          </td>
          <th></th>
        </tr>
        <tr>
          <th colspan={3} style={{ textDecoration: "underline" }}></th>
          <th></th>
          <th></th>
          <td colspan={2} style={{ textDecoration: "underline" }}></td>
          <th></th>
        </tr>
        <tr>
          <td colspan={3}></td>
          <td></td>
          <td></td>
          <td colspan={2} style={{ textDecoration: "underline" }}>
            Tanggal : {getDateTimeArrayIndo(new Date())[0].split(", ")[1]}  
          </td>
          <td></td>
        </tr>
        <tr>
          <th colspan={2}></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th
            colspan={7}
            style={{ textAlign: "center", textDecoration: "underline" }}
          >Laporan</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th colspan={7} style={{ textAlign: "center" }}>
            Tanggal {props.dates.dateRange0 === null ? getDateTimeArrayIndo(new Date())[0].split(", ")[1] : `${getDateTimeArrayIndo(props.dates.dateRange0)[0].split(", ")[1]} - ${getDateTimeArrayIndo(props.dates.dateRange1)[0].split(", ")[1]}`}
          </th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th colspan={2}></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            NO
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            PRODUK
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            KATEGORI
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            TERJUAL
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            DISKON(RP)
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            PENDAPATAN
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            PENDAPATAN BERSIH
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            SHARING PROFIT
          </th>
        </tr>
        <tr />
        {
          state.data&&state.data.map((row, i) => (
            <tr>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {i+1}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {row.name}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {row.kategori}
              </td>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {row.terjual}
              </td>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {row.akumulasi_diskon}
              </td>
              <td
                style={{
                  textAlign: "right",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {thousandSeparator(parseFloat(row.pendapatan).toFixed(0))}
              </td>
              <td
                style={{
                  textAlign: "right",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {thousandSeparator(parseFloat(row.pendapatan_bersih).toFixed(0))}
              </td>
              <td
                style={{
                  textAlign: "right",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {thousandSeparator(parseFloat(row.sharing_profit).toFixed(0))}
              </td>
            </tr>
          ))
        }

        <tr />
        <tr />
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan={4} style={{ textAlign: "center" }}>
            {getDateTimeArrayIndo(new Date())[0].split(", ")[1]}
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan={4} style={{ textAlign: "center" }}>
            PATRA PARK
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr />
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td
            colspan={4}
            style={{ textAlign: "center", textDecoration: "underline" }}
          >
            {store.get(USER).name}
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan={4} style={{ textAlign: "center" }}></td>
        </tr>
      </table>
    </div>
  );
};

export default ExportData;
