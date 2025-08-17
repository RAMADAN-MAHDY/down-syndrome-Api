
## نقاط النهاية الرئيسية لل admin

## لينك ال api الرئيسي https://down-syndrome-api.vercel.app 


### 1. مصادقة المسؤول (Admin Authentication)

#### أ. تسجيل دخول المسؤول
- **الرابط**: `/api/admin/logInAdmin`
- **الطريقة**: POST
- **الوصف**: تسجيل دخول المسؤول والحصول على رموز الوصول والتحديث (Access Token و Refresh Token) عبر الكوكيز.
- **المتطلبات**:
  - `email`: البريد الإلكتروني للمسؤول.
  - `password`: كلمة مرور المسؤول.

**مثال باستخدام fetch:**
```javascript
fetch('/api/admin/logInAdmin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: "admin@example.com",
    password: "your_admin_password"
  }),
  credentials: "include"  // ⚡️ مهم جداً لإرسال واستقبال الكوكيز
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**مثال باستخدام axios:**
```javascript
axios.post('/api/admin/logInAdmin', {
  email: "admin@example.com",
  password: "your_admin_password"
}, {
  withCredentials: true // ⚡️ مهم جداً لإرسال واستقبال الكوكيز
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));
```

#### ب. تحديث الرمز المميز (Refresh Token)
- **الرابط**: `/api/admin/refreshToken`
- **الطريقة**: POST
- **الوصف**: استخدام الرمز المميز للتحديث (Refresh Token) للحصول على رمز وصول جديد (Access Token) ورمز تحديث جديد.
- **المتطلبات**: لا توجد متطلبات في جسم الطلب، يتم إرسال `refreshToken` تلقائياً عبر الكوكيز.

**مثال باستخدام fetch:**
```javascript
fetch('/api/admin/refreshToken', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: "include"  // ⚡️ مهم جداً لإرسال واستقبال الكوكيز
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**مثال باستخدام axios:**
```javascript
axios.post('/api/admin/refreshToken', {}, {
  withCredentials: true // ⚡️ مهم جداً لإرسال واستقبال الكوكيز
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));
```


---

# وصف نقطة النهاية (Dashboard)

## نقطة النهاية: `/api/admin/dashboard`
- **الطريقة**: GET
- **الوصف**: هذه النقطة تسمح للمسؤول بالوصول إلى لوحة التحكم بعد تسجيل الدخول بنجاح. تحتاج إلى مصادقة باستخدام `AccessToken` في الكوكيز.
- **المتطلبات**:
  - `AccessToken` صالح في الكوكيز
  - يجب أن يكون المستخدم مسؤولاً

**مثال باستخدام fetch:**
```javascript
fetch('/api/admin/dashboard', {
  method: 'GET',
  credentials: 'include', // لإرسال الكوكيز
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

**مثال باستخدام axios:**
```javascript
axios.get('/api/admin/dashboard', {
  withCredentials: true, // لإرسال الكوكيز
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));
```

## الاستجابة المتوقعة
```json
{
  "message": "Welcome Admin"
}
```

## ملاحظات مهمة:
1. يجب أن يكون `AccessToken` صالحاً وغير منتهي الصلاحية.
2. إذا انتهت صلاحية `AccessToken`، يمكن استخدام `/api/admin/refreshToken` للحصول على واحد جديد.
3. يجب تفعيل خيار `credentials` أو `withCredentials` لإرسال الكوكيز مع الطلب.

---
---


### 2. إدارة المحتوى
- **الرابط**: `/api/admin/content`
- **الطريقة**: POST
- **الوصف**: إضافة محتوى جديد (نص أو فيديو)
- **المتطلبات**:
  - `title`: عنوان المحتوى
  - `type`: نوع المحتوى (تعليم، صحة، رياضه)
  - `description`: وصف المحتوى
  - `sluge`: نوع المحتوى (vid أو text)
  - `ageGroup`: الفئة العمرية
  - `problemTag`: وسم المشكلة
  - `articleText`: نص المقال (إذا كان sluge=text)
  - `url`: رابط الفيديو (إذا كان sluge=vid)

**مثال باستخدام fetch:**
```javascript
fetch('/api/admin/content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "عنوان المحتوى",
    type: "تعليم",
    description: "وصف المحتوى",
    sluge: "text",
    ageGroup: "60d0a3b5f8b8a12b3c8b4567",
    problemTag: "مشكلة1",
    articleText: "نص المقال الكامل هنا..."
  }),
  credentials: "include"  // ⚡️ مهم جداً لإرسال واستقبال الكوكيز
})
```

### 3. إدارة الأحداث
- **الرابط**: `/api/admin/AddEvents`
- **الطريقة**: POST
- **الوصف**: إضافة حدث جديد
- **المتطلبات**:
  - `title`: عنوان الحدث
  - `type`: نوع الحدث
  - `date`: تاريخ الحدث
  - `time`: وقت الحدث
  - `location`: موقع الحدث

**مثال باستخدام axios:**
```javascript
axios.post('/api/admin/AddEvents', {
  title: "عنوان الحدث",
  type: "رياضه",
  date: "2023-12-25",
  time: "15:00",
  location: {
    type: "Point",
    coordinates: [31.2357, 30.0444]
  }
}, {
withCredentials: true  // ⚡️ مهم جداً لإرسال واستقبال الكوكيز
})
```
### 4. إدارة المقالات

## 1️⃣ إضافة مقال جديد (Add Article)

- **الطريقة:** `POST`
- **الرابط:** `/api/admin/article`
- **الوصف:** إنشاء مقال جديد في النظام.
- **نوع البيانات:** `multipart/form-data` (لرفع الصورة)
- **مصادقة:** يتطلب Admin Token في الكوكيز

### ⚙️ البيانات المطلوبة:

| الحقل | النوع | ملاحظات |
|-------|------|----------|
| title | string | مطلوب |
| type | string | مطلوب، قيم ممكنة: "تعليم", "صحة", "رياضه" |
| topic | string | مطلوب |
| age_group | ObjectId | مطلوب |
| image | file | مطلوب |

---

### 🔹 مثال باستخدام fetch

```javascript
const formData = new FormData();
formData.append("title", "مقال جديد");
formData.append("type", "تعليم");
formData.append("topic", "التعلم عن بعد");
formData.append("age_group", "64a1f234abcd56789ef01234"); // معرف الفئة العمرية
formData.append("image", fileInput.files[0]); // صورة المقال

fetch("/api/admin/article", {
    method: "POST",
    body: formData,
    credentials: "include" // إرسال الكوكيز مع الطلب
})
.then(res => res.json())
.then(data => console.log("تم إضافة المقال:", data))
.catch(err => console.error(err));
````

### 🔹 مثال باستخدام axios

```javascript
import axios from "axios";

const formData = new FormData();
formData.append("title", "مقال جديد");
formData.append("type", "تعليم");
formData.append("topic", "التعلم عن بعد");
formData.append("age_group", "64a1f234abcd56789ef01234"); // معرف الفئة العمرية
formData.append("image", fileInput.files[0]); // صورة المقال

axios.post("/api/admin/article", formData, {
    withCredentials: true // إرسال الكوكيز
})
.then(res => console.log("تم إضافة المقال:", res.data))
.catch(err => console.error(err));
```

---

### ⚡️ ملاحظات للـ Frontend

1. جميع الحقول **مطلوبة** عند الإضافة، وإلا سيرفض السيرفر الطلب ويرجع `400 Bad Request`.
2. الصورة يجب أن تُرسل عبر **form-data**، لا تستخدم JSON عند رفع ملف.
3. بعد الإضافة، سيرجع السيرفر JSON يحتوي على بيانات المقال الجديد.
4. المصادقة تتم عبر الكوكيز، لذا يجب إرسالها مع كل طلب.

---



#  تعديل وحذف المقالات (Admin)

- **توكن المصادقة:** يتم إرسال الـ JWT في **Cookie** تلقائيًا.
---

## 2️⃣ تعديل مقال (Edit Article)

- **الطريقة:** `PATCH`
- **الرابط:** `/api/admin/EditArticle/:id`
- **الوصف:** تعديل بيانات المقال (مثل: العنوان، الموضوع، النوع، الصورة).
- **نوع البيانات:** `multipart/form-data` (لأن الصورة يمكن رفعها).

### ⚙️ البيانات الممكن تعديلها:

| الحقل | النوع | ملاحظات |
|-------|------|----------|
| title | string | اختياري |
| topic | string | اختياري |
| type | string | اختياري، قيم ممكنة: "تعليم", "صحة", "رياضه" |
| age_group | ObjectId | اختياري |
| image | file | اختياري، إذا تم رفع صورة جديدة، سيتم استبدال القديمة |

### 🔹 مثال باستخدام fetch

```javascript
const formData = new FormData();
formData.append("title", "عنوان جديد");
formData.append("topic", "موضوع جديد");
formData.append("image", fileInput.files[0]); // إذا كان هناك صورة

const articleId = "642e12345abcde6789f01234";

fetch(`/api/admin/EditArticle/${articleId}`, {
    method: "PATCH",
    body: formData,
    credentials: "include" // لإرسال الكوكيز مع الطلب
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
````

### 🔹 مثال باستخدام axios

```javascript
import axios from "axios";

const formData = new FormData();
formData.append("title", "عنوان جديد");
formData.append("topic", "موضوع جديد");
formData.append("image", fileInput.files[0]); // إذا كان هناك صورة

const articleId = "642e12345abcde6789f01234";

axios.patch(`/api/admin/EditArticle/${articleId}`, formData, {
    withCredentials: true // لإرسال الكوكيز
})
.then(res => console.log(res.data))
.catch(err => console.error(err));
```

---

## 3️⃣ حذف مقال (Delete Article)

* **الطريقة:** `DELETE`
* **الرابط:** `/api/admin/DeleteArticle/:id`
* **الوصف:** حذف المقال نهائيًا.
* **البيانات المطلوبة:** لا يوجد، فقط الـ `id` في الرابط.

### 🔹 مثال باستخدام fetch

```javascript
const articleId = "642e12345abcde6789f01234";

fetch(`/api/admin/DeleteArticle/${articleId}`, {
    method: "DELETE",
    credentials: "include"
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

### 🔹 مثال باستخدام axios

```javascript
import axios from "axios";

const articleId = "642e12345abcde6789f01234";

axios.delete(`/api/admin/DeleteArticle/${articleId}`, {
    withCredentials: true
})
.then(res => console.log(res.data))
.catch(err => console.error(err));
```

---

## ⚡️ ملاحظات مهمة للفرونت

1. **رفع الصور** يتم عبر `multipart/form-data`، لا تستخدم `JSON` عند رفع صورة.
2. بعد تعديل أو حذف المقال، يرسل السيرفر رسالة JSON تؤكد نجاح العملية.
3. أي حقل يتم تركه غير موجود أو `null` لن يتم تغييره في المقال.

---






### 5. إدارة الاتصالات
- **الرابط**: `/api/admin/contact-us-all`
- **الطريقة**: GET
- **الوصف**: جلب جميع طلبات الاتصال

- **الرابط**: `/api/admin/contact-us/:id`
- **الطريقة**: GET
- **الوصف**: جلب طلب اتصال محدد

---
        
