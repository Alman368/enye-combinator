# Quick Start Guide 🚀

## Project Overview
Mental Health Data Visualizer - A web application for visualizing hospital mental health diagnostic data for medical researchers.

## Current Status: ✅ Structure Organized

The folder structure is now organized and ready for development. All components have placeholder files with detailed TODO comments.

## What's Ready:

### ✅ Folder Structure
- `src/components/` - UI components organized by type
- `src/pages/` - Page components for routing
- `src/services/` - API integration services
- `src/hooks/` - Custom React hooks
- `src/context/` - Global state management
- `src/types/` - TypeScript definitions
- `src/constants/` - Application constants

### ✅ Technology Stack
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Shadcn UI (component library)
- Recharts (data visualization)
- Axios (API calls)
- Lucide React (icons)

## Next Steps (In Order):

### 1. Install React Router (REQUIRED)
```bash
npm install react-router-dom
```

### 2. Add Shadcn UI Components
```bash
# Core components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add select
npx shadcn@latest add input
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add label
npx shadcn@latest add tabs
```

### 3. Define Data Types
Edit `src/types/index.ts` to match your backend API structure:
```typescript
export interface MentalHealthDiagnosis {
  id: string;
  patientId: string;
  diagnosis: string;
  date: string;
  hospital: string;
  category: string;
  // ... add fields from your database
}
```

### 4. Configure API
Update `src/services/api.ts`:
- Set correct API base URL
- Add authentication if needed

### 5. Start Building
Begin with these files in order:
1. `src/router.tsx` - Setup routing
2. `src/App.tsx` - Update with router
3. `src/components/layout/Header.tsx` - Create header
4. `src/components/layout/Sidebar.tsx` - Create sidebar
5. `src/components/layout/MainLayout.tsx` - Combine layout
6. `src/pages/Dashboard/Dashboard.tsx` - Build dashboard
7. Continue with other pages...

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`, `StatCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Types**: PascalCase for interfaces (e.g., `User`, `FilterOptions`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `CHART_COLORS`)

## Import Examples

```typescript
// Using barrel exports
import { Header, Sidebar, MainLayout } from '@/components';
import { Dashboard, Login } from '@/pages';
import { useAuth, useMentalHealthData } from '@/hooks';
import { api, mentalHealthService } from '@/services';
```

## Documentation Files

- 📖 `src/README.md` - Detailed architecture documentation
- 🏗️ `STRUCTURE.md` - Visual folder structure
- 👨‍💻 `DEVELOPMENT_GUIDE.md` - Step-by-step implementation guide
- ⚡ `QUICKSTART.md` - This file

## Hackathon Requirements Checklist

- [ ] Database connection (via API)
- [ ] Data visualization with charts
- [ ] Data filtering and selection
- [ ] User authentication (optional)
- [ ] Responsive design
- [ ] Deployed application
- [ ] Clean, documented code

## Tips for Hackathon Success

1. **Start Simple**: Build MVP first, add features later
2. **Use Placeholder Data**: Don't wait for backend to start frontend
3. **Mobile First**: Design for mobile, enhance for desktop
4. **Error Handling**: Always show loading and error states
5. **Documentation**: Comment your code as you go
6. **Git Commits**: Commit frequently with clear messages
7. **Test Early**: Test on different browsers and devices
8. **Deploy Early**: Deploy to see real-world issues

## Need Help?

Check these files for guidance:
- Each component file has TODO comments
- `DEVELOPMENT_GUIDE.md` has code examples
- `src/components/ui/README.md` for Shadcn components

## Ready to Code? 🎯

1. Read `DEVELOPMENT_GUIDE.md` for detailed instructions
2. Start with Phase 1 (Foundation)
3. Follow the TODOs in each file
4. Build iteratively, test frequently
5. Have fun! 🚀

---

**Remember**: The structure is organized. Now just follow the TODOs and build! 💪

