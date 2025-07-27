# ✈️ Booking Module Investigation – Front/Back Contract Review

Welcome aboard! This document captures the ongoing work and analysis related to the **Booking Module** of our system.  
The goal? To modernize, simplify, and document the backend/frontend contracts — with elegance and no nonsense (well, maybe a little).

---

### 🎯 Objective

Break down the legacy structure of booking-related pages and endpoints  
→ Compare them to modern, RESTful, Angular-friendly alternatives  
→ Recommend transformations that make the codebase cleaner, leaner, and future-proof.

---

### 👨‍💻 My Focus Area

As part of this larger task, my responsibility is the **Flight Widget Page**, which includes:
- 🛫 **One Way**
- 🔄 **Round Trip**
- 🌍 **Multi-City**

Each flow is analyzed for:
- Data structure quality
- JSON contract sanity
- Frontend rendering patterns (JSP vs Angular)
- Upgrade potential

---

Let’s dive into each page or endpoint step by step, comparing how it works now vs how it *should*.


## 🏢 Endpoint: `odeysysadmin/branchSelection/`

### 📄 Description
This is one of the legacy endpoints in the booking system. It returns a `ModelAndView` object used to render a **branch selection page** in a JSP view.  
As part of the booking workflow, this page allows the user to choose a branch from a dropdown.

### 🔄 My Role in This
As part of the Flight Widget/Booking Module investigation, this page is analyzed for potential improvement.  
It currently works in a traditional Spring MVC + JSP flow, but can be enhanced to better support RESTful, frontend-driven architecture.

---

### 📥 Legacy Behavior

- **Type:** Spring `ModelAndView`
- **Injected Property:** `branchList`
- **Used In:** JSP page to render a branch `<select>` dropdown
- **Format:** Full list of group/branch models with many unused fields
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <span style="background:#333; padding:2px; border-radius: 2px">branchList</span> Value:</h4> </summary>

```json
[
  {
    "availPiSearch": null,
    "companyImage": null,
    "creationTime": 1752659424364,
    "decription": null,
    "fqnName": null,
    "gapprovalStatus": null,
    "groupCode": "BRN10",
    "groupId": 964,
    "groupLevel": null,
    "groupName": "Mansoura",
    "importPnr": 1,
    "mappedagencyid": null,
    "maxRecordPerPage": 0,
    "noOfDepartment": null,
    "oldName": null,
    "operatingCountry": null,
    "orgContactModel": null,
    "orgModal": null,
    "pageNumber": 1,
    "parenGroupList": null,
    "parentGroupId": 0,
    "phoneCode": null,
    "phoneCodeOne": null,
    "siteId": 0,
    "status": null,
    "userBranchList": null,
    "userModel": null,
    "userOperatingCountryList": null
  }
]
```
</details>

### ✅ Recommended Approach: REST API

- GET /api/branches

#### 🧾 Sample `response` Value:
```json
[
  {
    "branchId": 964,
    "branchName": "Mansoura",
    "branchCode": "BRN10"
  }
]
```

---

## 🚫 Endpoint: `branchSelection/selectBranch`

### 📄 Description
This endpoint is triggered when a user selects a branch in the branch selection dropdown.  
It returns some backend data, but it is **not used meaningfully** anywhere in the frontend or backend logic.

---

### 📥 Current Behavior

- **Type:** REST API
- **Triggered By:** Selecting a branch
- **Data Returned:** A nested array called `agencyList1` and a flat `PRODUCTLIST`

#### 🔧 Sample Response:
```json
{
  "agencyList1": [
    [
      10482,
      "AGN33",
      67,
      948,
      "AGN9590",
      null
    ],
    [
      10514,
      "cai",
      67,
      948,
      "AGN9610",
      null
    ]
  ],
  "PRODUCTLIST": [1, 2, 3, 4]
}
```
### 🔍 Observation
- No values from this response are used in the UI or any known logic

- The only side effect is navigating the browser to flight/flightWidget

- The actual page load is handled separately by a ModelAndView, which we'll describe shortly

### ✅ Recommendation
- 🧼 Recommended Action: Ignore or Deprecate
- ✅ Do not rely on or maintain this endpoint

- ✅ Remove or comment out frontend call

- ✅ Redirect/navigation should be handled directly without needing a fake API

- ✅ All real data loading is handled by the next endpoint: flight/flightWidget

---

## ✈️ Endpoint: `/flight/flightWidget`

### 📄 Description
This is the main **entry point** of the flight booking page.  
It returns a `ModelAndView` that provides required data to the JSP view, including branch and agency information, which are then rendered in dropdowns.

> 🧠 This is part of the legacy server-rendered flow. Our goal is to modernize it by replacing it with a clean REST structure.

---

### 📥 Current Behavior

- **Type:** `ModelAndView`
- **View:** JSP
- **Injected Properties:**
    - `branchList`: List of branches
    - `agencyList`: List of agencies (nested arrays)

---

#### 🏢 1) `branchList` (Property)
```json
[
  {
    "availPiSearch": null,
    "companyImage": null,
    "creationTime": 1752659424364,
    "decription": null,
    "fqnName": null,
    "gapprovalStatus": null,
    "groupCode": "BRN10",
    "groupId": 964,
    "groupLevel": null,
    "groupName": "Mansoura",
    "importPnr": 1,
    "mappedagencyid": null,
    "maxRecordPerPage": 0,
    "noOfDepartment": null,
    "oldName": null,
    "operatingCountry": null,
    "orgContactModel": null,
    "orgModal": null,
    "pageNumber": 1,
    "parenGroupList": null,
    "parentGroupId": 0,
    "phoneCode": null,
    "phoneCodeOne": null,
    "siteId": 0,
    "status": null,
    "userBranchList": null,
    "userModel": null,
    "userOperatingCountryList": null
  }
]
```
#### 🏢 2) `agencyList` (Property)
```json
[
  [
    10482,
    "AGN33",
    67,
    948,
    "AGN9590",
    null
  ],
  [
    10514,
    "cai",
    67,
    948,
    "AGN9610",
    null
  ]
]
```

---
### ✅ Recommended Approach: REST API

- GET /api/agencies/{branchId}
- (Dynamically load agencies based on selected branch)

#### 🧾 Sample `response` Value:
```json
[
  {
    "agencyId": 10482,
    "agencyCode": "AGN33",
    "agencyName": "AGN33"
  }
]
```




---

## 🧑‍💼 Endpoint: `POST /flight/selectAgency`

### 📄 Description

This endpoint is triggered when a user selects an **Agency** in the dropdown.  
It returns a list of **agents (staff users)** under that agency, which is rendered in another dropdown and made required for booking.

---

### 📥 Current Behavior

- **Type:** REST API (POST)
- **Triggered By:** Selecting an agency
- **Response:**
  - `agentList`: A list of deeply nested user objects
  - `PRODUCTLIST`: List of numbers (unused)

#### 🧾 Sample Response:


```json
{
  "agentList": [
    {
      "userAlias": null,
      "password": null,
      "userId": 12756,
      "title": 0,
      "displayTitle": null,
      "firstName": "sayed",
      "middleName": null,
      "lastName": null,
      "mobileNo": null,
      "mobileNo1": null,
      "phoneCode1": null,
      "dob": null,
      "profileImage": null,
      "uploadProfileImage": null,
      "email": null,
      "fax": null,
      "gender": 0,
      "marritalStatus": 0,
      "userType": 0,
      "approvalId": null,
      "displayUserType": null,
      "lastLoginDate": null,
      "creationTime": null,
      "lastModifiedDate": null,
      "userStatus": 0,
      "disableSignIn": 0,
      "importPnr": null,
      "transferPnr": null,
      "userScopeType": 0,
      "lastModifiedPassTime": null,
      "selectedSite": null,
      "userAddressList": [],
      "userContacts": [],
      "userRolesList": [],
      "groupBeanList": [],
      "operatingCountryList": [],
      "assignedGroupAdminList": [],
      "userTemplate": {
        "templateId": 0,
        "siteId": 0,
        "templateName": null,
        "description": null,
        "status": 0,
        "creation_time": null,
        "created_by": null,
        "last_updated_by": null,
        "checkStatus": 0,
        "templateMenuMapping": [],
        "menuBeanList": []
      },
      "staff": {
        "id": 0,
        "staffCode": null,
        "department": null,
        "designation": null,
        "isUndercut": null,
        "isUndercutBelowNetPrice": null,
        "status": null,
        "user": null,
        "userModal": null,
        "noOfDepartment": null,
        "noOfSelectedDepartment": null,
        "company": null,
        "userRoleType": null,
        "userRoleName": null,
        "branch": null,
        "branchIds": null,
        "operatingCountry": null,
        "firstName": null,
        "groupId": null,
        "userAlias": null,
        "userEmail": null,
        "action": null,
        "changeStatus": null,
        "branchName": null,
        "roleIds": null,
        "approvalUserId": null,
        "approvalStatus": null,
        "approvalDate": null,
        "approvalRemarks": null,
        "approvalBy": null,
        "displayRights": null,
        "userType": null,
        "userTypeName": null,
        "currentSearchStatus": null,
        "pageNumber": 1,
        "maxRecordPerPage": 0,
        "userBranchList": null,
        "userOperatingCountryList": null,
        "staffDepartmentMappingList": []
      },
      "userRoleMappings": [],
      "userOrganizationId": null,
      "agencyId": 0,
      "agencyCode": null,
      "agencyName": null,
      "agentId": 0,
      "agentName": null,
      "clientIp": null,
      "browserInfo": null,
      "sessionId": null,
      "phoneCode": null,
      "staffDepartmentMappingList": [],
      "uploadImage": null,
      "staffDepartmentMappingNewList": []
    }
  ],
  "PRODUCTLIST": [
    1,
    2,
    3,
    4
  ]
}
```


## ⚠️ Observations
- Overloaded, verbose payload with many unused fields

- Nested structure makes it difficult to extract what’s actually needed

- PRODUCTLIST is again unused, as in previous endpoints

---
### ✅ Recommended Approach: REST API

- GET /api/agents/{agencyId}
- (Dynamically load agents based on selected agency)

#### 🧾 Sample `response` Value:
```json
[{
  "staffId": 10482,
  "staffName": "Mohamed Nasr"
}]

```

---


## 👤 Endpoint: `POST /flight/selectAgent`

### 📄 Description

This endpoint is triggered when a user selects an **Agent**.  
However, it does **not** return any meaningful data — instead, it simply navigates the browser back to `/flight/flightWidget`, effectively **reloading** the page and re-fetching values already known.

---

### 📥 Current Behavior

- **Type:** `POST`
- **Triggered By:** Agent selection
- **Effect:** Redirects to `/flight/flightWidget`

---

## 🔁 `/flight/flightWidget` (Again)

Re-fetches previously known values and injects them into the JSP view again:

### Injected Properties:

#### 🏢 1) `branchList`:
```json
[
  {
    "availPiSearch": null,
    "companyImage": null,
    "creationTime": 1752659424364,
    "decription": null,
    "fqnName": null,
    "gapprovalStatus": null,
    "groupCode": "BRN10",
    "groupId": 964,
    "groupLevel": null,
    "groupName": "Mansoura",
    "importPnr": 1,
    "mappedagencyid": null,
    "maxRecordPerPage": 0,
    "noOfDepartment": null,
    "oldName": null,
    "operatingCountry": null,
    "orgContactModel": null,
    "orgModal": null,
    "pageNumber": 1,
    "parenGroupList": null,
    "parentGroupId": 0,
    "phoneCode": null,
    "phoneCodeOne": null,
    "siteId": 0,
    "status": null,
    "userBranchList": null,
    "userModel": null,
    "userOperatingCountryList": null
  }
]
```

#### 🏢 2) `branchList`:
```json
[
  [
    10482,
    "AGN33",
    67,
    948,
    "AGN9590",
    null
  ],
  [
    10514,
    "cai",
    67,
    948,
    "AGN9610",
    null
  ]
]
```

#### 🏢 3) `branchList`:
```json
[
  {
    "creationTime": null,
    "password": null,
    "agentId": 0,
    "fax": null,
    "phoneCode": null,
    "importPnr": null,
    "transferPnr": null,
    "sessionId": null,
    "userId": 12777,
    "gender": 0,
    "userAlias": null,
    "title": 0,
    "agencyCode": null,
    "userType": 0,
    "agencyId": 0,
    "mobileNo": null,
    "agencyName": null,
    "uploadImage": null,
    "profileImage": null,
    "operatingCountryList": [],
    "approvalId": null,
    "firstName": "ahmed",
    "lastName": null,
    "email": null,
    "dob": null,
    "clientIp": null,
    "middleName": null,
    "agentName": null,
    "phoneCode1": null,
    "displayUserType": null,
    "browserInfo": null,
    "mobileNo1": null,
    "userOrganizationId": null,
    "disableSignIn": 0,
    "userStatus": 0,
    "lastModifiedDate": null,
    "selectedSite": null,
    "staffDepartmentMappingNewList": [],
    "uploadProfileImage": null,
    "lastLoginDate": null,
    "marritalStatus": 0,
    "displayTitle": null,
    "userScopeType": 0,
    "staffDepartmentMappingList": [],
    "lastModifiedPassTime": null
  }
]
```


### ⚠️ Observations
- This flow creates an unnecessary page reload

- All values (branchList, agencyList, agentList) are already retrieved in previous steps

- No meaningful state is changed during this POST

### ✅ Recommendation
#### ❌ Skip this step entirely.

- Do not call POST /flight/selectAgent

- Avoid re-navigating to /flight/flightWidget

- Maintain agent selection state locally in frontend

- Only fire relevant logic when actual submission or validation is needed


---


## ✈️ Endpoint: `GET /getAllAirports`

### 📄 Description

This endpoint is used to retrieve a **list of all airports**, including metadata like airport code, name, country, and city.  
Currently, it returns a **heavy and verbose** payload with many unused or redundant fields.

---

### 📥 Current Behavior

- **Method:** `GET`
- **Response:** Full airport object with 40+ fields

#### 🧾 Sample Response:
```json
[
  {
    "creationTime": null,
    "status": 0,
    "longitute": null,
    "approvalDate": null,
    "action": "Create",
    "lastModTime": null,
    "createdBy": 0,
    "approvalUserId": null,
    "flightSupplierId": null,
    "userType": null,
    "maxRecordPerPage": 0,
    "pageNumber": 1,
    "airportJson": null,
    "is_international": false,
    "is_domestic": false,
    "approvalStatus": 0,
    "cityName": "Jeddah",
    "airportSuppliersList": null,
    "airportCode": "JED",
    "latitude": null,
    "nearByAirport": null,
    "countryID": 195,
    "updatedCountryName": "SA",
    "siteId": 0,
    "stationType": "1",
    "airportName": "King Abdulaziz International",
    "displayRights": null,
    "cityId": 3635,
    "airportId": 3231,
    "selectAirport": null,
    "approvalRemarks": null,
    "currentSearchStatus": null,
    "countryName": "Saudi Arabia",
    "lastUpdatedBy": 0,
    "clientIpAddress": null,
    "updatedCityName": null,
    "isSource": false,
    "airportsSubHistory": null,
    "approvalBy": null,
    "airportMapModal": null,
    "airportCheckStatus": false,
    "updatedCityId": 0,
    "updatedCountryId": 0,
    "loggedInUserOperatingCountryList": null,
    "gmt": 0.0,
    "statusName": null,
    "isDestination": false,
    "type": null
  }
]
```
### ✅ Recommended Approach: REST API

- GET /api/get-all-airports?search={codeOrName}

#### 🧾 Sample `response` Value:
```json
[
  {
    "airportId": 3231,
    "airportCode": "JED",
    "airportName": "King Abdulaziz International",
    "cityId": 3635,
    "cityName": "Jeddah",
    "countryId": 195,
    "countryName": "Saudi Arabia"
  }
]
```

- 🎯 Returns just enough information to identify the airport, link it to city/country, and display in dropdowns or selectors.


---

## ✈️ Endpoint: `GET /getPreferedAirline`

### 📄 Description

This endpoint is responsible for retrieving **airline information** by name or code, often used when users select or search for a preferred airline.

---

### 📥 Current Behavior

- **Method:** `GET`
- **Parameters:** airline name or code
- **Response:** Full airline object with lots of extra and unused data

#### 🧾 Sample Response:
```json
[
  {
    "userId": null,
    "action": "",
    "approvalUserId": null,
    "approvalDate": null,
    "displayRights": null,
    "approvalBy": null,
    "approvalStatus": 1,
    "networkType": 2,
    "imagePath": null,
    "userType": null,
    "imgPath": null,
    "imagePathShowPrice": null,
    "allianceName": null,
    "codeSharingAllowed": false,
    "currentSearchStatus": null,
    "maxRecordPerPage": 0,
    "pageNumber": 1,
    "approvalRemarks": null,
    "airlineCode": "TEST",
    "airlineName": "test",
    "airlineType": 1,
    "airlinesSubHistory": null,
    "clientIpAddress": null,
    "imagePathPriceMatrix": null,
    "airlinePassport": null,
    "networkTypeName": null,
    "creationTime": null,
    "status": 1,
    "createdBy": 0,
    "lastModTime": null,
    "siteId": 0,
    "contentId": 746,
    "lastUpdatedBy": 0
  }
]
```

- ✅ Recommendation
- 🔄 Replace with:
- GET /api/get-airline?search={codeOrName} 
- 🧾 Sample Response (Recommended):
```json
[
  {
    "airlineCode": "TEST",
    "airlineName": "test",
    "airlineType": 1,
    "approvalStatus": 1,
    "status": 1
  }
]
```
- 🎯 Keep only the essential details needed to populate dropdowns, filters, or display basic airline info.

---


## 👤 Endpoint: `POST /searchPaxByNameMob`

### 📄 Description

Used to search for a passenger using their **name** or **mobile number**. The system attempts to locate and match existing passenger records, most likely for reuse in booking forms.

---

### 📥 Current Behavior

- **Method:** `POST`
- **Parameters:** Passenger name (and optionally mobile)
- **Response:** Large response object with redundant and deeply nested metadata.

#### 🧾 Sample Response:
```json
{
  "resultList2": null,
  "productName": null,
  "errorCode": null,
  "errorMessage": null,
  "resultMap": null,
  "resultLisOdeysys": null,
  "entryCount": null,
  "resultInteger2": 0,
  "posObjectId": null,
  "resultString2": null,
  "resultObject": null,
  "resultString": null,
  "resultBoolean": null,
  "policyNoList": null,
  "totalRecordsCountForSearch": null,
  "twoStepProc": null,
  "cancellationCharge": null,
  "suppCancellationStatus": null,
  "resultObject2": null,
  "productBooked": false,
  "supplierResponseFailed": false,
  "resultDouble1": null,
  "decimalCount": 0,
  "resultList": [
    {
      "oldName": null,
      "mealPreference": null,
      "status": 1,
      "phoneCode": "+20",
      "seatPreference": null,
      "depTimePreference": null,
      "specialPreference": null,
      "iqamaNumber": null,
      "iqamaExpiryDate": null,
      "nationalIdNumber": null,
      "nationalIdExpiryDate": null,
      "gender": 0,
      "createdBy": 790,
      "title": 0,
      "maxRecordPerPage": 0,
      "pageNumber": 1,
      "branchId": "BRN2",
      "agencyId": null,
      "age": 1,
      "companyId": null,
      "nationalityCode": "EG",
      "passportExpiryDate": null,
      "titleName": null,
      "firstName": "ahmed",
      "lastName": "kamel",
      "email": "akamel@wondertravel-eg.com",
      "nationalityStr": "Egypt",
      "phone": "1052454352",
      "passportNumber": "a987654342",
      "dob": 1693087200000,
      "passportIssuedCountryName": null,
      "oldEmail": null,
      "hiddenId": null,
      "city": null,
      "middleName": null,
      "branchIds": null,
      "phone1": null,
      "iqamaIssueCountry": null,
      "phoneCode1": null,
      "nationalIdIssueCountry": null,
      "journeyDate": null,
      "fromSearch": false,
      "paxIds": null,
      "paxFrequentFlyer": [],
      "paxRelationList": [],
      "passportIssueCountry": null,
      "createdDate": 1742982136000,
      "mainPaxId": null,
      "postalCode": null,
      "paxType": null,
      "province": null,
      "nationality": "67",
      "companyName": null,
      "mainPaxName": null,
      "statusUpdateProcess": false,
      "genderName": null,
      "hotelPreference": null,
      "updatedBy": null,
      "updateDate": 1742982136000,
      "companyLocation": null,
      "searchDOB": null,
      "phoneCodeFlag": null,
      "countryFlagCode": null,
      "countryFlagCode1": null,
      "iqamaIssuedCountryName": null,
      "nationalIssuedCountryName": null,
      "address": null,
      "id": 5118
    }
  ],
  "resultString3": null,
  "resultInteger": null,
  "resultDouble": null,
  "resultIntegerArray": null,
  "hotelBooked": false,
  "resultStringHotel": null,
  "resultObjecOdeysys": null,
  "cancellationStatus": null,
  "resultExplanation": null,
  "roundOffStatus": 0,
  "resultBoolean1": null
}
```


- ✅ Recommendation
- 🔄 Replace with:
- GET /api/get-passenger?search={passengerName}
- 🧾 Sample Response (Recommended):
```json
[
  {
    "name": "ahmed kamel",
    "id": 5118,
    "age": 1,
    "mobile": "1052454352",
    "gender": "male",
    "email": "akamel@wondertravel-eg.com",
    "nationality": "EG",
    "phoneCode": "+20",
    "dob": 1693087200000,
    "type": "adult"
  }
]
```
- 🎯 Keep only the essential details needed to populate dropdowns, filters, or display basic passenger info.

---
## ✈️ Endpoint: `POST /flightOneWay`

### 📄 Description

This endpoint is responsible for searching one-way flights based on the user-selected criteria on the **Flight Widget Page**.

---

### 🧾 Current Request Format (FormData)

The backend currently accepts the form as **`FormData`**, mostly structured in nested key patterns. It includes flight origin, destination, cabin class, passenger counts, and many options toggled with `on` flags.

#### 🔧 Example FormData:
```text
passengerType = passengers
flightwidgetElement[0].multiOriginList[0] = SHH
flightwidgetElement[0].multiOriginNameList[0] = Shishmaref
flightwidgetElement[0].multiOriginCityNameList[0] = Shishmaref
flightwidgetElement[0].multiOriginCountryIdList[0] = 235
flightwidgetElement[0].multiOriginList[1] = DXB
flightwidgetElement[0].multiOriginNameList[1] = Dubai International Airport
flightwidgetElement[0].multiOriginCityNameList[1] = Dubai
flightwidgetElement[0].multiOriginCountryIdList[1] = 2
flightwidgetElement[0].covercountry = SA
flightwidgetElement[0].residency = AE
flightwidgetElement[0].age = 45
tripType = OneWay
flightwidgetElement[0].startingFrom = CAI
flightwidgetElement[0].startingFromName = Cairo International Airport
flightwidgetElement[0].startingFromCity = Cairo
flightwidgetElement[0].originCountryId = 67
agencyId = 0
flightwidgetElement[0].goingTo = JED
flightwidgetElement[0].goingToName = King Abdulaziz International
flightwidgetElement[0].destCountryId = 195
flightwidgetElement[0].goingToCity = Jeddah
flightwidgetElement[0].destinationCityId = 3635
flightwidgetElement[0].dateOfJourney = 31-07-2025
flightwidgetElement[0].cabinClass = 2
flightwidgetElement[0].rbd = B,C,D,
noOfAdults = 3
noOfChilds = 3
noOfInfants = 3
nearByAirport = true
baggageFareOnly = true
returnAllFaresResultFromGal = true
RBDONEWAY = B
RBDONEWAY = C
RBDONEWAY = D
isNonStop = true
isExcludeLcc = true
prefferedAirline = VW
prefferedAirlineName = Transportes Aeromar
```


- ✅ Recommendation
- 🔄 Replace with:
```http
- POST /api/flight-one-way 
- Content-Type: application/json
```
- 🧾 Sample Request (Recommended):
```json
{
  "passengerType": null,
  "passengerIdList": ["7631-Mohamed Nasr-Egypt"],
  "tripType": "OneWay",
  "branchId": 123,
  "agencyId": 532,
  "agentId": 1234,
  "passengers": {
    "adults": 3,
    "children": 3,
    "infants": 3
  },
  "nearByAirport": true,
  "baggageFareOnly": true,
  "returnAllFaresResultFromGal": true,
  "isNonStop": true,
  "isExcludeLcc": true,
  "cabinClass": 2,
  "rbd": ["B", "C", "D"],
  "preferredAirlineCode": "VW",
  "allianceName": "*A",
  "flightWidgetElement": {
    "multiOrigins": ["SHH", "DXB"],
    "coverCountry": "SA",
    "residency": "AE",
    "originAirportCode": "CAI",
    "destinationAirportCode": "JED",
    "dateOfJourney": "31-07-2025"
  }
}
```
- 🎯 Keep only the essential details needed to populate dropdowns, filters, or display basic info.

---



## 🔁 Endpoint: `POST /flightOneWay` (Used for RoundTrip too!)

### 📄 Description

Although named `flightOneWay`, this endpoint also handles **RoundTrip** bookings. The request body is sent as `FormData`, consisting of multiple scattered fields and indexed lists.

---

### 🧾 Current Request Format (FormData)

This is how the frontend currently sends a **RoundTrip** request:

```plaintext
passengerType = passengers
passengerIdList[0] = 7631-null-Egypt

flightwidgetElement[0].multiOriginList[0] = SHH
flightwidgetElement[0].multiOriginNameList[0] = Shishmaref
flightwidgetElement[0].multiOriginCityNameList[0] = Shishmaref
flightwidgetElement[0].multiOriginCountryIdList[0] = 235
flightwidgetElement[0].multiOriginList[1] = DXB
flightwidgetElement[0].multiOriginNameList[1] = Dubai International Airport
flightwidgetElement[0].multiOriginCityNameList[1] = Dubai
flightwidgetElement[0].multiOriginCountryIdList[1] = 2

flightwidgetElement[0].covercountry = IN
flightwidgetElement[0].residency = AE
flightwidgetElement[0].age = 45
flightwidgetElement[0].depCountry = AE

tripType = RoundTrip
flightwidgetElement[0].startingFrom = CAI
flightwidgetElement[0].startingFromName = Cairo International Airport
flightwidgetElement[0].startingFromCity = Cairo
flightwidgetElement[0].originCountryId = 67

flightwidgetElement[0].goingTo = JED
flightwidgetElement[0].goingToName = King Abdulaziz International
flightwidgetElement[0].goingToCity = Jeddah
flightwidgetElement[0].destCountryId = 195
flightwidgetElement[0].destinationCityId = 3635

flightwidgetElement[0].dateOfJourney = 22-07-2025
flightwidgetElement[0].returnDateOfJourney = 31-07-2025

flightwidgetElement[0].cabinClass = 3
flightwidgetElement[0].rbd = A
flightwidgetElement[0].rbd = E
flightwidgetElement[0].rbd = 

flightwidgetElement[1].cabinClass = 4
flightwidgetElement[1].rbd = I
flightwidgetElement[1].rbd = J
flightwidgetElement[1].rbd = K
flightwidgetElement[1].rbd = 

agencyId = 0
noOfAdults = 1
noOfChilds = 2
noOfInfants = 5

nearByAirport = true
baggageFareOnly = true
returnAllFaresResultFromGal = true
isNonStop = true
isExcludeLcc = true
allianceName = *O
```

- ✅ Recommended Request Format (JSON API)
- 🔁 Replace with: POST /api/flight-round-trip
```json
{
  "passengerType": "passengers",
  "passengerIdList": ["7631-Mohamed Nasr-Egypt"],
  "tripType": "RoundTrip",
  "branchId": 1233,
  "agencyId": 35252,
  "agentId": 1234,
  "passengers": {
    "adults": 1,
    "children": 2,
    "infants": 5
  },
  "nearByAirport": true,
  "baggageFareOnly": true,
  "returnAllFaresResultFromGal": true,
  "isNonStop": true,
  "isExcludeLcc": true,
  "allianceName": "*O",
  "preferredAirline": "VW",
  "flightwidgetElement": [
    {
      "multiOrigins": ["SHH", "DXB"],
      "covercountry": "IN",
      "residency": "AE",
      "age": 45,
      "depCountry": "AE",
      "originAirportCode": "CAI",
      "destinationAirportCode": "JED",
      "onwardDate": "2025-07-22",
      "returnDate": "2025-07-31",
      "onwardCabinClass": 3,
      "onwardRbd": ["A", "E"],
      "returnCabinClass": 4,
      "returnRbd": ["I", "J", "K"]
    }
  ]
}
```


---


## 🌍 Endpoint: `POST /flightMultiCity`

### 📄 Description

This endpoint is responsible for processing **Multi-City flight bookings**.  
It currently accepts a `FormData` object containing all segments under indexed `flightwidgetElement[n]` fields, then returns a `ModalAndView` to render the results.

---

### 📥 Current Request Format (FormData)

```text
tripType              MultiCity
passengerType             passengers
passengerIdList[0]              7631-null-Egypt
flightwidgetElement[0].startingFrom             CAI
flightwidgetElement[0].startingFromName             Cairo International Airport
flightwidgetElement[0].startingFromCity             Cairo
flightwidgetElement[0].originCountryId              67
flightwidgetElement[0].goingToName              King Abdulaziz International
flightwidgetElement[0].goingTo              JED
flightwidgetElement[0].destCountryId              195
flightwidgetElement[0].goingToCity              Jeddah
flightwidgetElement[0].destinationCityId              3635
flightwidgetElement[0].dateOfJourney              22-07-2025
flightwidgetElement[0].cabinClass             3
flightwidgetElement[0].rbd              B
flightwidgetElement[0].rbd              D
flightwidgetElement[0].rbd              F
flightwidgetElement[1].startingFrom             JED
flightwidgetElement[1].startingFromName             King Abdulaziz International
flightwidgetElement[1].startingFromCity             Jeddah
flightwidgetElement[1].originCountryId              195
flightwidgetElement[1].goingToName              Dubai International Airport
flightwidgetElement[1].goingTo              DXB
flightwidgetElement[1].destCountryId              2
flightwidgetElement[1].goingToCity              Dubai
flightwidgetElement[1].destinationCityId              0
flightwidgetElement[1].dateOfJourney              31-07-2025
flightwidgetElement[1].cabinClass             4
flightwidgetElement[1].rbd              U
flightwidgetElement[2].startingFrom             DXB
flightwidgetElement[2].startingFromName             Dubai International Airport
flightwidgetElement[2].startingFromCity             Dubai
flightwidgetElement[2].originCountryId              2
flightwidgetElement[2].goingToName              Abu Dhabi International
flightwidgetElement[2].goingTo              AUH
flightwidgetElement[2].destCountryId              2
flightwidgetElement[2].goingToCity              Abu Dhabi
flightwidgetElement[2].destinationCityId              0
flightwidgetElement[2].dateOfJourney              30-11-2025
flightwidgetElement[2].cabinClass             2
flightwidgetElement[2].rbd              R
flightwidgetElement[2].rbd              S
flightwidgetElement[2].rbd              T
flightwidgetElement[3].startingFrom             AUH
flightwidgetElement[3].startingFromName             Abu Dhabi International
flightwidgetElement[3].startingFromCity             Abu Dhabi
flightwidgetElement[3].originCountryId              2
flightwidgetElement[3].goingToName              Kigalin International
flightwidgetElement[3].goingTo              KGL
flightwidgetElement[3].destCountryId              194
flightwidgetElement[3].goingToCity              Kigali
flightwidgetElement[3].destinationCityId              0
flightwidgetElement[3].dateOfJourney              23-06-2026
flightwidgetElement[3].cabinClass             4
flightwidgetElement[3].rbd              D
flightwidgetElement[3].rbd              E
flightwidgetElement[3].rbd              F
flightwidgetElement[3].rbd              H
noOfAdults              2
noOfChilds              4
noOfInfants             1
baggageFareOnly             true
_baggageFareOnly              on
returnAllFaresResultFromGal             true
_returnAllFaresResultFromGal              on
flightwidgetElement[0].rbd                F
```

- ✅ Recommended Request Format (JSON API)
- 🔁 Replace with: POST /api/flight-multicity
```json
{
  "tripType": "MultiCity",
  "passengerIdList": ["7631-Name-Egypt"],
  "branchId": 1233,
  "agencyId": 35252,
  "agentId": 1234,
  "passengers": {
    "adults": 2,
    "children": 4,
    "infants": 1
  },
  "baggageFareOnly": true,
  "returnAllFaresResultFromGal": true,
  "flightwidgetElement": [
    {
      "originAirportCode": "CAI",
      "destinationAirportCode": "JED",
      "dateOfJourney": "2025-07-22",
      "cabinClass": 3,
      "rbd": ["B", "D", "F"]
    },
    {
      "originAirportCode": "JED",
      "destinationAirportCode": "DXB",
      "dateOfJourney": "2025-07-31",
      "cabinClass": 4,
      "rbd": ["U"]
    },
    {
      "originAirportCode": "DXB",
      "destinationAirportCode": "AUH",
      "dateOfJourney": "2025-11-30",
      "cabinClass": 2,
      "rbd": ["R", "S", "T"]
    },
    {
      "originAirportCode": "AUH",
      "destinationAirportCode": "KGL",
      "dateOfJourney": "2026-06-23",
      "cabinClass": 4,
      "rbd": ["D", "E", "F", "H"]
    }
  ]
}

```


--- 
### 🔐 Endpoint: `/checkIfValidUser/ValidateUserWindow`

#### 📄 Description
This endpoint is used to validate the user's session and detect if the application is opened in multiple browser tabs. It helps ensure single-tab usage and redirect users when their session is no longer valid.

#### 🛠️ Parameters
- `t`: The current timestamp. Typically generated on the client side.
- `windowName`: The name of the current browser window.

#### 🧠 Current Behavior
- If `windowName` is empty and the server detects an already open session, it assigns `"loginUser"` to the current window.
- If the server returns `"newTab"`, the application alerts the user and redirects them to an error page — this is used to prevent multiple tabs.
- If the server returns `1`, it means the session is invalid, and the user should be redirected to the login page.

#### ✅ Recommendation
- Replace this endpoint with a cleaner version such as:
  - `/check-validate-user/validate-user?t={ISODateTime}`
- The backend should accept standard ISO 8601 date strings (e.g., `2025-07-27T11:54:27Z`) for better compatibility and parsing.
- The response should return structured data with enum-based statuses instead of raw strings or numbers. For example:
  - `VALID`
  - `INVALID_SESSION`
  - `MULTI_TAB_NOT_ALLOWED`

#### 💡 Notes
- Modern applications (like Angular 2+ frontends) should handle such checks using interceptors or centralized session services.
- Using blocking synchronous validation methods should be avoided for performance and UX reasons.

--- 
### 🌐 External Endpoint: `https://salesiq.zohopublic.com/visitor/v2/channels/website`

#### 📄 Description
This endpoint is part of Zoho SalesIQ’s public API. It is used by Zoho’s website widget to track and manage website visitor sessions.

#### 📥 Request (as query parameters)
- `widgetcode`: `07de97db4f603764716ff96e7371a6c5eaad4fa5b1b0e215b8de2214ef5bd7c8`
- `internal_channel_req`: `true`
- `last_modified_time`: `1737629810707`
- `version`: `V26`
- `browser_language`: `en`
- `current_domain`: `http://192.168.1.210`
- `pagetitle`: `NDC Admin`

#### 🧠 Implementation Notes
- This endpoint is **not implemented** anywhere in our application code.
- It is automatically called and managed by the **Zoho SalesIQ widget**, which is likely embedded via a script tag or external integration.

#### ✅ Recommendation
- **No action required**.
- Ensure the widget is correctly configured and does not conflict with core application behavior.
- This call can be safely ignored in the context of backend/API architecture reviews.


--- 
### 🌐 External Endpoint: `https://salesiq.zohopublic.com/wondertravel/fetchvisitorconfigurations.ls`

#### 📄 Description
This endpoint belongs to the **Zoho SalesIQ widget** service. It fetches dynamic visitor configuration forms that SalesIQ uses during chat sessions on the embedded widget.

#### 📥 Request (as query parameters)
- `avuid`: `5aa8e3ec-0e3d-4d59-98d9-ba15bad942d3`
- `lsid`: `584883000006764759`
- `visitor_question`: `undefined`
- `fetchallfields`: `true`
- `app_status`: `online`

#### 📤 Response (simplified)
Returns a list containing visitor form configuration including:
```json
[
  {
    "objString": {
      "form": {
        "form_type": "general",
        "sync_time": 1737629810707,
        "dname": "",
        "title": "",
        "msglist": [
          {
            "msg": "",
            "meta": {
              "format": "text",
              "input_card": {
                "visibility": "online",
                "maxlength": 100,
                "options": [],
                "placeholder": "",
                "type": "visitor_last_name"
              },
              "skippable": false,
              "field_name": ""
            },
            "dname": "",
            "mtime": "1753617280206"
          },
          {
            "msg": "",
            "meta": {
              "format": "email",
              "input_card": {
                "visibility": "online",
                "maxlength": 100,
                "options": [],
                "placeholder": "",
                "type": "visitor_email"
              },
              "skippable": false,
              "field_name": ""
            },
            "dname": "",
            "mtime": "1753617280207"
          },
          {
            "msg": "Can i have your phone number?",
            "meta": {
              "format": "phone",
              "input_card": {
                "visibility": "online",
                "maxlength": 100,
                "options": [],
                "placeholder": "Enter your phone number",
                "type": "visitor_phone"
              },
              "skippable": false,
              "field_name": "Phone"
            },
            "dname": "",
            "mtime": "1753617280208"
          }
        ],
        "fields_prefill_type": {
          "show_fields": true,
          "prefill": true
        }
      }
    },
    "module": "fetchvisitorconfigurations",
    "objType": "object"
  }
]
```
#### 🧠 Implementation Notes
- This endpoint is **not part of our application logic**.
- It is triggered **internally by the Zoho SalesIQ widget** embedded on the site.
- Its purpose is to load predefined fields and messages used in Zoho's live chat functionality.

#### ✅ Recommendation
- **No action required** for backend system integration.
- Confirm widget is properly embedded and allowed on necessary domains.
- This endpoint can be ignored when designing or migrating internal APIs.

---

### 📘 Endpoint: `GET json/globalProps.json`

#### 📄 Description
Fetches static global configuration values used across the system, such as validation rules and limits.

#### 📥 Request
- **Method**: `GET`
- **URL**: `/json/globalProps.json`

#### 📤 Response (example)
```json
{
  "globalProps": [
    {
      "passengerNameLength": 50,
      "arabicPattern": "[\\u0600-\\u06FF\\u0750-\\u077F]"
    }
  ]
}
```
##### ✅ Recommendation

- Functionality is fine as-is.

- Enhancement Suggestion: Rename the endpoint to follow consistent RESTful naming conventions:

- Replace json/globalProps.json with json/global-props

- Benefits: cleaner URL, better maintainability, consistency across other endpoints.

---

### 📘 Endpoint: `GET settings/Up-Selling`

#### 📄 Description
Fetches the current system configuration status for the **Up-Selling** feature. This configuration helps determine whether the Up-Selling option should be enabled or disabled in the application.

#### 📥 Request
- **Method**: `GET`
- **URL**: `/settings/Up-Selling`

#### 📤 Response (example)
```json
{
  "statusCode": 200,
  "message": "Request Accepted",
  "actionKey": "Up-Selling",
  "actionValue": "1"
}
```


### 📘 Endpoint: `GET settings/CHECK-SUPPLIER-REQUEST-RESPONSE`

#### 📄 Description
Returns a configuration flag that indicates whether the system should log or validate **Supplier Request and Response** data for debugging or monitoring purposes and if we will show "Check Supplier" button or not

#### 📥 Request
- **Method**: `GET`
- **URL**: `/settings/CHECK-SUPPLIER-REQUEST-RESPONSE`

#### 📤 Response (example)
```json
{
  "statusCode": 200,
  "message": "Request Accepted",
  "actionKey": "CHECK-SUPPLIER-REQUEST-RESPONSE",
  "actionValue": "0"
}
```

---

### ✈️ Endpoint: `GET flight/lastFiveSearchs`

#### 📄 Description
This endpoint is intended to return the **last five flight search records** for the current user/session. However, in the current implementation, it usually returns an empty or default response.

#### 📥 Request
- **Method**: `GET`
- **URL**: `/flight/lastFiveSearchs`

#### 📤 Response (example)
```json
{
  "timeZone": null,
  "resultString": null,
  "resultList": [],
  "resultObject": null,
  "resultMap": null,
  "resultList2": null,
  "resultInteger": 0,
  "resultString4": null,
  "errorCode": null,
  "resultInteger2": 0,
  "resultBoolean": null,
  "resultString2": null,
  "resultObject2": null,
  "resultDouble1": null,
  "resultExplanation": null,
  "productBooked": false,
  "supplierResponseFailed": false,
  "decimalCount": 0,
  "policyNoList": null,
  "resultString3": null,
  "errorMessage": null,
  "resultObjecOdeysys": null,
  "resultDouble": null,
  "resultIntegerArray": null,
  "hotelBooked": false,
  "resultStringHotel": null,
  "resultLisOdeysys": null,
  "roundOffStatus": 0,
  "error": false
}
```

- ✅ Recommended replace response object with just list of data (resultList)

--- ---

### ✈️ Endpoint: `GET flight/getSuppliersName`

#### 📄 Description
This endpoint is currently used in the flightWidgetManual page only and includes test/dummy/invalid data.
#### 📥 Request
- **Method**: `GET`
- **URL**: `/flight/getSuppliersName`

#### 📤 Response (example)
```json
{
  "statusCode": 200,
  "message": "Request Accepted",
  "suppliersNameList": [
    "!@#$#%$",
    "#@$@%^#$",
    "222",
    "AirArabiaEgypt",
    "AirArbia",
    "AirArbiaUAE",
    "AirCairo",
    "Amadeus",
    "Badr",
    "DEMO",
    "FlyDubai",
    "FlyEgypt",
    "Galileo",
    "JazeeraAirways",
    "JazeeraAirwaysUAE",
    "LCC",
    "Reissue",
    "Sabre",
    "SalamAir",
    "ShuraTech",
    "sssssss",
    "Tarco",
    "TEST",
    "TravelFusion",
    "UIHUE"
  ]
}
```