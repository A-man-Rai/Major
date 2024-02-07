
const getTime = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const formattedTime = `${currentHours}:${currentMinutes}`;
  
    return formattedTime;
  };

  const getDate = () => {
    const today = new Date();

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const day = today.getDate();
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;
  
    return formattedDate;
  };


  export {getTime,getDate};