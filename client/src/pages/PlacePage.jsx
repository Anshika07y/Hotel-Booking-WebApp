import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../bookingwidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){
    const {id}=useParams();
    const [place,setPlace]=useState(null);
  
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    },[id]);
    if (!place) return '';
    return(
        <div className="mt-4 bg-gray-100 -m-8 px-8 py-8">
            <h1 className="text-2xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
                <PlaceGallery place={place}/>
 <div className=" mt-8  mb-8 gap-4 grid grid-cols-1 md:grid-cols-[2fr_1fr]"> 
            <div>
                <div className="my-4">
                <h2 className="font-semibold text-2xl">Description</h2>
                {place.description}
            </div>
                   Check-in: {place.checkIn}<br/>
                   Check-out:{place.checkOut}<br/>
                   Max number of guests:{place.maxGuests}
                  
                </div>
                <div>
                <BookingWidget place={place } />    
            </div>
         </div>
         <div className="bg-white -mx-8 px-8 pt-8 border-1">
            <div>
            <h2 className="font-semibold text-2xl">ExtraInfo</h2>
            </div>
            <div className="mt-2  mb-4 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
         </div>
        </div>
    );
}