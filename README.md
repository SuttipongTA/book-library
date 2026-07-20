# Book Library API

## Tech Stack
- Backend: Node.js/Express + SQLite
- Frontend: React (Vite)

## Setup
### Backend
1. cd back
2. npm install
3. สร้างไฟล์ .env ตามตัวอย่างด้านล่าง
4. npm start

## Backend .env
| ตัวแปร           | คำอธิบาย                    | ตัวอย่าง    |
|---|---|---|
| PORT            | พอร์ตที่ server รัน            | 4000     |
| JWT_SECRET      | secret key ตรวจสอบ JWT     | abcd     |
| JWT_EXPIRES_IN  | อายุของ token               | 7d       |
| ADMIN_USERNAME  | username สำหรับทดสอบ login | admin      |
| ADMIN_PASSWORD  | secret key สำหรับเซ็น token  | admin1234 |

**หมายเหตุเรื่องฐานข้อมูล:** 
โปรเจกต์นี้ใช้ SQLite เป็นฐานข้อมูลที่ไม่ใช่ server แยก จึงไม่ต้องตั้งค่า connection string ใดๆ ฐานข้อมูลจะถูกสร้างอัตโนมัติที่ `back/data/library.db` ตอนรัน server ครั้งแรก 
(ถ้าโฟลเดอร์ `back/data/` ไม่มีอยู่ ให้สร้างเปล่าๆ ไว้ก่อนด้วยคำสั่ง `mkdir data`)

ถ้ารัน server แล้วจะได้ข้อความว่า :
Server run in port 4000
Backend จะรันอยู่ที่ `http://localhost:4000`

### Frontend
1. cd front
2. npm install
3. npm run dev

## Frontend .env
| ตัวแปร           | คำอธิบาย             | ตัวอย่าง                    |
|---|---|---|
| VITE_API_URL    | URL ของ backend API | http://localhost:4000     |

## รันทั้งระบบพร้อมกัน

ต้องเปิด 2 terminal พร้อมกัน:

```bash
# Terminal 1 — Backend
cd back
npm start

# Terminal 2 — Frontend
cd front
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:5173`


## Test Login
- username: admin *ต้องตรงกับ ADMIN_USERNAME ใน back/.env
- password: admin1234 *ต้องตรงกับ ADMIN_PASSWORD ใน back/.env

## API Endpoints

| Method | Endpoint         | Token | คำอธิบาย |
|---|---|---|---|
| POST   | `/api/login`     | ไม่ต้อง | เข้าสู่ระบบ รับ JWT กลับมา |
| GET    | `/api/books`     | ไม่ต้อง | ดึงรายการหนังสือทั้งหมด (รองรับ `?search=คำค้นหา`) |
| POST   | `/api/books`     | ต้องใช้ | เพิ่มหนังสือใหม่ |
| DELETE | `/api/books/:id` | ต้องใช้ | ลบหนังสือตาม ID ของหนังสือ |

Endpoint ที่ต้องใช้ token ให้แนบ header:
Authorization: Bearer <token>

## API Collection
ดูไฟล์ .bru ในโฟลเดอร์ api-collection/