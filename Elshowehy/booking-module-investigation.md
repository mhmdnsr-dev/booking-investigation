# ✈️ Booking Module Investigation – Front/Back Contract Review

Welcome aboard! This document captures the ongoing work and analysis related to the **Booking Module** of our system.

---

### 🎯 Objective

Break down the legacy structure of booking-related pages and endpoints

---

### 👨‍💻 My Focus Area

As part of this larger task, my responsibility is the **Passenger Details**, which includes:

1. Manual invoice || ordinary booking scenarios
2. Passenger data forms
3. Payment methods
4. Flight Summary
5. Fare breakup
6. _The following items are specific to some airlines:_
   1. Meal for airArabia
   2. Baggage for airArabia
   3. Seat for airArabia
   4. Bundle for flyNas, flyAdeal, and airIndia

Each flow is analyzed for:

- Data structure quality
- JSON contract sanity
- Frontend rendering patterns (JSP vs Angular)
- Upgrade potential

---

Let’s dive into page or endpoints step by step, comparing how it works now vs how it _should_.

## ⚠️ There are two main scenarios in this page:

## 1️⃣ The first scenario is manual invoice or manual booking:

### 1️⃣ Endpoint: `odeysysadmin/flight/flightOneWayManual` (POST - `ModelAndView/Document`)

**Important:** there is no endpoint called `odeysysadmin/flight/flightRoundManual` if trip type is round and the same with multi cities trip.
this endpoint: `odeysysadmin/flight/flightOneWayManual` called if trip type is oneway, round, and multi.

#### 📤 Payload: none

#### 📥 Response: none

### 📄 Description:

This is one of the two endpoints for manual invoice scenario used to render a **passenger details** in a JSP view.
I will provide a payload and response after discuss with backend bcz the payload and response doesn't appear in network.

### 📥 Request Structure (after discuss with backend)

<!-- - **Type:** Spring `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>request</code> Value:</h4> </summary>

```json

```
</details> -->

### 📥 Request will be done (after discuss with backend)

<!-- - **Type:** Spring `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>request</code> Value:</h4> </summary>

```json

```
</details> -->

### 📥 Recommended Request (after discuss with backend)

<!-- - **Type:** Spring `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>request</code> Value:</h4> </summary>

```json

```
</details> -->

---

### 2️⃣ Endpoint: `odeysysadmin/flight/passengerDetailManual` (GET - `ModelAndView/Document`)

### 📄 Description:

This is the second of the two endpoints for manual invoice scenario used to render a **passenger details** in a JSP view.

#### 📤 Payload:

- type: `query params`
- value: isCoreSystem = boolean

### 📥 Response Structure (current)

- Type: `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>response</code> Value:</h4> </summary>

```json

```

</details>

### 📥 Response Structure (will be done)

- Type: `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>response</code> Value:</h4> </summary>

```json

```

</details>

### 📥 Response Structurense (recommended)

- Type: `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>response</code> Value:</h4> </summary>

```json

```

</details>

---

## 2️⃣ The second scenario is ordinary booking:

### 1️⃣ Endpoint: `odeysysadmin/flight/passengerDetail` (POST - `ModelAndView/Document`)

### 📄 Description:

This is the only endpoint for ordinary booking scenario used to render a **passenger details** in a JSP view.

### 📤 Payload in short (sent in body):

current payload (oneway, round, & multicity) is a formData contain these objects and properties:

1. `onwardFlightOptionJson`: the chosen flight from all flights which listed in flight search result page
   > _Note:_ The chosen flight object is the same flight object returned from the search result endpoint.
2. `requestBean`: same like flight widget page payload
3. `insuranceOptionJson`
4. `indigoSession`
5. `Signature`
6. `quotationId`
7. `productSequence`
8. `fromSaveQuote`: boolean

### 📤 Payload Structure (current):

- Type: `ModelAndView/Document`
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>response</code> Value:</h4> </summary>

```json
{
  "onwardFlightOptionJson": {
    "onwardJourneyDateFormat": null,
    "destination": "JED",
    "origin": "CAI",
    "multiCarrierForApplyRule": false,
    "laggage": null,
    "baggageAllowed": false,
    "viaFlight": false,
    "hazUmarhJed": false,
    "agencyCurrencyCode": null,
    "connecting": false,
    "fullLaggage": false,
    "airlinePNR": null,
    "offerId": null,
    "originCountry": "67",
    "destinationCountry": "195",
    "orderID": null,
    "domestic": false,
    "ndcRulesAndPenalties": null,
    "destinationCity": "3635",
    "moreOptions": null,
    "flightUUID": null,
    "ticketingPCCId": null,
    "serviceVendor": "Galileo",
    "noOfAdults": 1,
    "noOfChilds": 1,
    "noOfInfants": 1,
    "platingCarrier": "SV",
    "journeySellKey": null,
    "adultCheckinBaggage": "1P",
    "adultHandBaggage": "",
    "childCheckinBaggage": "1P",
    "childHandBaggage": "",
    "infantCheckinBaggage": "1P",
    "infantHandBaggage": "",
    "totalFare": 12700,
    "totalJourneyDuration": "135",
    "supplierCurrency": "AED",
    "lccflight": false,
    "marketingCarrier": "SV",
    "searchPCCId": "287",
    "ticketUsingSearchPCC": true,
    "amadeusFlightOptionDetails": null,
    "offerID": null,
    "originCountryCode": null,
    "destinationCountryCode": null,
    "destinationId": null,
    "currencyRate": 10,
    "flightFare": {
      "markup": false,
      "currency": "EGP",
      "baggageOptionsList": null,
      "bookingPcc": null,
      "childFareInfoRef": [
        {
          "fareRuleKey": "6UUVoSldxwiAW83Xh7ZL0MbKj3F8T9EyxsqPcXxP0TLGyo9xfE/RMsuWFfXVd1OAly5qxZ3qLwOXLmrFneovA5cuasWd6i8Dly5qxZ3qLwOXLmrFneovA+9AUf3xBI7zxWa1uaqI55k3aSkvhp2ybVBTuMvYtAPV/m9XlS8/kMdN3J3NyYpz6X9yHq7E/zolyst5h5wAlv78n4ExpM8cvmLgFn3B9sPdSU8gecfbWEnsEf34vHSKSh5ilQoX7RIZzukd+fDqEGh3YT9dyBPONkPFc7ZmQhP+mpBH9wehGMEn6V7c0rHrrXS0awReAKN5/AFKEXb03hK/he9va7VDH7+F729rtUMfv4Xvb2u1Qx+/he9va7VDHxDGJun84l6GmjYuszn207WOnxkQ2WPPHvaVUAnec78/mdHfDeq1iSvsIhAEP8Hr99wXtO9a1rEPVV9ISKSaAaI=",
          "fareInfoRef": "JHm6XhnAuDKAbsC7TGAAAA==",
          "airSegmentRef": "JHm6XhnAuDKAarC7TGAAAA=="
        }
      ],
      "infantFareInfoRef": [
        {
          "fareRuleKey": "6UUVoSldxwiAW83Xh7ZL0MbKj3F8T9EyxsqPcXxP0TLGyo9xfE/RMsuWFfXVd1OAly5qxZ3qLwOXLmrFneovA5cuasWd6i8Dly5qxZ3qLwOXLmrFneovA+9AUf3xBI7zxWa1uaqI55k3aSkvhp2ybTpjS3pKX1E4ldbT4dmojqTnWmtUsVS8UbVf4qpEtG58qdxn/S4oEcKb3ATlAzyaOIX+hNfHEXoxUV3b2b+cmv9JBCYAkTJzwD/9+1PBdevmunfTOBv+12m392E/mQQXuoMN1QPqv5Kjd7qrB3nitl7cOOIUvvfH3mzos1z35jA/y5YV9dV3U4CXLmrFneovA5cuasWd6i8Dly5qxZ3qLwOXLmrFneovAzzD4Wdjal2fHna1H5QsLdGaNi6zOfbTtY770mJHGJ8MQvdafCnE/eYs/QMtR32b03PekyWRs464bEHvHyI5ZlQ=",
          "fareInfoRef": "JHm6XhnAuDKAJtC7TGAAAA==",
          "airSegmentRef": "JHm6XhnAuDKAarC7TGAAAA=="
        }
      ],
      "galileoHostTokenList": null,
      "airPricingSolution": null,
      "airPricingInfoMapCHD": null,
      "airPricingInfoMapINFT": null,
      "paxRefID": null,
      "paxJourneyRefID": null,
      "totalSurchargeAmout": 0,
      "flightSurchargeBreakUps": null,
      "cabinClass": "Economy",
      "adultActualTotalFare": 0,
      "serviceTax": 0,
      "totalNet": 12700,
      "fareTypeCode": "Published Fare",
      "actualTotalAgencyCommission": 0,
      "adultMarkupPrice": 0,
      "adultDiscountPrice": 0,
      "adultServiceChargePrice": 0,
      "childMarkupPrice": 0,
      "childDiscountPrice": 0,
      "childServiceChargePrice": 0,
      "infantMarkupPrice": 0,
      "infantDiscountPrice": 0,
      "infantServiceChargePrice": 0,
      "corporateDealCode": null,
      "adultBaseFare": 2400,
      "adultFees": 0,
      "adultTax": 3200,
      "fareSellKey": "JHm6XhnAuDKAcrC7TGAAAA==",
      "childBaseFare": 1800,
      "childFees": 0,
      "childTax": 3200,
      "infantBaseFare": 300,
      "infantFees": 0,
      "infantTax": 1800,
      "totalFees": 0,
      "branchMarkup": 0,
      "actualTotalBaseFare": 450,
      "actualTotalTaxFare": 820,
      "actualTotalFee": 0,
      "actualTotalFare": 1270,
      "adultTourCode": null,
      "offerID": null,
      "childTourCode": null,
      "childActualTotalFare": 0,
      "infantActualTotalFare": 0,
      "adultNegoFare": false,
      "childNegoFare": false,
      "infantNegoFare": false,
      "infantTourCode": null,
      "voluntaryRefundsAdult": null,
      "voluntaryChangesChild": null,
      "voluntaryRefundsChild": null,
      "voluntaryChangesInfant": null,
      "voluntaryRefundsInfant": null,
      "adultFareType": "Published",
      "odeysysPrice": 12700,
      "agencyMarkup": 0,
      "agentMarkup": 0,
      "discountPrice": 0,
      "totalTax": 8200,
      "totalBaseFare": 4500,
      "markupPrice": 0,
      "serviceChargePrice": 0,
      "totalAgencyCommission": 0,
      "actualBundledServiceCharge": 0,
      "childCorporateDealCode": null,
      "infantCorporateDealCode": null,
      "adultAllowedCheckinBaggage": "",
      "adultAllowedHandBaggage": "",
      "childAllowedCheckinBaggage": "",
      "childAllowedHandBaggage": "",
      "infantAllowedCheckinBaggage": "",
      "infantAllowedHandBaggage": "",
      "fareClass": "Q",
      "plb": 0,
      "refundableInfo": "WT 1U-REFUNDABLE",
      "serviceFee": 0,
      "tds": 0,
      "transactionFee": 0,
      "fareNote": null,
      "manualDealCode": null,
      "remark": null,
      "actualSsrMealAmt": 0,
      "voluntaryChangesAdult": null,
      "actualTravelFusionFee": 0,
      "actualAdultBaseFare": 0,
      "actualAdultTax": 0,
      "actualAdultFees": 0,
      "actualChildBaseFare": 0,
      "actualChildTax": 0,
      "actualchildFees": 0,
      "actualInfantBaseFare": 0,
      "actualInfantTax": 0,
      "actualInfantFees": 0,
      "actualTotalAdultBaseFare": 0,
      "actualTotalAdultTax": 0,
      "actualTotalAdultFee": 0,
      "actualTotalChildBaseFare": 0,
      "actualTotalChildTax": 0,
      "actualTotalChildFee": 0,
      "actualTotalInfantBaseFare": 0,
      "actualTotalInfantTax": 0,
      "actualTotalInfantFee": 0,
      "travelFusionFeeDescription": null,
      "travelFusionBookingFee": 0,
      "childFareType": "Published",
      "infantFareType": "Published",
      "fareBrand": "BASIC ECO",
      "fareTypeID": null,
      "cancelPanelty": "AED350.00",
      "changePanelty": "AED200.00",
      "baggageIncluded": false,
      "airpricingInfoADT": null,
      "adultFareId": null,
      "childFareId": null,
      "infantFareId": null,
      "adultFareInfoRef": [
        {
          "fareRuleKey": "6UUVoSldxwiAW83Xh7ZL0MbKj3F8T9EyxsqPcXxP0TLGyo9xfE/RMsuWFfXVd1OAly5qxZ3qLwOXLmrFneovA5cuasWd6i8Dly5qxZ3qLwOXLmrFneovA+9AUf3xBI7zxWa1uaqI55k3aSkvhp2ybTpjS3pKX1E4YGnrkUjMH0hN3J3NyYpz6X9yHq7E/zolyst5h5wAlv78n4ExpM8cvmLgFn3B9sPdSU8gecfbWEnMU535bvD9TB5ilQoX7RIZzukd+fDqEGh3YT9dyBPONkPFc7ZmQhP+mpBH9wehGMEn6V7c0rHrrVMx2ZlxTdlf/AFKEXb03hK/he9va7VDH7+F729rtUMfv4Xvb2u1Qx+/he9va7VDHxDGJun84l6GmjYuszn207WOnxkQ2WPPHvaVUAnec78/qc2V/LDU7azsIhAEP8Hr99wXtO9a1rEPVV9ISKSaAaI=",
          "fareInfoRef": "JHm6XhnAuDKArrC7TGAAAA==",
          "airSegmentRef": "JHm6XhnAuDKAarC7TGAAAA=="
        }
      ],
      "displayOnlycabinClass": null,
      "bundledServiceCharge": 0,
      "rph": null,
      "fareBasisCode": null,
      "paxAdtTaxBreakup": [
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 200,
          "taxCode": "EG"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "EQ"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "JK"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "O2"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "O9"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 1000,
          "taxCode": "QH"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "S4"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 200,
          "taxCode": "XK"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "E3"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 1200,
          "taxCode": "YR"
        }
      ],
      "paxChdTaxBreakup": [
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 200,
          "taxCode": "EG"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "EQ"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "JK"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "O2"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "O9"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 1000,
          "taxCode": "QH"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "S4"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 200,
          "taxCode": "XK"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "E3"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 1200,
          "taxCode": "YR"
        }
      ],
      "paxInfTaxBreakup": [
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 200,
          "taxCode": "EG"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "EQ"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "JK"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "O2"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "O9"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 1000,
          "taxCode": "QH"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "XK"
        },
        {
          "actualTaxAmount": 0,
          "taxDesc": "",
          "taxAmount": 100,
          "taxCode": "E3"
        }
      ],
      "paxAdtFeesBreakup": null,
      "paxChdFeesBreakup": null,
      "paxInfFeesBreakup": null,
      "markdown": false,
      "fareType": "Published Fare",
      "offerItemID": null,
      "actualSsrBaggageAmt": 0,
      "actualSsrSeatAmt": 0
    },
    "flightlegs": [
      {
        "destination": "JED",
        "origin": "CAI",
        "status": null,
        "equipmentType": null,
        "stopover": "0",
        "bookingClass": "Q",
        "cabinClass": "Economy",
        "originCountry": "67",
        "destinationCountry": "195",
        "flightTime": 0,
        "departDateFromResponse": null,
        "arrivalDateFromResponse": null,
        "flightReference": null,
        "shuraArrDate": null,
        "shuraArrTime": null,
        "flightSwitchingWaitingTimeMin": 0,
        "shuraDeptTime": null,
        "cabinBaggage": null,
        "includedBaggage": null,
        "supplierClassDescription": null,
        "technicalStopList": null,
        "travelFusionClass": null,
        "changeOfPlane": "false",
        "eTicketability": null,
        "linkAvailability": "true",
        "optionalServicesIndicator": "false",
        "participantLevel": "Secure Sell",
        "polledAvailabilityOption": "O and D cache or polled status used with different local status",
        "availabilityDisplayType": "Fare Specific Fare Quote Unbooked",
        "availabilitySource": "S",
        "flightTimeStr": "135",
        "segmentKeyUsed": false,
        "shuraDepDate": null,
        "depDate": "2025-09-25",
        "operatedByAirline": "SV",
        "ndcSegmentRef": "",
        "originCityName": "Cairo",
        "originName": "Cairo International Airport",
        "destinationCityName": "Jeddah",
        "destinationName": "King Abdulaziz International",
        "journeyDuration": "2h 15m",
        "carrierName": "Saudi Arabian",
        "flightSwitchingWaitingTime": "",
        "resBookDesignCode": null,
        "supplierDepDate": null,
        "supplierArrDate": null,
        "distance": "769",
        "depDateTimeStr": "2025-09-25T15:10:00.000+03:00",
        "arrDateTimeStr": "2025-09-25T17:25:00.000+03:00",
        "legSequence": 0,
        "equipmentSuffix": null,
        "fareApplicationType": null,
        "fareSequence": null,
        "ruleNumber": null,
        "segmentSellKey": "JHm6XhnAuDKAarC7TGAAAA==",
        "inventoryLegId": null,
        "numSeatsAvailable": 0,
        "ontimeInfo": null,
        "stopoverInfo": null,
        "validatingCarrier": null,
        "validatingCarrierName": null,
        "segmentCode": null,
        "journeyDurationMin": 135,
        "segmentGroup": "0",
        "providerCode": "1G",
        "codeShareInfo": "operatingCarrier:SV#operatingFlightNumber:null",
        "classOfService": "Q",
        "fareInfoRefKey": null,
        "segmentSellKeyOld": null,
        "arrTerminal": "1",
        "arrDate": "2025-09-25",
        "carrier": "SV",
        "arrTime": "17:25:00",
        "depTerminal": "2",
        "depTime": "15:10:00",
        "equipment": "333",
        "rph": null,
        "flightNumber": "306",
        "fareBasisCode": "QAOTEGB4",
        "operatedByFound": false,
        "operatedByAirlineName": "Saudi Arabian",
        "originCityCode": "CAI",
        "destinationCityCode": "JED"
      }
    ],
    "optionSegmentBean": null,
    "journeyDurationInMinutes": 0,
    "ndcSearchResponseID": null,
    "passengerList": null,
    "serviceProviderPNR": null,
    "fareBasisCodes": null,
    "flightOptionKey": "OneWay|GAL|CAI|2025-09-25|SV|306|Q|2025-09-25|JED",
    "rulesCommonBean": null,
    "nDCjourneyID": null,
    "promoFare": false,
    "ndcintegration": false,
    "validLaggage": false,
    "cardPreRegister": false,
    "useTFPrepay": false,
    "upSellingOption": false,
    "ssrPrice": 0,
    "fareAvailabilityKey": null,
    "trackingId": "9d8b2409-1db7-42d8-bffa-60d09bae3de6",
    "bookAndHoldAllowedForSupplier": false,
    "baggageAllowedForSupplier": false,
    "brandCodeSabre": [],
    "fareBaseCodeSabre": [],
    "bundledServiceId": null,
    "bundledServiceName": null,
    "includedServies": null,
    "onwardJourneyDate": "2025-09-25",
    "onlyBaggageFareSearch": false,
    "importPnr": false,
    "multiCarrier": false,
    "responseID": null,
    "flyDubaiFlightOptionDetails": null,
    "originCity": "1300",
    "originId": null,
    "platingCarrierName": "Saudi Arabian",
    "noOfTotalStops": 0,
    "discountIdAdult": null,
    "discountIdChild": null,
    "discountIdInfant": null,
    "tagFlight": null,
    "quantity": 1,
    "lccPromoCode": null,
    "adtBagCode": null,
    "chdBagCode": null,
    "originCityCode": "CAI",
    "destinationCityCode": "JED",
    "offerItemID": null,
    "orderItemID": null,
    "carryOnCharges": null,
    "fareRule": null,
    "airAirarabiaFlightOptionDetails": null,
    "spiceFlightOptionDetails": null,
    "supplierSettings": {
      "bspAllowed": false,
      "bookAndHoldAllowed": false,
      "gdsSupplier": false,
      "fareConfirmBeforePayAfterHoldAllowed": false,
      "dynamicCurrencyAllowed": false,
      "iqamaAllowed": false,
      "baggageAllowed": false,
      "upSellingAllowed": false,
      "ticketVoidAllowed": false,
      "cancelBookAndHoldAllowed": false,
      "syncPnrAllowed": false,
      "bundleAllowed": false
    },
    "vendorSignature": null,
    "routingId": null,
    "lfId": null,
    "airIndiaExpressFlightOption": null,
    "offerImgPath": null,
    "offerDesc": null,
    "platingAirlineType": 1,
    "tagFlightDesc": "",
    "gdsOfficeId": "P3429834",
    "noOfConnectingPoints": 0,
    "airMultiAvailabilityResp": false,
    "flightDetKey": "SV306|GAL"
  },
  "requestBean": {
    "multiAvailability": false,
    "searchId": 0,
    "prefferedAirline": null,
    "upgradeBooking": 0,
    "fareMismatch": 0,
    "passengerType": "",
    "orderId": null,
    "baggageFareOnly": false,
    "allianceName": "",
    "nearByAirport": false,
    "returnAllFaresResultFromGal": false,
    "passengerIdList": [],
    "tripType": "OneWay",
    "prefferedAirlineName": null,
    "noOfAdults": "1",
    "noOfChilds": "1",
    "noOfInfants": "1",
    "dataFromCacheOrNot": true,
    "isDateFlexible": false,
    "isNonStop": false,
    "hotelCrossSell": false,
    "flexibleDateForCaching": false,
    "corporateIdList": [],
    "isExcludeLcc": false,
    "flightwidgetElement": [
      {
        "returnDateOfJourney": null,
        "destinationCityId": 3635,
        "destCountryId": 195,
        "rbd": "",
        "multiOriginList": null,
        "cabinClass": "1",
        "multiOriginNameList": null,
        "multiOriginCityNameList": null,
        "multiOriginCountryIdList": null,
        "preferredAirline": "",
        "goingToCity": "Jeddah",
        "startingFrom": "CAI",
        "goingTo": "JED",
        "depCountry": null,
        "dateOfJourney": "25-09-2025",
        "originCountryId": 67,
        "age": ["45", "8", "1"],
        "residency": "AE",
        "residencyId": null,
        "goingToName": "King Abdulaziz International",
        "recheck": 0,
        "startingFromCity": "Cairo",
        "covercountry": "SA",
        "startingFromName": "Cairo International Airport",
        "sourceCityId": 0
      }
    ],
    "hotelRequestBean": null,
    "selectedHotel": null,
    "bookingViaSearch": null,
    "lastFiveSearch": false,
    "seeMore": false
  },
  "insuranceOptionJson": null,
  "indigoSession": null,
  "signature": null,
  "quotationId": null,
  "productSequence": null,
  "fromSaveQuote": false
}
```

## </details>

### 📤 Payload Structurense (recommended):

> _Note_: depending on my colleagues (eng Nasr & Marwa) in requestBean and flightOption investigation.

---

### 📥 Response Structure (current):

## // tommorow

### 📥 Response Structure (recommended):

## // tommorow

### ⚠️ Global Observations:

#### 1️⃣ Counter:

- appear with ordinary booking and hidden with manual booking.

#### 2️⃣ Ticket Number input:

- appear only with manual booking

---
