const timestampCreate = (timestamp) => {

    const dateTimestamp = new Date(timestamp);
    const month = dateTimestamp.getMonth() + 1;
    const day = dateTimestamp.getDate();
    const hours = dateTimestamp.getHours() > 9 ? dateTimestamp.getHours() : `0${dateTimestamp.getHours()}`;
    const minutes = dateTimestamp.getMinutes() > 9 ? dateTimestamp.getMinutes() : `0${dateTimestamp.getMinutes()}`;

    const dateNow = new Date(Date.now());
    const dateNowDay = dateNow.getDate();

    // eslint-disable-next-line no-useless-assignment
    let timestampResult = "";

    if(dateNowDay === day) {
        timestampResult = `${hours}:${minutes}`;
    } else {
        timestampResult = `${day}:${month}`
    }

    return timestampResult;
}

export default timestampCreate;