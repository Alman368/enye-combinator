# Development Guide - Mental Health Data Visualizer

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Code editor (VS Code recommended)

### Installation
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```
Open http://localhost:3000

### Build for Production
```bash
npm run build
npm run preview  # Preview production build
```

## 📦 Adding Dependencies

### UI Components (Shadcn)
```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add select
npx shadcn@latest add input
npx shadcn@latest add table

# See full list in src/components/ui/README.md
```

### Routing
```bash
npm install react-router-dom
npm install -D @types/react-router-dom
```

### Date Handling (for filters)
```bash
npm install date-fns
# or
npm install dayjs
```

### Form Validation (optional)
```bash
npm install react-hook-form zod @hookform/resolvers
```

## 🏗️ Implementation Order

### Phase 1: Foundation (Day 1)
1. **Setup Routing**
   - Install react-router-dom
   - Implement router.tsx
   - Create basic route structure
   - Test navigation between pages

2. **Add Shadcn Components**
   - Add core components (button, card, input, select)
   - Test component integration
   - Customize theme colors in tailwind.config.js

3. **Define Data Types**
   - Complete types/index.ts with actual data structures
   - Match types with backend API structure
   - Export all types for reuse

### Phase 2: Layout & Navigation (Day 1-2)
1. **Implement Header**
   - Logo
   - Navigation menu
   - User profile dropdown (if auth enabled)

2. **Implement Sidebar**
   - Navigation links with icons
   - Active route highlighting
   - Mobile-responsive collapse

3. **Implement MainLayout**
   - Combine Header + Sidebar
   - Responsive grid layout
   - Content area with proper spacing

4. **Update App.tsx**
   - Wrap routes with MainLayout
   - Add context providers

### Phase 3: API Integration (Day 2)
1. **Configure API Service**
   - Update base URL in .env
   - Add interceptors in services/api.ts
   - Test connection to backend

2. **Implement mentalHealthService**
   - getDiagnoses() with filters
   - getStatistics()
   - getFilterOptions()
   - getChartData()

3. **Implement Custom Hooks**
   - useMentalHealthData with loading/error states
   - Test data fetching

### Phase 4: Dashboard Page (Day 2-3)
1. **Create StatCard Component**
   - Design card layout
   - Add icon support
   - Add trend indicators

2. **Implement Dashboard Layout**
   - Grid of stat cards
   - Chart sections
   - Responsive design

3. **Add Basic Charts**
   - Bar chart for diagnoses by category
   - Line chart for time series
   - Test with real data

### Phase 5: Chart Components (Day 3)
1. **BarChartComponent**
   - Configure Recharts
   - Add tooltips and legends
   - Make responsive

2. **LineChartComponent**
   - Multiple lines support
   - Time-based x-axis
   - Interactive tooltips

3. **PieChartComponent**
   - Percentage labels
   - Color customization
   - Legend positioning

### Phase 6: Data Explorer Page (Day 3-4)
1. **Implement FilterPanel**
   - Date range filter
   - Multi-select dropdowns
   - Reset/Apply buttons

2. **Add Data Table**
   - Use Shadcn Table component
   - Add sorting
   - Add pagination
   - Display diagnosis data

3. **Connect Filters to Data**
   - Update data on filter change
   - Show loading states
   - Handle empty results

### Phase 7: Polish & Features (Day 4-5)
1. **Add Authentication** (Optional)
   - Login page
   - Auth context
   - Protected routes
   - Token management

2. **Reports Page** (If time permits)
   - Report templates
   - Export functionality

3. **Error Handling**
   - Error boundaries
   - Error message component
   - Retry mechanisms

4. **Loading States**
   - Loading spinners
   - Skeleton loaders
   - Progressive loading

### Phase 8: Testing & Deployment (Day 5)
1. **Testing**
   - Test all pages
   - Test responsive design
   - Test error scenarios
   - Browser testing

2. **Performance**
   - Optimize bundle size
   - Lazy load routes
   - Image optimization

3. **Deployment**
   - Configure environment variables
   - Build production bundle
   - Deploy to hosting platform
   - Test deployed version

## 📝 Code Examples

### Example: Implementing a Page

```typescript
// src/pages/Dashboard/Dashboard.tsx
import { useMentalHealthData } from '@/hooks';
import { StatCard, BarChartComponent } from '@/components';
import { LoadingSpinner, ErrorMessage } from '@/components/common';

const Dashboard = () => {
  const { data, loading, error } = useMentalHealthData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Diagnoses" value={data.total} />
        {/* More stat cards */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          data={data.byCategory}
          xKey="category"
          yKey="count"
          title="Diagnoses by Category"
        />
        {/* More charts */}
      </div>
    </div>
  );
};

export default Dashboard;
```

### Example: Custom Hook

```typescript
// src/hooks/useMentalHealthData.ts
import { useState, useEffect } from 'react';
import { mentalHealthService } from '@/services';

export const useMentalHealthData = (filters?: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await mentalHealthService.getDiagnoses(filters);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { data, loading, error };
};
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes
```tsx
// Container
<div className="container mx-auto px-4 py-6">

// Card
<div className="bg-white rounded-lg shadow-md p-6">

// Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Button (use Shadcn Button component instead)
<Button variant="default" size="lg">Click me</Button>

// Responsive Text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
```

### Color Palette
- Primary: Blue (for main actions, links)
- Secondary: Purple (for secondary actions)
- Success: Green (for positive metrics)
- Warning: Orange (for warnings)
- Danger: Red (for errors, critical data)

Customize in `tailwind.config.js`

## 🐛 Common Issues & Solutions

### Issue: Components not found
**Solution**: Check import paths. Use `@/` for src imports (configured in tsconfig.json)

### Issue: API calls failing
**Solution**: Check VITE_API_URL in .env.development and ensure backend is running

### Issue: Charts not displaying
**Solution**: Ensure data format matches Recharts requirements. Check console for errors.

### Issue: Styling not applied
**Solution**: Check if Tailwind classes are correct. Run `npm run build` to see if there are CSS issues.

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Recharts](https://recharts.org)
- [React Router](https://reactrouter.com)
- [Axios](https://axios-http.com/docs/intro)

## 🤝 Contributing

1. Follow the existing code structure
2. Add comments for complex logic
3. Use TypeScript types
4. Test before committing
5. Follow the naming conventions

---

**Happy Coding! 🚀**

