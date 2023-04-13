import { Sequelize } from "sequelize";


export const timeParser = (time) => {
    return time.toISOString().slice(0, 19).replace('T', ' ');
}
export const now = new Date();

export const SQLtimeParser = (time) => {
    return Sequelize.literal(`Cast('${time.toISOString().slice(0, 19).replace('T', ' ')}' as datetime)`);;
}

export const getEndOfYear = (startOfYear) => {
    const endDate = `${(new Date(startOfYear).getFullYear() + 1)}-${new Date(startOfYear).getMonth() + 1}-${new Date(startOfYear).getDate()}`;

    return endDate;
}

