import { LegsModal } from "./legs-modal";
import {FlightSearchType} from "../enums/flight-search-type.enum";
import {CabinClass} from "../enums/cabin-class.enum";

export interface FlightSearchRequestModal{
    tripType: FlightSearchType.ROUND_TRIP,
    passengers: {
        "adults": number,
        "children": number,
        "infants": number
    },

    baggageFareOnly: boolean,
    returnAllFaresResultFromGal: boolean
    passengerIdList: number[],


    nearByAirport?: boolean,  // Oneway and round trip
    isNonStop?: boolean, // Oneway and round trip
    isExcludeLcc?: true, // Oneway and round trip

    cabinClass?: CabinClass.ECONOMY, // enum   OneWay
    rbd?: number[], // enums      OneWay

    allianceName?: string, //Oneway and round trip
    preferredAirline?: string, //Oneway and round trip


    legs: LegsModal[]
}