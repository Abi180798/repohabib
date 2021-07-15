import React, { useEffect } from "react";
import ContentDiskon from "./components/ContentDiskon";
import FormDiskon from "./components/FormDiskon";

function Diskon({ handleTabs }) {
  useEffect(() => {
    handleTabs("Diskon");
  }, []);
  return (
    <div>
      <ContentDiskon />
    </div>
  );
}

export default Diskon;
