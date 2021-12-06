const getDay = (time) => {
    const date = new Date(time*1000);
    return date.getHours()+":"+date.getMinutes()+" "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  };
const Help ={getDay:getDay}
export default Help;