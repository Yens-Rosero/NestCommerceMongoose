📚 **NestJS MongoDB API** 🚀

Este proyecto es una aplicación basada en **NestJS**, utilizando **MongoDB** con el ORM **Mongoose**. La estructura modularizada y las relaciones implementadas siguen las mejores prácticas de responsabilidad única y arquitectura limpia, garantizando la escalabilidad y el mantenimiento eficiente del código.

---

📖 **Descripción del Proyecto**

Esta aplicación NestJS está diseñada para ofrecer:

- 📦 **Modularización eficiente** para una arquitectura escalable.
- 🔗 **Conexión a MongoDB** utilizando Mongoose como ORM.
- **Relaciones uno a uno y uno a muchos entre entidades**.
- Ejemplos concretos de cómo conectarse y configurar servicios mediante **UseFactory**.
- Implementación de las mejores prácticas de responsabilidad única y arquitectura en NestJS.

---

🔍 **Características Principales**

- **Uso de Mongoose**  
  - Conecta tu proyecto a MongoDB de forma rápida y eficiente.  
  - Implementa relaciones:  
    - **Relación uno a uno** (ej. Usuario ↔ Perfil).  
    - **Relación uno a muchos** (ej. Categorías ↔ Productos).  

- **Modularización**  
  - La estructura modularizada permite agregar y escalar funcionalidades sin perder la organización del proyecto.

- **Responsabilidad Única (SRP - Single Responsibility Principle)**  
  - Cada archivo y clase sigue el principio de responsabilidad única, facilitando el mantenimiento y las actualizaciones futuras.

---

🛠 **Tecnologías**

- **Framework:** NestJS  
- **Base de Datos:** MongoDB  
- **ORM:** Mongoose  
- **Environment Management:** Configuración con `@nestjs/config`  
- **Testing:** Jest (opcional)  

---

✅ **Mejores Prácticas Implementadas**

- **Responsabilidad Única (SRP)**: Cada clase y archivo tiene una responsabilidad específica.  
- **Modularización**: La estructura del proyecto está organizada para agregar funcionalidades y módulos fácilmente.  
- **Pruebas Automatizadas**: Se recomienda agregar tests con Jest.  
- **Configuración Centralizada**: Uso de `@nestjs/config` para gestionar variables de entorno.

