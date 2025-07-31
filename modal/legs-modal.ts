export interface LegsModal {
    origins: string[] // In Multicity It will be one element in the list
    destination: string


    coverCountry?: string // One way and Round trip
    residency?: string // One way and Round trip
    depCountry?: string // Round trip


    dateOfJourney?: Date //Oneway and Multicity
    cabinClass?: number, // Multicity
    rbd?: string[] // Multicity


    onwardDateOfJourney?: Date // Round trip
    onwardCabinClass?: number, // Round trip
    onwardRbd?: string[], // Round trip

    returnDateOfJourney?: Date  // Round trip
    returnCabinClass?: number, // Round trip
    returnRbd?: string[] // Round trip
}