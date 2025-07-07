# 📊 Prescripto - Doctor Appointment Booking Platform

**Prescripto** is a complete full-stack doctor appointment booking system built using the MERN stack. It supports three roles: **Patient (User)**, **Doctor**, and **Admin**, each with their own login panel and functionalities. It includes slot-based booking, real-time availability, secure authentication, and online payments.

---

## 🚀 Live Demo

🔗 [Live Website](https://your-live-link.com)
📂 [Frontend GitHub](https://github.com/yourusername/prescripto-frontend)
📂 [Backend GitHub](https://github.com/yourusername/prescripto-backend)

---

## 🧹 Tech Stack

| Tech             | Purpose                                 |
| ---------------- | --------------------------------------- |
| **MongoDB**      | Database                                |
| **Express**      | Backend server framework                |
| **React.js**     | Frontend UI                             |
| **Node.js**      | Server runtime                          |
| **Tailwind CSS** | UI styling                              |
| **JWT**          | Authentication (Admin, Doctor, Patient) |
| **Stripe**       | Payment Gateway (Test mode)             |
| **Cloudinary**   | Image hosting                           |
| **Axios**        | API requests                            |

---

## 🧐 Features Overview

### 👤 User (Patient)

* Signup/Login
* View list of doctors (with availability)
* Book appointment by selecting a time slot
* Cancel appointment
* Pay online (Stripe)
* Edit profile: name, email, gender, DOB, photo

### 🧑‍⚕️ Doctor Panel

* Login as doctor
* View upcoming appointments
* Mark appointments as completed
* Manage profile and details
* See booked patients

### 🛡️ Admin Panel

* Admin login (secure route)
* View list of all doctors
* Add new doctors
* Remove or update existing doctors

---

## 🔐 Role-Based Login Details

> 🛑 These are **test/demo credentials** (You can create signup logic or add real ones via DB)

### 🧟 Patient (User)

* Register from the frontend `/signup`
* Then login from `/signin`

### 👨‍⚕️ Doctor Login

* Use the following test credentials:

```bash
Email: richard@gmail.com
Password: 12345678
```

### 🛡️ Admin Login

* Visit: `/admin/login`
* Use:

```bash
Email: admin@gmail.com
Password: admin123
```

> You can change or create new doctors/admins via MongoDB or through the Admin Panel

---

## 📁 Folder Structure

```
Prescripto/
├── front-end/       # React.js (Vite + Tailwind)
│   ├── pages/
│   ├── components/
│   └── context/     # App-wide state
├── back-end/        # Node.js + Express
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middleware/
```

---

## ⚙️ Installation & Setup

### 📦 Backend

```bash
cd back-end
npm install
npm start
```

Create a `.env` file in `back-end/`:

```
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

### 💻 Frontend

```bash
cd front-end
npm install
npm run dev
```

Create a `.env` file in `front-end/`:

```
VITE_BACKEND_URL=http://localhost:your_backend_port
```

---

## 📸 Screenshots

| Patient Booking                       | Doctor Panel                        | Admin Panel                       |
| ------------------------------------- | ----------------------------------- | --------------------------------- |
| ![patient](./screenshots/patient.png) | ![doctor](./screenshots/doctor.png) | ![admin](./screenshots/admin.png) |

---

## 💡 Highlights

* Built with clean and responsive UI using **Tailwind CSS**
* Role-based login using **JWT & custom middleware**
* Doctors can't be double-booked (booked slots are hidden)
* **Stripe payments** in test mode
* Smart error handling (e.g., invalid appointment ID, slot logic, etc.)

---

## ✨ What I Learned

* Handling role-based dashboards (user, doctor, admin)
* JWT authentication & route protection
* Stripe API integration
* Cloudinary image handling
* Creating reusable components in React
* Backend validations and MongoDB relationships

---

## 📢 Contact

**Nayan Verma**
📧 Email: (nayanverma7024@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/nayan-verma-b671b8252/)

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub and sharing it!
