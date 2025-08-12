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



  
# 1- قسم المحتوي 

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
# 2- قسم الاخبار والمقالات 
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

# 3- قسم تواصل معنا

# توثيق واجهة برمجة تطبيقات Contact Us

## 1. إنشاء طلب اتصال (Create Contact Request)

لإنشاء طلب اتصال جديد.

- **المسار (Endpoint):** `POST /api/contact-us`
- **الوصف:** يقوم بإنشاء سجل اتصال جديد في قاعدة البيانات.
- **نوع المحتوى (Content-Type):** `application/json`

### جسم الطلب (Request Body):

```json
{
  "title": "عنوان الرسالة",
  "phone": "رقم الهاتف",
  "date": "تاريخ الرسالة"
}
```

### مثال على الاستجابة الناجحة (Successful Response Example):

```json
{
  "_id": "65c8f7e3b2e7c8d9f0a1b2c3",
  "title": "عنوان الرسالة",
  "phone": "رقم الهاتف",
  "date": "تاريخ الرسالة",
  "createdAt": "2024-02-11T12:00:00.000Z",
  "updatedAt": "2024-02-11T12:00:00.000Z",
  "__v": 0
}
```

### أمثلة على الاستخدام:

#### باستخدام `fetch`:

```javascript
const createContact = async () => {
  const data = {
    title: "استفسار عام",
    phone: "01234567890",
    date: "2024-02-11"
  };

  try {
    const response = await fetch('/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'فشل إنشاء الاتصال');
    }

    const newContact = await response.json();
    console.log('تم إنشاء الاتصال بنجاح:', newContact);
  } catch (error) {
    console.error('خطأ في إنشاء الاتصال:', error.message);
  }
};

```

#### باستخدام `axios`:

```javascript
import axios from 'axios';

const createContactAxios = async () => {
  const data = {
    title: "استفسار عن خدمة",
    phone: "01123456789",
    date: "2024-02-12"
  };

  try {
    const response = await axios.post('/api/contact-us', data);
    console.log('تم إنشاء الاتصال بنجاح:', response.data);
  } catch (error) {
    console.error('خطأ في إنشاء الاتصال:', error.response ? error.response.data.error : error.message);
  }
};

```

## 2. جلب جميع طلبات الاتصال (Get All Contact Requests)

لجلب قائمة بجميع طلبات الاتصال الموجودة.

- **المسار (Endpoint):** `GET /api/contact-us-all`
- **الوصف:** يقوم بإرجاع جميع سجلات الاتصال.

### مثال على الاستجابة الناجحة (Successful Response Example):

```json
[
  {
    "_id": "65c8f7e3b2e7c8d9f0a1b2c3",
    "title": "استفسار عام",
    "phone": "01234567890",
    "date": "2024-02-11",
    "createdAt": "2024-02-11T12:00:00.000Z",
    "updatedAt": "2024-02-11T12:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "65c8f7e3b2e7c8d9f0a1b2c4",
    "title": "استفسار عن خدمة",
    "phone": "01123456789",
    "date": "2024-02-12",
    "createdAt": "2024-02-12T10:30:00.000Z",
    "updatedAt": "2024-02-12T10:30:00.000Z",
    "__v": 0
  }
]
```

### أمثلة على الاستخدام:

#### باستخدام `fetch`:

```javascript
const getAllContacts = async () => {
  try {
    const response = await fetch('/api/contact-us-all');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'فشل جلب الاتصالات');
    }

    const contacts = await response.json();
    console.log('جميع الاتصالات:', contacts);
  } catch (error) {
    console.error('خطأ في جلب جميع الاتصالات:', error.message);
  }
};

```

#### باستخدام `axios`:

```javascript
import axios from 'axios';

const getAllContactsAxios = async () => {
  try {
    const response = await axios.get('/api/contact-us-all');
    console.log('جميع الاتصالات:', response.data);
  } catch (error) {
    console.error('خطأ في جلب جميع الاتصالات:', error.response ? error.response.data.error : error.message);
  }
};

```

## 3. جلب طلب اتصال بواسطة المعرف (Get Contact Request by ID)

لجلب تفاصيل طلب اتصال محدد باستخدام المعرف الخاص به.

- **المسار (Endpoint):** `GET /api/contact-us/:id`
- **الوصف:** يقوم بإرجاع سجل اتصال واحد بناءً على المعرف المقدم.
- **معلمات المسار (Path Parameters):**
  - `id` (سلسلة نصية): المعرف الفريد لطلب الاتصال.

### مثال على الاستجابة الناجحة (Successful Response Example):

```json
{
  "_id": "65c8f7e3b2e7c8d9f0a1b2c3",
  "title": "استفسار عام",
  "phone": "01234567890",
  "date": "2024-02-11",
  "createdAt": "2024-02-11T12:00:00.000Z",
  "updatedAt": "2024-02-11T12:00:00.000Z",
  "__v": 0
}
```

### أمثلة على الاستخدام:

#### باستخدام `fetch`:

```javascript
const getContactById = async (id) => {
  try {
    const response = await fetch(`/api/contact-us/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'فشل جلب الاتصال');
    }

    const contact = await response.json();
    console.log('تفاصيل الاتصال:', contact);
  } catch (error) {
    console.error('خطأ في جلب الاتصال بواسطة المعرف:', error.message);
  }
};

```

#### باستخدام `axios`:

```javascript
import axios from 'axios';

const getContactByIdAxios = async (id) => {
  try {
    const response = await axios.get(`/api/contact-us/${id}`);
    console.log('تفاصيل الاتصال:', response.data);
  } catch (error) {
    console.error('خطأ في جلب الاتصال بواسطة المعرف:', error.response ? error.response.data.error : error.message);
  }
};

```
```

        


```
