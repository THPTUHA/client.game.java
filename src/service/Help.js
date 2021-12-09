const getDay = (time) => {
    if(time===-1)return "Taì khoản mặc định";
    const date = new Date(time*1000);
    return date.getHours()+":"+date.getMinutes()+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  };


const getDateInputFormat = function (value) {
    var date = new Date(value * 1000);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

const getUnixNum = function (date) {
  if (!date) {
      date = new Date();
  }
  return Math.round(new Date(date).getTime() / 1000);
}

const Help ={getDay:getDay,
   getDateInputFormat:getDateInputFormat,
   getUnixNum:getUnixNum
}
export default Help;