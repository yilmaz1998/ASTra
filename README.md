# 🚀 ASTra

**ASTra (AST + LLM Code Reviewer)** is an AI-powered code review tool that combines **Static Analysis (AST)** with **Large Language Models (LLMs)** to detect issues in JavaScript code and explain them in a human-readable way.

[Youtube Demo Video](https://www.youtube.com/watch?v=EBDBhw5YfnU)

It helps developers write cleaner, safer, and more maintainable code by providing:
- 🔍 Static code issue detection (AST-based)
- 🤖 AI-powered explanations (LLM)
- 🧠 Fix suggestions for each issue
- 📍 Line-level issue tracking
- 💻 VS Code-like editor experience

---

## ✨ Features

- 🧪 JavaScript code analysis via AST parser
- 🤖 AI-generated explanations for issues
- ⚠️ Detection of:
  - Unused variables
  - Console usage in production
  - Long functions (based on line count > 20)
- 📍 Line-by-line issue mapping
- 🎯 Monaco Editor integration (VS Code-like UI)
- ⚡ Fast API built with Express

---

## 🛠 Tech Stack

### Frontend
- React Vite
- Tailwind CSS
- Monaco Editor
- Framer Motion

### Backend
- Node.js
- Express.js
- OpenAI API
- Babel AST parser

---

## ⚠️ How it works
```
{
  "success": true,
  "issues": [
    {
      "type": "console_usage",
      "message": "Avoid console.log in production",
      "line": 10
    }
  ],
  "summary": "Code contains unused variables and console logs.",
  "explanations": [
    {
      "issue": "Avoid console.log in production",
      "why": "Logging can expose sensitive data...",
      "fix": "Use a proper logging library instead.",
      "line": 10
    }
  ]
}
```
---

## 💡 Motivation

This project was built to explore:

- AST-based static analysis
- LLM integration into developer tools
- Modern AI-powered DX (Developer Experience)

## 🧑‍💻 Author

Built by Sinan Yilmaz
