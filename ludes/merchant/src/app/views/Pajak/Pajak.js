import React, { useEffect } from "react";
import ContentPajak from "./components/ContentPajak";
import FormPajak from "./components/FormPajak";

function Pajak({ handleTabs }) {
  useEffect(() => {
    handleTabs("Pajak");
  }, []);
  return (
    <div className="ant-card">
      <div style={{ padding: "25px" }}>
        <FormPajak />
      </div>
    </div>
  );
}

export default Pajak;
