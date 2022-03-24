export default function getDateFormat (date) {
    const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
    const month = date.getMonth() > 9 ? `${date.getMonth()}` : `0${date.getMonth()}`;

    return `${day}/${month}/${date.getFullYear()}`
}

