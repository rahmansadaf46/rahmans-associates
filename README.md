# Rahman’s Associate ⚖️

### Open Source AI Legal Prompt Platform for Bangladesh

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen)
![Built With](https://img.shields.io/badge/Built%20With-Next.js-black)
![AI Powered](https://img.shields.io/badge/AI-OpenAI-orange)
![Contributions](https://img.shields.io/badge/contributions-welcome-brightgreen)
![Status](https://img.shields.io/badge/status-active-development-purple)

**Rahman’s Associate** is an **open-source legal AI platform** designed to help advocates, law students, and legal researchers generate **structured prompts for AI-assisted legal drafting, research, and case preparation**.

The platform is designed specifically with **Bangladesh's legal ecosystem in mind**, supporting **both English and Bangla interfaces** to improve accessibility for legal professionals.

Our mission is to build a **foundation for open-source legal technology in Bangladesh and South Asia.**

---

# 🌍 Why This Project Matters

Legal technology adoption in Bangladesh is still limited. Many legal professionals want to use AI tools but struggle to write structured prompts that produce reliable outputs.

Rahman’s Associate addresses this gap by providing:

* Structured AI prompt generation for legal workflows
* Bilingual support (English + Bangla)
* Open-source architecture for legal-tech developers
* A platform for experimentation and collaboration

This project aims to empower the **next generation of legal-tech innovation in Bangladesh.**

---

# ✨ Key Features

## 🤖 AI Legal Prompt Generator

Generate structured prompts for legal drafting tasks such as:

* Bail applications
* Legal notices
* Petition drafting
* Written statements
* Contract drafting
* Legal argument preparation
* Case research queries

### Example

**User Input**

```
I want to draft a bail application
```

**Generated Prompt**

```
Act as a senior advocate practicing in Bangladesh.

Draft a professional bail application under the applicable provisions of Bangladeshi criminal law. Include case background, legal grounds for bail, relevant statutory references, and a formal prayer clause.
```

---

## 🌐 Bilingual Language Support

The platform supports:

* English
* বাংলা (Bangla)

Designed for the **Bangladeshi legal community**.

---

## 🎨 Premium Legal-Tech Interface

The UI includes:

* Modern dark theme
* Premium legal-tech branding
* Responsive design
* Smooth motion effects

---

## 📚 Prompt Template Library

Ready-to-use prompt templates categorized by legal domain:

* Criminal Law
* Civil Law
* Family Law
* Property Law
* Corporate Law
* Contract Drafting
* Legal Notices

---

# 🧠 AI Integration

Rahman’s Associate integrates with the **OpenAI API** to transform simple legal requests into **structured professional prompts** optimized for legal drafting.

Workflow:

User Request → Prompt Generator → AI Processing → Structured Legal Prompt

---

# 🏗️ System Architecture

```
User Interface (Next.js + Tailwind)
            │
            ▼
Prompt Generation Engine
            │
            ▼
OpenAI API Integration
            │
            ▼
Structured Legal Prompt Output
            │
            ▼
Database Storage (PostgreSQL + Prisma)
```

---

# 🏗️ Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Next.js API Routes

### Database

* PostgreSQL
* Prisma ORM

### AI Integration

* OpenAI API

### Internationalization

* next-intl / i18n

---

# 📂 Project Structure

```
rahmans-associates
│
├── app
│   ├── dashboard
│   ├── generator
│   ├── templates
│
├── components
│   ├── ui
│   ├── hero
│   ├── navbar
│   ├── shimmer
│
├── lib
│   ├── openai
│   ├── prisma
│
├── messages
│   ├── en.json
│   ├── bn.json
│
├── prisma
│   └── schema.prisma
│
└── public
```

---

# 📦 Installation

Clone the repository

```
git clone https://github.com/rahmansadaf46/rahmans-associates.git
```

Enter the project directory

```
cd rahmans-associates
```

Install dependencies

```
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file and add:

```
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

---

# ▶️ Run Development Server

```
npm run dev
```

Then open:

```
http://localhost:3000
```

---

# 🌐 Language Support

Supported languages:

* English
* বাংলা

Translation files are located in:

```
messages/en.json
messages/bn.json
```

---

# 🖼️ Screenshots

Screenshots will be added soon:

* Landing page
* Prompt generator
* Dashboard
* Template library

---

# 🧭 Roadmap

Upcoming features:

* AI Legal Document Generator
* Case Law Research Assistant
* Advocate Dashboard
* Law Firm Workspace
* Prompt Marketplace
* AI Legal Summarizer
* Voice-to-Prompt Legal Assistant

---

# 🤝 Contributing

Contributions are welcome!

Ways to contribute:

* Add legal prompt templates
* Improve UI/UX
* Improve Bangla translations
* Enhance AI prompt quality
* Fix bugs and performance issues

### Contribution Steps

1. Fork the repository
2. Create a branch
3. Commit your changes
4. Submit a pull request

---

# 👨‍💻 Maintainer

**Sadaf Rahman**
Founder — Rahman’s Associate

GitHub:
[https://github.com/rahmansadaf46](https://github.com/rahmansadaf46)

---

# ⚠️ Disclaimer

This project is intended to assist with **legal drafting and research workflows only**.

It **does not provide legal advice** and should not replace consultation with a licensed legal professional.

---

# 📜 License

MIT License

This project is open-source and free to use under the MIT License.

---

# ⭐ Support the Project

If you find this project useful:

⭐ Star the repository
🐛 Report issues
🤝 Contribute improvements

Together we can help build the **future of open-source legal technology in Bangladesh.**
