export const timeParser = (time) => {
    return time.toISOString().slice(0, 19).replace('T', ' ');
}