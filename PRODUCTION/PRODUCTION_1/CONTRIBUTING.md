# Contributing to WorkFree

Thank you for your interest in contributing to WorkFree! This document provides guidelines and instructions for contributing.

---

## 🎯 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## 🚀 Getting Started

### Prerequisites
- Bun installed
- Git installed
- Basic knowledge of SvelteKit, TypeScript, and Tailwind CSS

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/TrillionUnicorn/WorkFree.git
cd WorkFree/PRODUCTION/PRODUCTION_1

# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Run database migrations
bun run db:migrate

# Seed database (optional)
bun run db:seed

# Start development server
bun run dev
```

---

## 📝 How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, etc.)

### Suggesting Features

1. **Check existing feature requests**
2. **Create a new issue** with:
   - Clear title
   - Detailed description
   - Use cases
   - Potential implementation approach
   - Mockups (if applicable)

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Write/update tests**
5. **Run tests**
   ```bash
   bun run test:unit
   bun run test
   ```
6. **Run type checking**
   ```bash
   bun run check
   ```
7. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
9. **Create a Pull Request**

---

## 📋 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add two-factor authentication
fix(quest): resolve progress tracking bug
docs(api): update API documentation
test(user): add user profile tests
```

---

## 🏗️ Project Structure

```
PRODUCTION/PRODUCTION_1/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable components
│   │   ├── server/         # Server-side code
│   │   │   ├── db/         # Database schema and queries
│   │   │   ├── auth.ts     # Authentication logic
│   │   │   ├── stripe.ts   # Stripe integration
│   │   │   └── email.ts    # Email service
│   │   └── utils/          # Utility functions
│   ├── routes/             # SvelteKit routes
│   │   ├── (app)/          # Protected app routes
│   │   ├── (auth)/         # Auth routes
│   │   └── api/            # API endpoints
│   └── app.html            # HTML template
├── tests/                  # E2E tests
├── scripts/                # Deployment scripts
└── static/                 # Static assets
```

---

## 🧪 Testing Guidelines

### Unit Tests
- Write tests for all new functions
- Test edge cases
- Use descriptive test names
- Aim for 80%+ coverage

```typescript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

### E2E Tests
- Test critical user flows
- Test across different browsers
- Use page object pattern

```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 🎨 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define types for all function parameters and return values
- Avoid `any` type
- Use interfaces for object shapes

### Svelte
- Use Svelte 5 runes (`$state`, `$derived`, `$effect`)
- Keep components small and focused
- Use props for component communication
- Follow Svelte naming conventions

### CSS
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use custom classes sparingly
- Maintain consistent spacing

---

## 🔒 Security Guidelines

- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for configuration
- Validate all user input
- Sanitize data before database queries
- Use parameterized queries
- Implement rate limiting for API endpoints
- Follow OWASP security best practices

---

## 📚 Documentation Guidelines

- Update README.md for major changes
- Document all public APIs
- Add JSDoc comments for functions
- Update CHANGELOG.md
- Include examples in documentation

---

## 🔄 Pull Request Process

1. **Ensure all tests pass**
2. **Update documentation**
3. **Add entry to CHANGELOG.md**
4. **Request review from maintainers**
5. **Address review feedback**
6. **Wait for approval**
7. **Squash and merge**

---

## 🐛 Bug Fix Process

1. **Create an issue** describing the bug
2. **Create a branch** from `main`
3. **Write a failing test** that reproduces the bug
4. **Fix the bug**
5. **Ensure the test passes**
6. **Submit a pull request**

---

## ✨ Feature Development Process

1. **Discuss the feature** in an issue
2. **Get approval** from maintainers
3. **Create a branch** from `main`
4. **Implement the feature**
5. **Write tests**
6. **Update documentation**
7. **Submit a pull request**

---

## 📊 Performance Guidelines

- Optimize database queries
- Use lazy loading for images
- Minimize bundle size
- Use code splitting
- Implement caching where appropriate
- Monitor Web Vitals

---

## 🌐 Internationalization

- Use English for all code and comments
- Prepare for i18n in the future
- Use semantic HTML
- Follow accessibility guidelines

---

## 🤝 Community

- Be welcoming to newcomers
- Help others learn
- Share knowledge
- Celebrate contributions

---

## 📞 Getting Help

- **Documentation:** Check README.md and other docs
- **Issues:** Search existing issues
- **Discussions:** Use GitHub Discussions
- **Email:** Contact maintainers

---

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the project

---

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to WorkFree!** 🚀

Your contributions help make VR training accessible to everyone.

