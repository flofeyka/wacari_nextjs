import { format } from "date-fns";
const formatDate = (date: any, pattern: string) =>
date instanceof Date
    ? format(date, pattern || "dd.MM.yyyy HH:mm")
    : format(new Date(date), pattern || "dd.MM.yyyy HH:mm");

export default formatDate;