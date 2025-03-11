import moment from "moment";

export const formatTimestamp = (timestamp: string) => {
  return moment(timestamp).format("HH:MM - DD/MM/YYYY");
};

export const formatAmount = (amount: number) => {
  return `£${amount.toFixed(2)}`;
};
