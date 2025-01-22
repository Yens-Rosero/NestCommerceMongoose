# 📚 **NestJS MongoDB API** 🚀

This project is an application based on **NestJS**, using **MongoDB** with the **Mongoose** ORM. The modularized structure and implemented relationships follow best practices of single responsibility and clean architecture, ensuring scalability and efficient code maintenance.

---

## 📖 **Project Description**

This NestJS application is designed to offer:

- 📦 **Efficient modularization** for scalable architecture.
- 🔗 **MongoDB connection** using Mongoose as ORM.
- **One-to-one and one-to-many entity relationships**.
- Concrete examples of connecting and configuring services using **UseFactory**.
- Implementation of single responsibility and clean architecture best practices in NestJS.
- 🔐 **JWT Authentication & Authorization** with Passport strategies.
- 👥 **Role-Based Access Control (RBAC)** for secure endpoints.

---

## 🔍 **Main Features**

### **Mongoose Usage**  
- Connect your project to MongoDB quickly and efficiently.  
- Implement relationships:  
  - **One-to-one relationship** (e.g., User ↔ Profile).  
  - **One-to-many relationship** (e.g., Categories ↔ Products).  

### **Authentication & Authorization**
- **JWT Implementation** with Passport
  - JWT Strategy for token validation
  - Local Strategy for credentials validation
  - Custom Guards for route protection
- **Role-Based Access Control**
  - Role hierarchy (ADMIN → SUPERVISOR → SELLER → CUSTOMER)
  - Custom decorators for role verification
  - Guards for role-based access

### **Modularization**  
- The modularized structure allows adding and scaling functionalities without losing project organization.

### **Single Responsibility Principle (SRP)**  
- Each file and class follows the single responsibility principle, facilitating maintenance and future updates.

---

## 🛠 **Technologies**

- **Framework:** NestJS  
- **Database:** MongoDB  
- **ORM:** Mongoose  
- **Authentication:** 
  - Passport.js
  - @nestjs/passport
  - @nestjs/jwt
  - passport-jwt
  - passport-local
- **Environment Management:** Configuration with `@nestjs/config`  
- **Testing:** Jest (optional)  

---

## ✅ **Implemented Best Practices**

- **Single Responsibility (SRP)**: Each class and file has a specific responsibility.  
- **Modularization**: Project structure is organized to easily add functionalities and modules.  
- **Automated Testing**: Adding tests with Jest is recommended.  
- **Centralized Configuration**: Use of `@nestjs/config` to manage environment variables.
- **Security Best Practices**:
  - JWT token encryption
  - Password hashing with bcrypt
  - Role-based authorization
  - Protected routes with Guards

---


