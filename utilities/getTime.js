
// get current time from nigeria
const getDate = async () => {
    const req = await fetch("http://worldtimeapi.org/api/timezone/Africa/Lagos")
    const res = await req.json();
    return res.dateTime;
}


module.exports = getDate;