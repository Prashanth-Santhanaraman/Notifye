export const formatDate = (dbDate) => {
  const date = new Date(dbDate);
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12:true,
  }
  return date.toLocaleString("en-GB", options).replace(","," at");
};
