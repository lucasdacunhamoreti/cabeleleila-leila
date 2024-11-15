import { Notification } from "rsuite";
import "rsuite/styles/index.less";

export const notification = (type, params) => {
  return <Notification type={type} title={params.title} />;
};
