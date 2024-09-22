"use client"

import DatePicker from "react-datepicker";
import styles from '../../scss/DatePicker.module.scss'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { iataCode } from "../../util/iataCode";
import { useRouter } from "next/navigation";


export default function FlightSearchOptions(){

    const router = useRouter();

    const [date, setDate] = useState< Date | null>(new Date());

    const [departCountry, setDepartCountry] = useState('')
    const [departAirport, setDepartAirport] = useState('BKK')
    const [arriveCountry, setArriveCountry] = useState('')
    const [arriveAirport, setArriveAirport] = useState('SYD')

    useEffect(()=>{
        setArriveAirport('');
    },[arriveCountry])

    useEffect(()=>{
        setDepartAirport('');
    },[departCountry])
    

    const handleSearch = () => {
        if (date && departAirport && arriveAirport) {
            const searchParams = new URLSearchParams({
                departAirport,
                arriveAirport,
                date: date.toISOString().split('T')[0]
            });
            router.push(`/flight?${searchParams.toString()}`);
        }
    };
  
    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mt-40"> 
                <p>출발일자 선택</p>
                <DatePicker
                    className = {`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32 ${styles['react-datepicker']}`}
                    selected={date} 
                    onChange={setDate}
                    dateFormat={'yyyy-MM-dd'}
                    locale={ko}    
                />
                <p>출발국가</p>
                <select 
                    value={departCountry}
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setDepartCountry(e.target.value)}>
                        <option value="">출발국가 선택</option>
                    {iataCode.map((list) =>
                        <option key={list.country} value={list.country}>{list.country}</option>
                    )}
                </select>
                <p>출발공항 선택</p>
                <select 
                    value={departAirport}
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setDepartAirport(e.target.value)}>
                        <option value="">출발공항 선택</option>
                    {iataCode.find((list) => list.country === departCountry)?.airport.map((a) =>
                        <option key={a} value={a}>{a}</option>
                    )}
                </select>
                <p>도착국가</p>
                <select 
                    value={arriveCountry}
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setArriveCountry(e.target.value)}>
                        <option value="">도착국가 선택</option>
                    {iataCode.map((list) =>
                        <option key={list.country} value={list.country}>{list.country}</option>
                    )}
                </select>
                <p>도착공항 선택</p>
                <select 
                    value={arriveAirport}
                    className={`bg-pink-50 border-2 border-pink-600 text-pink-600 rounded-md h-10 w-32`}
                    onChange={(e) => setArriveAirport(e.target.value)}>
                        <option value="">도착공항 선택</option>
                    {iataCode.find((list) => list.country === arriveCountry)?.airport.map((a) =>
                        <option key={a} value={a}>{a}</option>
                    )}
                </select>
            </div>
            <button 
                onClick={handleSearch}
                className={`rounded-lg w-40 h-12 mt-20 ${(!!date && !!departAirport && !!arriveAirport) ? 
                            'bg-red-800 text-white'  : 
                            'bg-gray-300 text-gray-800'}`}
            >조회하기
            </button>
        </div>
)

    
}
