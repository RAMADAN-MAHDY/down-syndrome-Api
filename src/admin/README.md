
## نقاط النهاية الرئيسية لل admin

### 1. إدارة المحتوى
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
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  },
  body: JSON.stringify({
    title: "عنوان المحتوى",
    type: "تعليم",
    description: "وصف المحتوى",
    sluge: "text",
    ageGroup: "60d0a3b5f8b8a12b3c8b4567",
    problemTag: "مشكلة1",
    articleText: "نص المقال الكامل هنا..."
  })
})
```

### 2. إدارة الأحداث
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
  headers: {
    'Authorization': 'Bearer your_token_here'
  }
})
```

### 3. إدارة المقالات
- **الرابط**: `/api/admin/article`
- **الطريقة**: POST
- **الوصف**: إضافة مقال جديد
- **المتطلبات**:
  - `title`: عنوان المقال
  - `type`: نوع المقال
  - `topic`: موضوع المقال
  - `age_group`: الفئة العمرية
  - `image`: صورة المقال (يتم رفعها عبر form-data)

### 4. إدارة الاتصالات
- **الرابط**: `/api/admin/contact-us-all`
- **الطريقة**: GET
- **الوصف**: جلب جميع طلبات الاتصال

- **الرابط**: `/api/admin/contact-us/:id`
- **الطريقة**: GET
- **الوصف**: جلب طلب اتصال محدد

## زر الترجمة

```html
<button onclick="toggleLanguage()">English Version</button>

<script>
function toggleLanguage() {
  const englishSection = document.getElementById('english-version');
  englishSection.style.display = englishSection.style.display === 'none' ? 'block' : 'none';
}
</script>
```

---

# API Endpoints Documentation

## Main Endpoints

### 1. Content Management
- **Endpoint**: `/api/admin/content`
- **Method**: POST
- **Description**: Add new content (text or video)
- **Requirements**:
  - `title`: Content title
  - `type`: Content type (education, health, sports)
  - `description`: Content description
  - `sluge`: Content type (vid or text)
  - `ageGroup`: Age group
  - `problemTag`: Problem tag
  - `articleText`: Article text (if sluge=text)
  - `url`: Video URL (if sluge=vid)

### 2. Events Management
- **Endpoint**: `/api/admin/AddEvents`
- **Method**: POST
- **Description**: Add new event
- **Requirements**:
  - `title`: Event title
  - `type`: Event type
  - `date`: Event date
  - `time`: Event time
  - `location`: Event location

### 3. Articles Management
- **Endpoint**: `/api/admin/article`
- **Method**: POST
- **Description**: Add new article
- **Requirements**:
  - `title`: Article title
  - `type`: Article type
  - `topic`: Article topic
  - `age_group`: Age group
  - `image`: Article image (uploaded via form-data)

### 4. Contact Management
- **Endpoint**: `/api/admin/contact-us-all`
- **Method**: GET
- **Description**: Get all contact requests

- **Endpoint**: `/api/admin/contact-us/:id`
- **Method**: GET
- **Description**: Get specific contact request

## Translation Button

```html
<button onclick="toggleLanguage()">English Version</button>

<script>
function toggleLanguage() {
  const englishSection = document.getElementById('english-version');
  englishSection.style.display = englishSection.style.display === 'none' ? 'block' : 'none';
}
</script>
```
        