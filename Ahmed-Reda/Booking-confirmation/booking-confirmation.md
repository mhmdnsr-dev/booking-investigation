## 📝 Booking Module Investigation – Booking Confirmation Page Contract Review

Welcome! This document captures the analysis and modernization effort for the **Booking Confirmation Page** of our Booking Module. The aim is to clarify backend/frontend contracts and propose a clean, RESTful structure.

---

### 🎯 Objective

- Break down the legacy structure of booking confirmation objects
- Compare to modern, RESTful, Angular-friendly alternatives
- Recommend transformations for a future-proof codebase

---

## ✅ Page: Booking Confirmation

### Description

This page confirms all booking details, including selected flight, passenger info, and payment summary.

---

### 🏷️ Legacy Structure

- **Format:** Verbose object with many unused fields and nulls
- **Delivery:** Injected in `ModelAndView` and used in JSP rendering

<details>
<summary>🧾 Sample old <code>confirmationPageObject</code> Value (4000+ properties)</summary>

```json
its so big its 4400+ line of code
```

</details>

---

## ✅ Recommended REST API Structure

- **API Endpoint:** `GET /booking/confirmation/${flightId}or{bookingRef}or${orderId}`
- **Usage:** Frontend-driven, Angular compatible, form-based
- **Design Goals:** Simplicity, relevance, clarity
- **Properties:** Only 190, all user-facing and required

### 🔑 JSON Contract Overview

<div style="max-height:500px; overflow:auto; border:1px solid #363333ff; ; background:#f9f9f9;">
  
```json
{
  "FlightOption": {
    "importPnr": "boolean"
  },
  "requestBean": {
    "noOfAdults": "number",
    "noOfChilds": "number",
    "noOfInfants": "number"
  },
  "airlinePNR": {
    "errorList": [
      {
        "action": "string",
        "errorCode": "number",
        "errorDesc": "string",
        "product": "string",
        "serviceName": "string",
        "vendorName": "string"
      }
    ],
    "supllierdespleyname": "string"
  },
  "SSRService": {
    "onwardBaggageServiceList": [
      {
        "baggageList": [
          {
            "departureAiport": "string",
            "arrivalAiport": "string",
            "baggageOptionsList": [
              {
                "baggageDescription": "string",
                "currencyCode": "string",
                "baggageCharge": "number"
              }
            ]
          }
        ]
      }
    ],
    "returnBaggageServiceList": [
      {
        "baggageList": [
          {
            "departureAiport": "string",
            "arrivalAiport": "string",
            "baggageOptionsList": [
              {
                "baggageDescription": "string",
                "currencyCode": "string",
                "baggageCharge": "number"
              }
            ]
          }
        ]
      }
    ],
    "onwardMealServiceList": [
      {
        "mealOptionList": [
          {
            "mealDescription": "string",
            "mealCharge": "number",
            "flightNumber": "string"
          }
        ]
      }
    ],
    "returnMealServiceList": [
      {
        "mealOptionList": [
          {
            "mealDescription": "string",
            "mealCharge": "number",
            "flightNumber": "string"
          }
        ]
      }
    ]
  },
  "productInformation": {
    "resultObject": {
      "flightBookingDetails": {
        "origin": "string",
        "destination": "string",
        "tripType": "number",
        "bookingStatus": "number",
        "bookingRefNo": "string",
        "emailNotification": "number",
        "totalFeeNTaxes": "number",
        "supplierName": "string",
        "currencyExchangeRate": "number",
        "ttFlightSegmentDetails": [
          {
            "spPNR": "string",
            "airlinePNR": "string",
            "vendorType": "number",
            "originCity": "string",
            "destinationCity": "string",
            "inclCheckInBaggAllowance": "string",
            "adultCabinBagAllowance": "string",
            "childInclChkInBagAllowance": "string",
            "childCabinBagAllowance": "string",
            "infantInclChkInBagAllowance": "string",
            "infantCabinBagAllowance": "string"
          }
        ],
        "ttFlightLegDetails": [
          {
            "segmentRefNo": "number",
            "flightSwitchingWaitingTime": "string",
            "cabinClass": "string",
            "deptDate": "string",
            "deptTime": "string",
            "originCityName": "string",
            "originName": "string",
            "origin": "string",
            "deptTerminal": "string",
            "arrTime": "string",
            "operatingCarrier": "string",
            "destinationCityName": "string",
            "destinationName": "string",
            "destination": "string",
            "arrTerminal": "string",
            "flightDuration": "string",
            "airlineCode": "string",
            "airlineName": "string",
            "flightNo": "string"
          }
        ],
        "ttFlightInvoiceDetails": [
          {
            "currency": "string",
            "tthreeOdeysysMarkup": "number",
            "tthreeAgencyMarkup": "number",
            "tthreeAgencyOnflyMarkup": "number",
            "feeNTaxes": "number",
            "branchMarkup": "number",
            "baseFare": "number",
            "agencyInvoiceAmt": "number",
            "totalSurchargeAmount": "number",
            "tthreeServiceCharge": "number",
            "tthreeDiscount": "number"
          }
        ],
        "ttFlightPassengerDetails": [
          {
            "firstName": "string",
            "lastName": "string",
            "middleName": "string",
            "title": "string",
            "passengerType": "number",
            "gender": "number",
            "age": "number",
            "passportNo": "string"
          }
        ],
        "ttFlightPassengerSsrs": [
          {
            "passengerNo": "number",
            "segmentRefNo": "number",
            "ssrType": "number",
            "ssrNo": "number",
            "ssrCode": "string",
            "ssrAmount": "number",
            "description": "string",
            "currency": "string",
            "legNo": "number"
          }
        ],
        "ttFlightPaxSegmentBookDetails": [
          {
            "ticketNo": "string",
            "passengerNo": "number"
          }
        ]
      },
      "insuranceBookEntity": "string"
    },
    "resultList": [
      {
        "orderType": "string"
      }
    ]
  },
  "roundUpStatus": "number",
  "paymentResponseStatus": "boolean",
  "paymentResponse": {
    "errorMsg": "string"
  }
}
```
</div>

> **Note:** See full JSON schema above for nested details.

---

### 🧠 Observations

- Old object includes multiple nulls, nested unused lists, and internal logic variables
- Recommended structure includes **only user-facing, required fields**
- Easier to validate, test, and debug in frontend/backend interaction
- Designed for RESTful API and Angular consumption

---

## 📸 Related Screenshots

Booking Confirmation Screenshot  
![Booking Confirmation](./confirmation-screenshot.png)

---

## ⚠️ Page Purpose

> This page is for confirming booking details and does not perform validation.

---

## 🗂️ Related JSP

Main JSP files for this page:  
<code>bookingConfirmationjsp.jsp</code>
