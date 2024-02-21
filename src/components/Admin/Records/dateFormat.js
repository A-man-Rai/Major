function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to zero-based month and padding with leading zero
    const day = ('0' + date.getDate()).slice(-2); // Padding with leading zero

    // Format the date as YYYY-MM-DD
    return `${day}-${month}-${year}`;
}


export {formatDate}







