export default function getDateFormat (date) {
    const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
    const month = date.getMonth() > 9 ? `${date.getMonth()+1}` : `0${date.getMonth()+1}`;
    return `${day}/${month === '00' ? '01': month}/${date.getFullYear()}`
}

