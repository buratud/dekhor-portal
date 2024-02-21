'use client'
import { AiOutlineHome, AiOutlineTag, AiOutlineEnvironment } from 'react-icons/ai';
import { BsBuildings, Bs123, BsHouse } from "react-icons/bs";
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_API_URL } from '../../../config';
import { supabase, General } from '../../../session';

export default function AddDormPage() {
  const { session } = useContext(General);
  const [owner, setOwner] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [property_number, setPropertyNumber] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [zip_code, setZipCode] = useState('')
  const [rent_price, setRentPrice] = useState(0)
  const [facilities, setFacilities] = useState([])
  const [photos, setPhotos] = useState([])
  
  const toggleFacility = (facility) => {
    if (facilities.includes(facility)) {
      // Facility already selected, remove it
      setFacilities(facilities.filter(f => f !== facility));
    } else {
      // Facility not selected, add it
      setFacilities([...facilities, facility]);
    }
  };

  const fetchOwnerUUID = () => {
    if (session && session.user) {
      // If session and user information exist
      const ownerUUID = session.user.id; // Access user ID from the session
      setOwner(ownerUUID); // Set owner state with the user ID
    } else {
      console.log('Session or user information not available.');
    }
  };
  
  useEffect(() => {
    fetchOwnerUUID();
  }, [session]);
  
  const submitForm = () => {
    // console.log('Form: ', { owner, name, address, property_number, city, province, zip_code, rent_price, facilities, photos }, 'Session:', session.access_token)
    if (session) {
        console.log('Session token: ', session.access_token);
      axios.post(`${NEXT_PUBLIC_BASE_API_URL}/dorms`, 
      { owner: owner,
        name: name,
        address: address,
        property_number: property_number,
        city: city,
        province: province,
        zip_code: zip_code,
        rent_price: parseFloat(rent_price),
        facilities: facilities,
        photos: photos
      }, 
      { headers: { Authorization: `Bearer ${session.access_token}` } }
      )
      .then(res => {
        alert('Dorm added successfully');
      })
      .catch(err => {
        alert(err);
      });
    } else {
      console.log('Session is not available yet.');
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-[#F6F6FB]">
        <div className="">
          <form className="flex flex-col md:flex-row gap-36 font-Poppins w-full">
            <div className="flex flex-col w-full">
              <div className="text-[#092F88] font-bold text-4xl font-Poppins mb-4">List New Property</div>
              <div>Tell us your property name.</div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <BsBuildings className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className='pt-6'>Where is the property you are listing?</div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineHome className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <BsHouse className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" value={property_number} onChange={(e) => setPropertyNumber(e.target.value)} placeholder="Property Number" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="Province" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <Bs123 className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="text" value={zip_code} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
            </div>
            

            <div className="w-full">
            {/* <ImageUploadComponent /> */}
              <div className='pt-6'>What facilities and filters do your property provide?</div>
              <div className='flex flex-row gap-4 py-2 my-2'>
                <div className="flex flex-col gap-4 py-2 my-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(3)} checked={facilities.includes(3)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Air-Conditioner
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(6)} checked={facilities.includes(6)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Elevator
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(7)} checked={facilities.includes(7)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Near Bus Stop
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(9)} checked={facilities.includes(9)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Near Restaurants
                  </label>
                </div>

                <div className="flex flex-col gap-4 py-2 my-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(5)} checked={facilities.includes(5)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Free WiFi
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(4)} checked={facilities.includes(4)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Pet-friendly
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" onChange={() => toggleFacility(8)} checked={facilities.includes(8)} className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]" />
                    Near Shopping Malls
                  </label>
                </div>
              </div>

              <div>
                <div>How much do you want to charge per month?</div>
                <div className="flex items-center py-2 my-2 pr-2 rounded-2xl select-none bg-[#D9D9D9]">
                <AiOutlineTag className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input type="number" value={rent_price} onChange={(e) => setRentPrice(e.target.value)} placeholder="Price per month (in THB)" className="input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium" />
              </div>
              </div>
            </div>
          </form>
          <div className="flex justify-center mt-8 pb-16">
            <button className="bg-[#092F88] font-bold text-[#FFFFFF] px-6 py-2 rounded-2xl mr-4" onClick={submitForm}>Add Your Property</button>
            <Link href="/dorms">
              <button className="bg-[#C10206] font-bold text-[#FFFFFF] px-6 py-2 rounded-2xl">Cancel</button>
            </Link>
          </div>
        </div>
    </main>
  );
}
