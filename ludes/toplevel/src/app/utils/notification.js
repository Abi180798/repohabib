import cogoToast from "cogo-toast";

export const notifyType = Object.freeze({"info":"info","error":"error","success":"success","loading":"loading"})
export const notifyPosition = Object.freeze({"topLeft":"top-left","topCenter":"top-center","topRight":"top-right","bottomLeft":"bottom-left","bottomCenter":"bottom-center","bottomRight":"bottom-right"})
export function ShowNotify(message, position ,type, event) {
  const interval = 100;
  switch (type) {
    case "info":
      return setTimeout(() => {
        cogoToast.info(message, {
          position: position,
        }).then(event)
      }, interval);
    case "error":
      return setTimeout(() => {
        cogoToast.error(message, { 
          position: position,
        }).then(event)
      }, interval);
    case "success":
      return setTimeout(() => {
        cogoToast.success(message, {
          position: position,
          hideAfter:1
        }).then(event)
      }, interval);
    case "loading":
      return setTimeout(() => {
        cogoToast.loading(message, {
          position: position,
        }).then(event)
      }, interval);
    default:
      return setTimeout(() => {
        cogoToast.info(message, {
          position: position,
          hideAfter:1
        }).then(event)
      }, interval);
  } 
}