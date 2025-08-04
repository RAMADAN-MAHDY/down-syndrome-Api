# Down Syndrome API

## نظرة عامة
مشروع Express بنمط MVC باستخدام TypeScript، يوفر نقاط نهاية لخدمة تطبيق توجيه وإرشاد وتقويم فعاليات ومحتوى رقمي.
---
## لينك ال api الرئيسي https://down-syndrome-api.vercel.app 

## نقاط نهاية واجهة برمجة التطبيقات (API Endpoints)

### 1. دليل التوجيه والإرشاد حسب الفئة العمرية
- **جلب الفئات العمرية المتاحة:**
  - `GET /api/getAgeGroups`
-مثال :
GET https://down-syndrome-api.vercel.app/api/getAgeGroups
الاستجابة:

json
Copy
Edit
[
  {
    "_id": "64fd74cc2d87c8f9540a0c1b",
    "name": "من 5 لـ 10 سنين",
    "createdAt": "2025-08-04T10:00:00.000Z",
    "updatedAt": "2025-08-04T10:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "64fd74cc2d87c8f9540a0c2c",
    "name": "من 11 لـ 15 سنه",
    "createdAt": "2025-08-04T10:05:00.000Z",
    "updatedAt": "2025-08-04T10:05:00.000Z",
    "__v": 0
  }
]


  

- **جلب المحتوى الإرشادي لفئة عمرية محددة:**
  - `GET /api/age-groups/{ageGroupId}/content`

### 2. تقويم الفعاليات
- **جلب الفعاليات القادمة:**
  - `GET /api/events`
- **البحث عن الفعاليات:**
  - `GET /api/events/search?keyword={keyword}`
- **جلب الفعاليات القريبة حسب الموقع الجغرافي:**
  - `GET /api/events/nearby?latitude={lat}&longitude={lon}`

### 3. قسم المقالات والأخبار
- **جلب المقالات والأخبار:**
  - `GET /api/articles`
- **البحث عن المقالات:**
  - `GET /api/articles/search?keyword={keyword}`
- **جلب خيارات التصفية (المواضيع والفئات العمرية):**
  - `GET /api/articles/topics`

### 4. نظام إدارة المحتوى (CMS) - لوحة تحكم الإدارة
- **مصادقة المسؤولين:**
  - `POST /api/admin/login`
- **إدارة المقالات والفيديوهات:**
  - إضافة محتوى جديد: `POST /api/admin/content`
  - تحديث محتوى: `PUT /api/admin/content/{id}`
  - حذف محتوى: `DELETE /api/admin/content/{id}`
  - جلب جميع المحتوى: `GET /api/admin/content`
- **إدارة الفعاليات:**
  - إضافة فعالية جديدة: `POST /api/admin/events`
  - تحديث فعالية: `PUT /api/admin/events/{id}`
  - حذف فعالية: `DELETE /api/admin/events/{id}`
  - جلب جميع الفعاليات: `GET /api/admin/events`

---

## ملاحظات
- جميع النقاط ستُبنى بشكل مبدئي (Mock) ويمكن تعديلها لاحقاً حسب متطلبات الفرونت.
- جاهز لأي استفسار أو إضافة نقاط جديدة.
