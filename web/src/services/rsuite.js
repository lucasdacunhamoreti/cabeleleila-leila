import { Notification } from "rsuite";
import "rsuite/styles/index.less";

export const notification = (type, params) => {
  // Notification({
  //   type: type, // 'info', 'success', 'error', etc.
  //   title: params.title,
  //   description: params.description,
  //   placement: params.placement || "topStart", // Optional, default to 'topStart'
  // });
  return <Notification type={type} title={params.title} />;
};
