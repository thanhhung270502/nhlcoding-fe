function getCurrentTimeFormatted() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedTime = `${hour}:${minutes} ${month} ${day}, ${year}`;
    return formattedTime;
}

const getAccessToken = () => {
    let session = JSON.parse(localStorage.getItem('session'));
    return {
        'access-token': session['accessToken'],
    };
};

export { getCurrentTimeFormatted, getAccessToken };
