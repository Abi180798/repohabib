import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { getDateTimeArrayIndo, thousandSeparator } from "../../../utils/index";
import { Button } from "antd";
import { USER } from "../../../utils/constants";
import store from "store";

const ExportData = (props) => {
  return (
    <div>
      <ReactHTMLTableToExcel
        table="table-to-xls"
        filename={`Laporan Penjualan ${
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
          <th colspan={3}>Laporan Transaksi</th>
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
            Tanggal {getDateTimeArrayIndo(props.dates[0])[0].split(", ")[1]} - {getDateTimeArrayIndo(props.dates[1])[0].split(", ")[1]} 
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
            NAMA
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
            HARGA
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
            STOK
          </th>
          <th
            rowspan={2}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            TOTAL
          </th>
        </tr>
        <tr />
        {props.data &&
          props.data.map((row, i) => (
            <tr>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {i + 1}
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
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {thousandSeparator(parseFloat(row.harga))}
              </td>
              <td
                style={{
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
                {row.stock}
              </td>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {thousandSeparator(parseFloat(row.pendapatan_bersih))}
              </td>
            </tr>
          ))}
        <tr>
          <th
            colspan={6}
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            TOTAL PENDAPATAN BERSIH
          </th>
          <th
            style={{
              backgroundColor: "yellow",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
          >
            {thousandSeparator(props.total)}
          </th>
        </tr>
        <tr />
        {props.diskon&&(
          <tr>
          <th
          rowspan={2}
          style={{
            backgroundColor: "yellow",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
          >Nama Diskon</th>
          <th
          rowspan={2}
          style={{
            backgroundColor: "yellow",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
          >Tanggal Mulai</th>
          <th
          rowspan={2}
          style={{
            backgroundColor: "yellow",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
          >Tanggal Selesai</th>
          <th
          rowspan={2}
          style={{
            backgroundColor: "yellow",
            border: "1px solid black",
            borderCollapse: "collapse",
          }}
          >Produk</th>
          </tr>
        )}
        <tr/>
        {!props.diskon.length>0?
        <tr>
          <td>Tidak ada diskon</td>
        </tr>
        :props.diskon.map(r=>(
          <tr>
            <td
            style={{
              verticalAlign:"middle",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
            >{r.title}</td>
            <td
            style={{
              verticalAlign:"middle",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
            >{getDateTimeArrayIndo(r.from_date)[0]}</td>
            <td
            style={{
              verticalAlign:"middle",
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
            >{getDateTimeArrayIndo(r.until_date)[0]}</td>
            <td
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
            }}
            >
                {r.product.map((res,i)=>(
                  <div>{i+1}. {res.name}{i<r.product.length?<br/>:""}</div>
                ))}
            </td>
          </tr>
        ))
        }
        <tr />
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan={4} style={{ textAlign: "center" }}>
            Mataram, {getDateTimeArrayIndo(new Date())[0].split(", ")[1]}
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan={4} style={{ textAlign: "center" }}>
            a.n OWNER DAERAH PATRA PARK
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan={4} style={{ textAlign: "center" }}>
            OWNER
          </td>
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
