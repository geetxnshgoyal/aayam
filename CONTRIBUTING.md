# Contributing to AAYAM 2026

Thank you for your interest in contributing to the AAYAM 2026 website.

## Getting Started

1. **Fork** the repository and clone your fork
2. **Install** dependencies: `npm install`
3. **Set up** `.env.local` (copy from `.env.example`)
4. **Run** the dev server: `npm run dev`

## Development Workflow

### Branch Naming

- `feature/` - New features (e.g. `feature/ambassador-leaderboard`)
- `fix/` - Bug fixes (e.g. `fix/login-redirect`)
- `docs/` - Documentation only
- `refactor/` - Code refactoring

### Code Style

- **TypeScript** - Use types; avoid `any`
- **ESLint** - Run `npm run lint` before committing
- **Formatting** - Follow existing patterns in the codebase

### Commit Messages

Use clear, descriptive messages:

```
feat: add ambassador leaderboard
fix: resolve login redirect on mobile
docs: update README setup instructions
```

## Pull Request Process

1. **Create a branch** from `main`
2. **Make your changes** and test locally
3. **Run lint** - `npm run lint`
4. **Push** to your fork and open a PR
5. **Describe** your changes and link any related issues
6. **Wait for review** - Address feedback if requested

## Areas to Contribute

- **UI/UX** - Improve accessibility, responsiveness, or design
- **Features** - Ambassador tasks, admin tools, public pages
- **Bug fixes** - Check open issues
- **Documentation** - README, API docs, inline comments

## Reporting Issues

When opening an issue, please include:

- **Description** - What happened vs. what you expected
- **Steps to reproduce** - How to trigger the bug
- **Environment** - OS, Node version, browser
- **Screenshots** - If relevant

## Security

- **Do not** commit `.env.local`, Firebase keys, or other secrets
- **Do not** commit the Firebase service account JSON file
- Report security vulnerabilities privately to the maintainers

## Questions?

Open a discussion or reach out to the AAYAM organizing team.
