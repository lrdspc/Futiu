# Development Guidelines

## Code Quality Standards

### TypeScript Usage
- **Strict typing**: All files use TypeScript with strict mode enabled
- **Type definitions**: Explicit type annotations for function parameters and return values
- **Interface definitions**: Custom types defined for complex data structures (e.g., `WorkoutExercise`, `ToasterToast`)
- **Generic types**: Proper use of generics for reusable components and functions

### Import Organization
- **Grouped imports**: External libraries first, then internal modules
- **Path aliases**: Consistent use of `@/` path mapping for internal imports
- **Named imports**: Prefer named imports over default imports for better tree-shaking

### Component Structure
- **'use client' directive**: Client components explicitly marked at the top
- **Component composition**: Complex components broken into smaller, focused sub-components
- **Props interface**: Clear prop type definitions with optional parameters marked

## Architectural Patterns

### Component Design Patterns
- **Compound components**: Complex UI elements built as compound components (e.g., Sidebar system)
- **Render props**: Flexible component APIs using render prop patterns
- **Context providers**: State management through React Context for shared functionality
- **Custom hooks**: Business logic extracted into reusable custom hooks

### State Management
- **useState for local state**: Component-level state using React's useState
- **useCallback optimization**: Memoized callbacks to prevent unnecessary re-renders
- **useMemo for computed values**: Expensive calculations memoized appropriately
- **Context for global state**: Shared state managed through React Context

### Event Handling
- **Keyboard shortcuts**: Global keyboard event listeners with proper cleanup
- **Event delegation**: Efficient event handling patterns
- **Controlled components**: Form inputs as controlled components with proper state management

## UI/UX Patterns

### Design System Integration
- **shadcn/ui components**: Consistent use of design system components
- **Variant-based styling**: Component variants using `class-variance-authority`
- **Tailwind CSS**: Utility-first styling with custom CSS properties for theming
- **Responsive design**: Mobile-first responsive patterns

### Accessibility Standards
- **ARIA labels**: Proper ARIA attributes for screen readers
- **Semantic HTML**: Meaningful HTML structure with appropriate roles
- **Keyboard navigation**: Full keyboard accessibility support
- **Focus management**: Proper focus handling in modals and complex interactions

### Animation and Transitions
- **CSS transitions**: Smooth transitions for state changes
- **Loading states**: Skeleton components for loading states
- **Micro-interactions**: Subtle animations for better user experience

## Testing Patterns

### Test Structure
- **Descriptive test names**: Clear, behavior-focused test descriptions
- **Arrange-Act-Assert**: Consistent test structure pattern
- **Mock external dependencies**: Proper mocking of external modules and APIs
- **User-centric testing**: Tests focused on user interactions rather than implementation details

### Testing Utilities
- **React Testing Library**: User-focused testing approach
- **Jest matchers**: Appropriate Jest matchers for different assertions
- **Test data attributes**: `data-testid` attributes for reliable element selection
- **Event simulation**: Proper simulation of user events (clicks, input changes)

## Data Management

### API Integration
- **Server Actions**: Next.js server actions for data mutations
- **Type-safe queries**: Strongly typed database queries and responses
- **Error handling**: Comprehensive error handling for API calls
- **Loading states**: Proper loading state management

### Form Handling
- **Controlled inputs**: All form inputs as controlled components
- **Validation**: Client-side validation with proper error messaging
- **State synchronization**: Form state properly synchronized with component state

## Performance Optimization

### Component Optimization
- **React.memo**: Memoization for expensive components
- **useCallback**: Callback memoization to prevent child re-renders
- **Lazy loading**: Dynamic imports for code splitting
- **Image optimization**: Proper image handling with fallbacks

### Bundle Optimization
- **Tree shaking**: Proper import patterns for optimal bundle size
- **Code splitting**: Route-based and component-based code splitting
- **Dynamic imports**: Lazy loading of non-critical components

## Code Documentation

### JSDoc Comments
- **Function documentation**: Comprehensive JSDoc comments for complex functions
- **Parameter descriptions**: Clear parameter and return value documentation
- **Usage examples**: Examples provided for complex APIs

### Code Comments
- **Inline comments**: Explanatory comments for complex logic
- **TODO comments**: Proper TODO formatting for future improvements
- **Business logic explanation**: Comments explaining business rules and constraints

## File Organization

### Naming Conventions
- **kebab-case**: File names in kebab-case format
- **PascalCase**: Component names in PascalCase
- **camelCase**: Variable and function names in camelCase
- **Descriptive names**: Clear, descriptive naming throughout

### Directory Structure
- **Feature-based organization**: Components organized by feature/domain
- **Shared utilities**: Common utilities in dedicated directories
- **Type definitions**: Centralized type definitions where appropriate