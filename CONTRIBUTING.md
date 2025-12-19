# Contributing to Solo Link

Thank you for your interest in contributing to Solo Link! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

1. **Clear title** - Describe the issue concisely
2. **Description** - Explain what happened vs. what you expected
3. **Steps to reproduce** - Detailed steps to reproduce the issue
4. **Environment** - OS, Node version, browser (if applicable)
5. **Screenshots** - If relevant

### Suggesting Features

For feature requests, open an issue with:

1. **Clear title** - Describe the feature
2. **Use case** - Explain why this feature would be useful
3. **Proposed solution** - How you envision it working
4. **Alternatives** - Other approaches you've considered

### Pull Requests

#### Before You Start

1. **Check existing issues** - Make sure it's not already being worked on
2. **Open an issue first** - Discuss your approach before major changes
3. **Keep it focused** - One feature/fix per pull request

#### Development Process

1. **Fork the repository**

```bash
gh repo fork your-username/sololink --clone
```

2. **Create a branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

3. **Make your changes**

Follow these guidelines:

- **Code Style**: Follow existing patterns and conventions
- **TypeScript**: Maintain strict type safety, no `any` types
- **Comments**: Explain "why" not "what" for complex logic
- **Components**: Keep components small and focused
- **Server Actions**: Use for mutations instead of API routes

4. **Test your changes**

```bash
# Lint your code
npm run lint

# Test locally
npm run dev

# Build to ensure no errors
npm run build
```

5. **Commit your changes**

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add custom theme colors to user profiles"
git commit -m "fix: resolve subdomain routing issue on Safari"
git commit -m "docs: update deployment instructions for Railway"
```

Commit message format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

6. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request**

- Clear title describing the change
- Reference related issues (#123)
- Describe what changed and why
- Include screenshots for UI changes
- List any breaking changes

#### Code Review

- Be patient - reviews take time
- Respond to feedback constructively
- Make requested changes in new commits
- Once approved, maintainers will merge

## Development Guidelines

### Project Structure

Follow the existing structure:

```
src/
├── app/              # Next.js routes
├── components/       # React components
│   ├── dashboard/    # Admin components
│   ├── profile/      # Public profile components
│   └── ui/           # Reusable UI components
└── lib/              # Core utilities
    ├── db/           # Database
    ├── auth/         # Authentication
    └── analytics/    # Analytics
```

### Code Style

- **Use TypeScript** - Always type your code properly
- **Server Components** - Default to server components, use `'use client'` only when needed
- **Server Actions** - Use for mutations instead of API routes
- **Tailwind CSS** - Use Tailwind for styling, avoid custom CSS when possible
- **shadcn/ui** - Use existing UI components before creating new ones

### Database Changes

If modifying the schema:

1. Update `src/lib/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Test migration: `npm run db:push` (local)
4. Document any required manual steps

### Adding Dependencies

- Keep dependencies minimal
- Prefer well-maintained packages
- Check bundle size impact
- Document why the dependency is needed

## Areas for Contribution

### Easy (Good First Issues)

- UI/UX improvements
- Documentation improvements
- Bug fixes
- Adding tooltips/help text
- Improving error messages

### Medium

- New features (link categories, custom themes)
- Performance optimizations
- Mobile responsiveness improvements
- Additional OAuth providers
- Internationalization (i18n)

### Advanced

- Test coverage (unit, integration, e2e)
- Advanced analytics features
- Team/organization accounts
- API for external integrations
- Mobile app (React Native)
- Browser extension

## Testing

Currently, the project relies on manual testing. We welcome contributions to add:

- Unit tests (Jest/Vitest)
- Integration tests (Playwright)
- E2E tests (Cypress)

When adding tests:

- Test behavior, not implementation
- Cover edge cases
- Keep tests fast and focused

## Documentation

When making changes that affect users or developers:

- Update README.md if changing features
- Update SETUP.md if changing setup/deployment
- Add JSDoc comments for exported functions
- Update type definitions

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Open a discussion on GitHub
4. Reach out in the community (if available)

## Recognition

Contributors will be:

- Listed in the project's contributors
- Credited in release notes for significant contributions
- Acknowledged in the community

## Thank You!

Your contributions make Solo Link better for everyone. We appreciate your time and effort! 🎉
