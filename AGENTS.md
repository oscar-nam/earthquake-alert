# AGENTS.md - AI Agent Instructions

## Project Overview

**Project Name:** ccdd  
**Version:** 0.0.0  
**Type:** React + Vite Frontend Application

This is a modern React application built with Vite as the build tool. The project uses React 19.1.1 and includes a comprehensive development setup with ESLint for code quality.

## Technology Stack

### Core Framework

- **React:** ^19.1.1 - Latest React framework for building user interfaces
- **React DOM:** ^19.1.1 - React rendering library for web

### Build Tools & Development

- **Vite:** ^7.1.7 - Fast build tool and development server
- **@vitejs/plugin-react:** ^5.0.4 - Official Vite plugin for React support

### Code Quality & Linting

- **ESLint:** ^9.36.0 - JavaScript linter for code quality
- **@eslint/js:** ^9.36.0 - ESLint JavaScript configuration
- **eslint-plugin-react-hooks:** ^5.2.0 - ESLint rules for React Hooks
- **eslint-plugin-react-refresh:** ^0.4.22 - ESLint plugin for React Fast Refresh
- **globals:** ^16.4.0 - Global variables for ESLint

### UI Component Library

- **PrimeReact:** Latest - Comprehensive React UI component library with rich components
- **PrimeIcons:** Latest - Icon library that pairs with PrimeReact components

### TypeScript Support (Development)

- **@types/react:** ^19.1.16 - TypeScript definitions for React
- **@types/react-dom:** ^19.1.9 - TypeScript definitions for React DOM

## Project Structure

```
ccdd/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── assets/           # Project assets (images, fonts, etc.)
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── eslint.config.js      # ESLint configuration
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies and scripts
├── index.html          # HTML entry point
└── README.md           # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## Development Guidelines for AI Agents

### When working with this project:

1. **Framework Patterns**: This is a React project using modern patterns with functional components and hooks
2. **Build System**: Use Vite commands for development and building
3. **Code Style**: Follow ESLint configuration already set up in the project
4. **File Extensions**: Use `.jsx` for React components, `.js` for utility files
5. **Module System**: Project uses ES modules (`"type": "module"` in package.json)
6. **UI Components**: PrimeReact is available for rich UI components - wrap components with PrimeReactProvider

### Key Considerations:

- **React Version**: Using React 19.1.1 - be aware of latest React features and patterns
- **Development Server**: Vite provides fast HMR (Hot Module Replacement)
- **Linting**: Code should pass ESLint checks before committing
- **TypeScript**: While not fully configured, TypeScript definitions are available for development
- **PrimeReact**: UI component library is configured - use PrimeReactProvider wrapper in App.jsx

### Common Tasks:

1. **Adding new components**: Create in `src/` directory with `.jsx` extension
2. **Styling**: Add CSS files alongside components or modify existing CSS files
3. **Assets**: Place static assets in `public/` or `src/assets/`
4. **Dependencies**: Use npm to add new packages and update package.json

### Development Workflow:

1. Run `npm run dev` to start development server
2. Make changes to files in `src/` directory
3. Changes will hot reload automatically
4. Run `npm run lint` to check code quality
5. Run `npm run build` to create production bundle

## Notes for AI Agents

- This project appears to be a starter template based on the Vite React template
- The application is in early development (version 0.0.0)
- Consider the project private (marked as `"private": true`)
- Modern React patterns should be used (hooks, functional components)
- ES6+ JavaScript features are supported through Vite's build system

## Future Enhancements

When expanding this project, consider:

- Adding a state management solution (Redux, Zustand, etc.)
- Implementing routing with React Router
- Setting up testing framework (Jest, Vitest, Testing Library)
- Adding TypeScript configuration for better type safety
- Implementing build optimization and PWA features
- Exploring advanced PrimeReact themes and customization
