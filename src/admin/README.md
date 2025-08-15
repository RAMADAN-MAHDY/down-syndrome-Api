
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
- **الرابط**: `/api/admin/article`
- **الطريقة**: POST
- **الوصف**: إضافة مقال جديد
- **المتطلبات**:
  - `title`: عنوان المقال
  - `type`: نوع المقال
  - `topic`: موضوع المقال
  - `age_group`: الفئة العمرية
  - `image`: صورة المقال (يتم رفعها عبر form-data)

### 5. إدارة الاتصالات
- **الرابط**: `/api/admin/contact-us-all`
- **الطريقة**: GET
- **الوصف**: جلب جميع طلبات الاتصال

- **الرابط**: `/api/admin/contact-us/:id`
- **الطريقة**: GET
- **الوصف**: جلب طلب اتصال محدد

---
        