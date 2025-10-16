# 🏥 Mental Health Data Visualizer - Frontend

## 📊 Project Overview

A web application designed for medical researchers to visualize and analyze mental health hospital diagnostic data. Built for a hackathon with focus on clean architecture, scalability, and ease of use.

---

## ✅ What's Been Done

### 1. **Folder Structure** ✅
Organized, scalable folder structure following React best practices:
- Components organized by type (layout, charts, filters, common)
- Pages for each major view
- Services for API integration
- Custom hooks for reusable logic
- Context for global state
- TypeScript types centralized
- Constants and utilities separated

### 2. **Documentation** ✅
Comprehensive documentation created:
- **QUICKSTART.md** - Quick reference to get started
- **DEVELOPMENT_GUIDE.md** - Step-by-step implementation guide
- **STRUCTURE.md** - Visual folder structure with descriptions
- **src/README.md** - Detailed architecture documentation
- **src/components/ui/README.md** - Shadcn UI component guide

### 3. **Placeholder Files** ✅
All necessary files created with:
- Clear TODO comments
- Usage instructions
- Example code structures
- Type definitions
- Export barrel files (index.ts)

### 4. **Technology Stack** ✅
Pre-configured and ready:
- ✅ React 19 + TypeScript
- ✅ Vite (fast build tool)
- ✅ Tailwind CSS (utility-first styling)
- ✅ Shadcn UI (component library)
- ✅ Recharts (data visualization)
- ✅ Axios (HTTP client)
- ✅ Lucide React (icon library)

---

## 📁 Folder Structure Summary

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── charts/          # Bar, Line, Pie charts + StatCard
│   │   ├── filters/         # FilterPanel, DateRangeFilter
│   │   ├── layout/          # Header, Sidebar, MainLayout
│   │   └── common/          # LoadingSpinner, ErrorMessage
│   ├── pages/
│   │   ├── Dashboard/       # Main dashboard
│   │   ├── DataExplorer/    # Advanced data exploration
│   │   ├── Reports/         # Report generation
│   │   └── Login/           # Authentication
│   ├── services/
│   │   ├── api.ts           # Axios configuration
│   │   ├── mentalHealthService.ts
│   │   └── authService.ts
│   ├── hooks/               # useMentalHealthData, useAuth
│   ├── context/             # AppContext (global state)
│   ├── types/               # TypeScript definitions
│   ├── constants/           # App constants
│   └── router.tsx           # Routing configuration
├── QUICKSTART.md            # Quick start guide
├── DEVELOPMENT_GUIDE.md     # Implementation guide
├── STRUCTURE.md             # Visual structure
└── .env.example             # Environment variables template
```

---

## 🎯 Next Steps (What YOU Need to Do)

### Immediate (Before Coding):

1. **Install React Router**
   ```bash
   npm install react-router-dom
   ```

2. **Add Shadcn UI Components**
   ```bash
   npx shadcn@latest add button card select input table dialog tabs label
   ```

3. **Define Your Data Types**
   - Edit `src/types/index.ts`
   - Match your backend/database structure

4. **Configure API URL**
   - Copy `.env.example` to `.env.local`
   - Set `VITE_API_URL` to your backend URL

### Development Phase:

Follow the **DEVELOPMENT_GUIDE.md** for detailed step-by-step instructions:

**Phase 1**: Foundation (Routing, UI Components, Types)
**Phase 2**: Layout & Navigation (Header, Sidebar, MainLayout)
**Phase 3**: API Integration (Services, Hooks)
**Phase 4**: Dashboard Page (StatCards, Charts)
**Phase 5**: Chart Components (Bar, Line, Pie)
**Phase 6**: Data Explorer (Filters, Table)
**Phase 7**: Polish (Auth, Reports, Error handling)
**Phase 8**: Testing & Deployment

---

## 📋 Key Files Reference

| File | Purpose | Status |
|------|---------|--------|
| `src/router.tsx` | Route configuration | ⚠️ TODO |
| `src/App.tsx` | Root component | ⚠️ Update needed |
| `src/pages/Dashboard/Dashboard.tsx` | Main dashboard | ⚠️ TODO |
| `src/pages/DataExplorer/DataExplorer.tsx` | Data exploration | ⚠️ TODO |
| `src/services/api.ts` | API configuration | ⚠️ TODO |
| `src/services/mentalHealthService.ts` | Data API | ⚠️ TODO |
| `src/types/index.ts` | Type definitions | ⚠️ TODO |
| `src/components/charts/*.tsx` | Chart components | ⚠️ TODO |

---

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Add Shadcn Components
npx shadcn@latest add [component-name]
```

---

## 💡 Important Notes

### For the Hackathon:
- ✅ Structure follows software engineering best practices
- ✅ Scalable and maintainable architecture
- ✅ Comprehensive documentation
- ⚠️ Need to connect to backend API (Hito 1)
- ⚠️ Need to implement visualizations (required)
- ⚠️ Need to implement filters (required)
- ⚠️ Need to deploy (required)

### Data to Visualize:
- Mental health hospital diagnostic data
- Primary diagnoses
- Time-series trends
- Category distributions
- Hospital comparisons
- Patient demographics (if available)

### Key Features to Implement:
1. **Dashboard** - Overview with key statistics
2. **Data Visualization** - Multiple chart types
3. **Filtering** - Date range, categories, hospitals
4. **Data Table** - Sortable, paginated data view
5. **Export** - Download data/reports
6. **Authentication** - Optional but recommended

---

## 📝 Code Quality Checklist

- [ ] Use TypeScript types for all data
- [ ] Handle loading states
- [ ] Handle error states
- [ ] Responsive design (mobile + desktop)
- [ ] Accessibility (semantic HTML, ARIA labels)
- [ ] Comment complex logic
- [ ] Consistent naming conventions
- [ ] Clean imports using barrel exports

---

## 🎨 Design Guidelines

**Color Theme** (customize in `tailwind.config.js`):
- Primary: Blue (healthcare/trust)
- Secondary: Purple (data/analysis)
- Success: Green (positive metrics)
- Warning: Orange (alerts)
- Error: Red (critical)

**Typography**:
- Headings: Bold, clear hierarchy
- Body: Readable, good line height
- Data: Monospace for numbers

**Layout**:
- Clean, professional
- White space for breathing room
- Card-based design
- Responsive grid system

---

## 🔗 Resources

- [QUICKSTART.md](QUICKSTART.md) - Start here!
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Implementation steps
- [STRUCTURE.md](STRUCTURE.md) - Folder structure
- [src/README.md](src/README.md) - Architecture details

**External Documentation**:
- [Shadcn UI](https://ui.shadcn.com)
- [Recharts](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

## 🎯 Success Criteria

### Minimum Viable Product (MVP):
- ✅ Dashboard with 3-4 key statistics
- ✅ At least 3 different chart types
- ✅ Basic filtering (date range, category)
- ✅ Responsive design
- ✅ Connected to backend API
- ✅ Deployed and accessible

### Stretch Goals:
- Authentication with user roles
- Advanced filtering options
- Data export (CSV, PDF)
- Custom report builder
- Real-time data updates
- Data caching for performance

---

## 👥 For Your Team

**Division of Work** (Suggested):

1. **Developer 1**: Layout + Navigation (Header, Sidebar, Routing)
2. **Developer 2**: Dashboard + Charts (StatCards, Chart components)
3. **Developer 3**: Data Explorer + Filters (FilterPanel, Table)
4. **Everyone**: Polish, testing, deployment

**Timeline** (5-day hackathon):
- Day 1: Setup + Layout
- Day 2: API Integration + Dashboard
- Day 3: Charts + Filters
- Day 4: Data Explorer + Polish
- Day 5: Testing + Deployment

---

## ✨ You're Ready to Build!

The foundation is set. Follow the guides, start with QUICKSTART.md, and build iteratively. Test often, commit frequently, and have fun! 🚀

**Good luck with your hackathon! 🏆**

