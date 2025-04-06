import moment from 'moment'

const formatDate = (timeObj) =>{
  let day=timeObj.getDay() ===  0 ? 'Chủ nhật' : `Thứ ${timeObj.getDay()+1}`
  let date=`${timeObj.getDate()}/${timeObj.getMonth()+1}/${timeObj.getFullYear()}`
  let time=`${timeObj.getHours()}:${timeObj.getMinutes()}`
  return `${day}, ${time}, ${date}`
}

const generateDate =() =>{
  let gapExpire=Math.floor(Math.random()*29)+1
  let today =new Date()
  let expireDay= moment(today).add(gapExpire, 'd').toDate()
  return {
    today: formatDate(today),
    expireDay: formatDate(expireDay)
  }
}

export default generateDate












// import moment from 'moment';

// const formatDate = (timeObj) => {
//   const momentObj = moment(timeObj); // Chuyển đổi đối tượng Date thành đối tượng moment

//   // Xác định ngày trong tuần
//   const day = momentObj.day() === 0 ? 'Chu nhat' : `Thu ${momentObj.day() + 1}`;

//   // Xác định ngày tháng năm
//   const date = momentObj.format('DD/MM/YYYY'); // Ví dụ: '16/09/2024'

//   // Xác định giờ phút
//   const time = momentObj.format('HH:mm'); // Ví dụ: '14:30'

//   return `${day}, ${time}, ${date}`;
// }

// const generateDate = () => {
//   const gapExpire = Math.floor(Math.random() * 29) + 1;
//   const today = moment(); // Sử dụng moment để lấy ngày hiện tại
//   const expireDay = today.clone().add(gapExpire, 'days'); // Tạo ngày hết hạn

//   return {
//     today: formatDate(today),
//     expireDay: formatDate(expireDay)
//   };
// }

// export default generateDate;
