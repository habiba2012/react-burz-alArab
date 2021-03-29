import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUse]= useContext(UserContext);

    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,
        {
        method:'GET',
        headers: {
            'Content-Type': 'application/',
            authorization: `Bearer ${sessionStorage.getItem('token')}` 
           }
        })
        .then(res => res.json())
        .then(data=> setBookings(data))
    },[loggedInUser.email])
    return (
        <div>
            <h3>you have : {bookings.length} booking.</h3>
            {
                bookings.map(book=><li key={book._id}>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Booking;