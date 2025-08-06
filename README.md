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
| sluge      | ❌        | نوع المحتوى (text - vid ) |

### 🧾 مثال للاستخدام باستخدام `fetch`

```ts
const query = new URLSearchParams({
  ageGroupId: '64fd74cc2d87c8f9540a0c1b',
  problemTag: 'فرط حركة',
  type: 'تعليم',
  sluge : 'text'
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
    type: 'صحة',   // او نشاطات او تعليم
    sluge:"text"    // او  vid      
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
    "sluge":"text",
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
---
#### 1. **جلب المقالات او الاخبار**

**المسار:** `/api/getArticle`

**الطريقة:** `GET`

**الوصف:** يقوم بجلب المقالات مع إمكانية التصفية باستخدام `ageGroupId` و `type`.
**المعلمات:**
- `ageGroupId` (اختياري): معرف الفئة العمرية.
- `type` (اختياري): نوع المحتوى (تعليم - صحة - رياضه).
**مثال باستخدام Fetch:**

```javascript
fetch(`https://down-syndrome-api.vercel.app/api/getArticle?ageGroupId=${ageGroupId}&type=${type}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**مثال باستخدام Axios:**

```javascript
axios.get('https://down-syndrome-api.vercel.app/api/getArticle', {
  params: {
    ageGroupId: ageGroupId,
    type: type
  }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));
```

 ###**الإجابة:**

```json
[
    {
        "_id": "689398bc3d202a3cb42dd8d6",
        "title": "عنوان الخبر",
        "type": "صحة",
        "topic": "الموضوع ",
        "image": "https://i.ibb.co/ccQzLZHL/fd5856d9eecb.jpg",
        "imageDeleteUrl": "https://ibb.co/3yctzjqz/cf41e7cf61e5035b2527184e4dd0eb67",
        "age_group": {
            "_id": "6890a18df82bf4c994efdd43",
            "name": "السن 4–6 سنوات",
            "createdAt": "2025-08-04T12:03:25.754Z",
            "updatedAt": "2025-08-04T12:03:25.754Z",
            "__v": 0
        },
        "createdAt": "2025-08-06T18:02:36.515Z",
        "updatedAt": "2025-08-06T18:02:36.515Z",
        "__v": 0
    }
]
```


---
#### 2. **البحث عن المقالات**
**المسار:** `/api/search`

**الطريقة:** `POST`

**الوصف:** البحث عن المقالات باستخدام كلمة مفتاحية مع إمكانية التصفية باستخدام `ageGroupId` و `type`.

**المعلمات:**
- `keyword` (اجباري): الكلمة المفتاحية للبحث.
- `ageGroupId` (اجباري): معرف الفئة العمرية.
- `type` (اجباري): نوع المحتوى (تعليم - صحة - رياضه).



**مثال باستخدام Fetch:**
```javascript
fetch('https://down-syndrome-api.vercel.app/api/search?keyword=example', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ageGroupId: '6890a18df82bf4c994efdd43',
    type: 'صحة'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
````

**مثال باستخدام Axios:**

```javascript
axios.post('https://down-syndrome-api.vercel.app/api/search?keyword=example', {
  ageGroupId: '123',
  type: 'تعليم'
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));

```
###**الإجابة:**

```json
[
    {
        "_id": "689398bc3d202a3cb42dd8d6",
        "title": "عنوان الخبر",
        "type": "صحة",
        "topic": "الموضوع ",
        "image": "https://i.ibb.co/ccQzLZHL/fd5856d9eecb.jpg",
        "imageDeleteUrl": "https://ibb.co/3yctzjqz/cf41e7cf61e5035b2527184e4dd0eb67",
        "age_group": {
            "_id": "6890a18df82bf4c994efdd43",
            "name": "السن 4–6 سنوات",
            "createdAt": "2025-08-04T12:03:25.754Z",
            "updatedAt": "2025-08-04T12:03:25.754Z",
            "__v": 0
        },
        "createdAt": "2025-08-06T18:02:36.515Z",
        "updatedAt": "2025-08-06T18:02:36.515Z",
        "__v": 0
    }
]
```

---
        



```
