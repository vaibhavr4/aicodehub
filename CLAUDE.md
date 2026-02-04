# CLAUDE.md - Project Guidelines

## Project Structure

This is a TypeScript monorepo using npm/pnpm workspaces.

```
aicodehub/
├── packages/           # Shared libraries and utilities
│   ├── core/          # Core business logic
│   ├── shared/        # Shared types and utilities
│   └── ui/            # Shared UI components (if applicable)
├── apps/              # Applications
│   ├── api/           # Backend API service
│   └── web/           # Frontend application
├── tools/             # Build tools and scripts
├── package.json       # Root package.json with workspaces
├── tsconfig.base.json # Base TypeScript configuration
└── CLAUDE.md
```

## Code Principles

### General

- **Simplicity over cleverness**: Write clear, readable code. Avoid unnecessary abstractions.
- **Single Responsibility**: Each module, class, or function should do one thing well.
- **DRY (Don't Repeat Yourself)**: Extract common logic into shared packages.
- **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until it's needed.
- **Fail fast**: Validate inputs early and throw meaningful errors.

### TypeScript Best Practices

#### Type Safety

- Enable `strict` mode in all tsconfig files
- Avoid `any` - use `unknown` when type is uncertain, then narrow with type guards
- Prefer `interface` for object shapes that may be extended, `type` for unions/intersections
- Use `readonly` for immutable properties
- Leverage discriminated unions for state management

```typescript
// Good: Discriminated union
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

// Bad: Loose typing
type Result = { success: boolean; data?: any; error?: any };
```

#### Naming Conventions

- **Files**: `kebab-case.ts` for regular files, `PascalCase.tsx` for React components
- **Variables/Functions**: `camelCase`
- **Types/Interfaces/Classes**: `PascalCase`
- **Constants**: `SCREAMING_SNAKE_CASE` for true constants, `camelCase` for config objects
- **Generics**: Descriptive names (`TItem`, `TResponse`) over single letters when context helps

#### Function Design

- Prefer pure functions where possible
- Use explicit return types for public APIs
- Limit parameters to 3; use an options object for more
- Use default parameters instead of short-circuit evaluation

```typescript
// Good
function createUser(options: CreateUserOptions): User {
  const { name, email, role = 'user' } = options;
  // ...
}

// Avoid
function createUser(name: string, email: string, role?: string, active?: boolean, ...): User
```

#### Error Handling

- Use custom error classes for domain-specific errors
- Never swallow errors silently
- Prefer Result types over throwing for expected failures
- Always type catch blocks properly

```typescript
// Custom error class
class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Typed catch
try {
  // ...
} catch (error) {
  if (error instanceof ValidationError) {
    // handle validation error
  }
  throw error;
}
```

#### Async/Await

- Always use async/await over raw promises
- Handle errors with try/catch or .catch()
- Use `Promise.all` for concurrent independent operations
- Avoid mixing async/await with .then()

#### Imports/Exports

- Use named exports for better tree-shaking and refactoring
- Group imports: external deps, then internal packages, then relative imports
- Use path aliases (`@aicodehub/core`) for cross-package imports

### Monorepo Guidelines

#### Package Dependencies

- Shared code goes in `packages/`
- Apps consume packages, packages don't depend on apps
- Keep package dependencies minimal and explicit
- Use `workspace:*` protocol for internal dependencies

#### Versioning

- Use consistent versioning across all packages
- Shared packages should be versioned together

#### Testing

- Each package should have its own test suite
- Use `vitest` or `jest` with TypeScript support
- Aim for unit tests in packages, integration tests in apps
- Test files: `*.test.ts` or `*.spec.ts` next to source files

### Code Style

- Use ESLint with `@typescript-eslint` rules
- Use Prettier for formatting
- Max line length: 100 characters
- Use 2-space indentation
- Trailing commas in multiline structures
- Semicolons required

### Git Conventions

- Branch naming: `feature/description`, `fix/description`, `chore/description`
- Commit messages: Use conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Keep commits atomic and focused
- Write meaningful commit messages explaining "why" not just "what"

## Commands Reference

```bash
# Install dependencies (from root)
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint

# Type check
pnpm typecheck
```

## Adding a New Package

1. Create directory under `packages/` or `apps/`
2. Add `package.json` with appropriate name (`@aicodehub/package-name`)
3. Add `tsconfig.json` extending base config
4. Add to workspace if not auto-discovered
