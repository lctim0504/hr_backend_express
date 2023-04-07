import { Sequelize } from "sequelize";

const _now = new Date().toISOString().slice(0, 19).replace('T', ' ');

export const timeParser = (time) => {
    return time.toISOString().slice(0, 19).replace('T', ' ');
}

export const now = Sequelize.literal(`Cast('${_now}' as datetime)`);

export const getEndOfYear = (startOfYear) => {
    const endDate = `${(new Date(startOfYear).getFullYear() + 1)}-${new Date(startOfYear).getMonth() + 1}-${new Date(startOfYear).getDate()}`;

    return endDate;
}

