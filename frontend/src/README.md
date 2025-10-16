# Frontend Structure - Mental Health Data Visualizer

This frontend application is built for visualizing mental health diagnostic data for medical researchers.

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── charts/         # Chart components (using Recharts)
│   ├── filters/        # Filter components
│   ├── layout/         # Layout components (Header, Sidebar, Footer)
│   └── common/         # Common components (Loading, Error, etc.)
├── pages/              # Page components (views)
│   ├── Dashboard/      # Main dashboard with overview
│   ├── Login/          # Authentication page
│   ├── DataExplorer/   # Advanced data exploration
│   └── Reports/        # Report generation
├── services/           # API services
│   ├── api.ts          # Axios instance configuration
│   ├── mentalHealthService.ts  # Mental health data API
│   └── authService.ts  # Authentication API
├── hooks/              # Custom React hooks
│   ├── useMentalHealthData.ts  # Data fetching hook
│   └── useAuth.ts      # Authentication hook
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (already has utils.ts from Shadcn)
├── context/            # React Context for state management
├── constants/          # Application constants
├── lib/                # External library configs (Shadcn)
└── assets/             # Static assets (images, icons)
```

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI component library
- **Recharts** - Data visualization
- **Axios** - API calls
- **Lucide React** - Icons

## 🚀 Key Features to Implement

### 1. Data Visualization
- Interactive charts (bar, line, pie)
- Stat cards for key metrics
- Responsive design
- Multiple chart types for different data insights

### 2. Data Filtering & Selection
- Date range filters
- Hospital selection
- Diagnosis category filters
- Real-time data updates
- Filter persistence

### 3. Authentication (Optional)
- User login
- Role-based access (admin, researcher, viewer)
- Token management

### 4. Data Export
- Export to CSV
- Export to PDF
- Custom report generation

## 📋 Development Checklist

### Phase 1: Setup & Structure ✅
- [x] Folder structure organized
- [x] Placeholder files created
- [x] Documentation added

### Phase 2: Core Components (TODO)
- [ ] Setup routing (React Router)
- [ ] Add Shadcn UI components
- [ ] Create layout components (Header, Sidebar)
- [ ] Implement MainLayout wrapper

### Phase 3: API Integration (TODO)
- [ ] Configure API endpoints
- [ ] Implement mentalHealthService
- [ ] Implement authService (optional)
- [ ] Create custom hooks for data fetching

### Phase 4: Pages (TODO)
- [ ] Login page
- [ ] Dashboard page with key metrics
- [ ] Data Explorer page with advanced filters
- [ ] Reports page

### Phase 5: Charts & Visualization (TODO)
- [ ] Bar chart component
- [ ] Line chart component
- [ ] Pie chart component
- [ ] Stat card component
- [ ] Integrate with real data

### Phase 6: Filtering (TODO)
- [ ] Date range filter
- [ ] Multi-select filters
- [ ] Filter panel component
- [ ] Filter state management

### Phase 7: Polish & Deployment (TODO)
- [ ] Responsive design testing
- [ ] Error handling
- [ ] Loading states
- [ ] Performance optimization
- [ ] Deployment configuration

## 🎯 Hackathon Requirements

✅ **Web application with database access**
✅ **Data visualization with diagrams** (Recharts)
✅ **Data filtering and selection**
✅ **Good software engineering practices**
✅ **Deployment ready**

## 📝 Notes

- All files currently contain placeholders and TODO comments
- Follow the TODO comments in each file to implement features
- Use TypeScript types for all data structures
- Maintain clean, documented code
- Test responsiveness on different screen sizes
- For hackathon evaluation, provide test credentials if authentication is implemented

## 🔗 Related Files

- `/frontend/package.json` - Dependencies
- `/frontend/tailwind.config.js` - Tailwind configuration
- `/frontend/vite.config.ts` - Vite configuration
- `/frontend/components.json` - Shadcn configuration

