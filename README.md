# Down Syndrome API

## نظرة عامة
مشروع Express بنمط MVC باستخدام TypeScript، يوفر نقاط نهاية لخدمة تطبيق توجيه وإرشاد وتقويم فعاليات ومحتوى رقمي.
---
## لينك ال api الرئيسي https://down-syndrome-api.vercel.app 

## نقاط نهاية واجهة برمجة التطبيقات (API Endpoints)

### 1. دليل التوجيه والإرشاد حسب الفئة العمرية

- **جلب الفئات العمرية المتاحة:**
  - `GET /api/getAgeGroups`

#### 📥 مثال على الاستجابة:

```json
[
  {
    "_id": "64fd74cc2d87c8f9540a0c1b",
    "name": "من 5 لـ 10 سنين",
    "createdAt": "2025-08-04T10:00:00.000Z",
    "updatedAt": "2025-08-04T10:00:00.000Z",
    "__v": 0
  },
  ...
]
```



  

- **جلب المحتوى الإرشادي لفئة عمرية محددة:**

## استخدام فلترة المحتوى من الواجهة الأمامية

### 📌 Endpoint
```http
GET https://down-syndrome-api.vercel.app/api/content/filter
````

### 📥 Parameters (Query)

| Parameter  | Required | Description                        |
| ---------- | -------- | ---------------------------------- |
| ageGroupId | ❌        | ID الخاص بالفئة العمرية            |
| problemTag | ❌        | المشكلة التي يعاني منها الطفل      |
| type       | ❌        | نوع المحتوى (تعليم - صحة - نشاطات) |

### 🧾 مثال للاستخدام باستخدام `fetch`

```ts
const query = new URLSearchParams({
  ageGroupId: '64fd74cc2d87c8f9540a0c1b',
  problemTag: 'فرط حركة',
  type: 'تعليم',
}).toString();

fetch(`https://down-syndrome-api.vercel.app/api/content/filter?${query}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### 🧾 مثال باستخدام `axios`

```ts
import axios from 'axios';

axios.get('https://down-syndrome-api.vercel.app/api/content/filter', {
  params: {
    ageGroupId: '64fd74cc2d87c8f9540a0c1b',
    problemTag: 'تأخر لغوي',
    type: 'صحة',
  },
})
.then(res => console.log(res.data))
.catch(err => console.error(err));
```

### ✅ شكل الـ Response

```json
[
  {
    "_id": "662b...",
    "title": "تمرينات لتحسين التركيز",
    "type": "تعليم",
    "description": "تمرينات للأطفال ذوي فرط الحركة",
    "articleText": "تفاصيل المقال...",
    "ageGroup": {
      "_id": "64fd74cc2d87c8f9540a0c1b",
      "name": "من 5 لـ 10 سنين"
    },
    "problemTag": "فرط حركة",
    "createdAt": "2025-08-04T10:00:00.000Z",
    "updatedAt": "2025-08-04T10:00:00.000Z",
    "__v": 0
  },
  ...
]
```

```
