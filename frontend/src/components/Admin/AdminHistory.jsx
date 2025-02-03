import React from 'react'
import "./css/AdminHistory.css"
export const AdminHistory = () => {
    function timeAgo(timestamp) {
        const now = new Date();
        console.log("now", now);

        const pastDate = new Date(timestamp);
        console.log("pastDate", pastDate);

        const diffInSeconds = Math.floor((now - pastDate) / 1000); // Time difference in seconds

        const years = Math.floor(diffInSeconds / (3600 * 24 * 365));
        const days = Math.floor((diffInSeconds % (3600 * 24 * 365)) / (3600 * 24));
        const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;

        let timeString = '';
        if (years > 0) timeString += `${years} years `;
        if (days > 0) timeString += `${days} days `;
        if (hours > 0) timeString += `${hours} hours `;
        if (minutes > 0) timeString += `${minutes} minutes `;
        if (seconds > 0) timeString += `${seconds} seconds`;

        return timeString.trim() + " ago";
    }

    const timestamp = "2024-10-17T10:30:00Z";
    console.log(timeAgo(timestamp));  

    return (
        <>
            <div id='hystory-container' onClick={()=>{}}>
                <div id='timestamp'>
                    <label htmlFor="">{timeAgo(timestamp)}</label>
                <div className='line'></div>
                </div>
                <div id='display-activity' >
                    <div className='activity-name'>Update</div>
                    <div className='arrow-symbol'> &gt; </div>
                </div>
            </div>
            
        </>
    )
}
