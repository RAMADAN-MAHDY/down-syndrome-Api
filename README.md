# Down Syndrome API

## نظرة عامة
مشروع Express بنمط MVC باستخدام TypeScript، يوفر نقاط نهاية لخدمة تطبيق توجيه وإرشاد وتقويم فعاليات ومحتوى رقمي.

---

## نقاط نهاية واجهة برمجة التطبيقات (API Endpoints)

### 1. دليل التوجيه والإرشاد حسب الفئة العمرية
- **جلب الفئات العمرية المتاحة:**
  - `GET /api/age-groups`
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
