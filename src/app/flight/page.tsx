import { Suspense, useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import styles from '../../scss/DatePicker.module.scss'
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import { iataCode } from "../util/iataCode";
import { getNowDate } from "../util/getNowDate";
import Loading from "./loading";
import FlightList from "./[query]/flightList";
import FlightSearchOptions from "./filghtSearchOptions";

export default function Flight(){

    return(
        <div className="flex min-h-screen flex-col items-center p-24"></div>
    )
}