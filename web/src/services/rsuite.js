import { Notification } from "rsuite";
import "rsuite/styles/index.less";

export const notification = (type, params) => {
  Notification[type](params);
};
