import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

Dayjs.extend(utc);
Dayjs.extend(timezone);

const formatToYMD = (date: string): string => {
    return Dayjs.utc(date).format("YYYY-MM-DD");
};

const formatToYMDHMS = (date: string): string => {
    return Dayjs.utc(date).format("YYYY-MM-DD HH:mm:ss");
};

const diffInDays = (date: string): number => {
    return Dayjs.utc(date).diff(Dayjs.utc(), "days");
};

const getExpireDate = (date: string, days: number): string => {
    return Dayjs.utc(date).add(days, "days").format("YYYY-MM-DD");
};

const iDate = {
    formatToYMD,
    formatToYMDHMS,
    diffInDays,
    getExpireDate,
};

export { iDate };
