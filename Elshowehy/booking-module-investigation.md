# ✈️ Booking Module Investigation – Front/Back Contract Review

Welcome aboard! This document captures the ongoing work and analysis related to the **Booking Module** of our system.  
The goal? To modernize, simplify, and document the backend/frontend contracts — with elegance and no nonsense (well, maybe a little).

---

### 🎯 Objective

Break down the legacy structure of booking-related pages and endpoints  
→ Compare them to modern, RESTful API's, Angular-friendly alternatives  
→ Recommend transformations that make the codebase cleaner, leaner, and future-proof.

---

### 👨‍💻 My Focus Area

As part of this larger task, my responsibility is the **Passenger Details**, which includes:

- **Manual invoice || ordinary booking scenarios**
- **Passenger data forms**
- **Payment methods**
- **Flight Summary**
- **Fare breakup**
- And these are specific for some airlines:
- **Meal** for airArabia
- **Baggage** for airArabia
- **Seat** for airArabia
- **Bundle** for flyNas, flyAdeal, and airIndia

Each flow is analyzed for:

- Data structure quality
- JSON contract sanity
- Frontend rendering patterns (JSP vs Angular)
- Upgrade potential

---

Let’s dive into page or endpoints step by step, comparing how it works now vs how it _should_.

## 🏢 Endpoint: `odeysysadmin/flight/passengerDetail`

### 📄 Description

This is one of the legacy endpoints in the booking system. It returns a `ModelAndView/Document` object used to render a **branch selection page** in a JSP view.  
As part of the booking workflow, this page allows the user to choose a branch from a dropdown.

![Branch Selection page](./assets/images/screenshots/branchSelection.png)

#### 🔄 My Role in This

As part of the Flight Widget/Booking Module investigation, this page is analyzed for potential improvement.  
It currently works in a traditional Spring MVC + JSP flow, but can be enhanced to better support RESTful, frontend-driven architecture.

---

### 📥 Legacy Behavior

- **Type:** Spring `ModelAndView/Document`
- **Injected Property:** `branchList`
- **Used In:** JSP page to render a branch `<select>` dropdown
- **Format:** Full list of group/branch models with many unused fields
<details>
<summary> <h4 style="display: inline-block"> 🧾 Sample <code>branchList</code> Value:</h4> </summary>

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

### 🚀 Implementation

- Just render data in dropdown

### ✅ Recommended Approach: REST API which already implemented in system

- POST Master2/Branch/search

#### 🧾 Sample `response` Value:

```json
{
  "payload": [
    {
      "branchId": 948,
      "branchCode": "BRN2",
      "branchName": "Test",
      "countryId": 67,
      "countryName": "Egypt",
      "cityName": "Dahab",
      "approvalStatus": 1
    }
  ],
  "total": 53
}
```
