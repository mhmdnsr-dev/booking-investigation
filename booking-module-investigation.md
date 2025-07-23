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