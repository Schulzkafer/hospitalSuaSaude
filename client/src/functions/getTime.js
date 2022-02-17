function getTime(seconds) {
   let date = new Date(seconds * 1000);
   return `${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`;
}

function format(v) {
   return ("0" + v).slice(-2);
}


export default getTime;