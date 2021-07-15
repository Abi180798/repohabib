import React, { useEffect, useState } from "react";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import { StokAPI } from "../api/StokAPI";
import FormStok from "./FormStok";

function ContentForm() {
  const bizProductId = window.location.pathname.split("form/")[1];
  const [product, setProduct] = useState({
    data: null,
  });
  async function getStokById() {
    const r = await StokAPI.getStokById(bizProductId);
    if (r.status === 400) {
      setProduct({ ...product, data: null });
    } else if (r.status === 500) {
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
      setProduct({ ...product, data: null });
    } else {
      setProduct({ ...product, data: r.data });
    }
  }
  useEffect(() => {
    if (bizProductId) {
      getStokById();
    }
  }, []);
  return bizProductId ? (
    product.data && <FormStok product={product.data} />
  ) : (
    <FormStok />
  );
}

export default ContentForm;
