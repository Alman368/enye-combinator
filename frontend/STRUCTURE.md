# Frontend Structure Documentation

## 📊 Visual Structure

```
frontend/
│
├── public/                  # Static assets served directly
│   └── ...
│
├── src/
│   ├── components/         # 🧩 Reusable UI Components
│   │   ├── ui/            # Shadcn UI components (Button, Card, etc.)
│   │   │   └── README.md  # Instructions for adding components
│   │   │
│   │   ├── charts/        # 📈 Data Visualization Components
│   │   │   ├── BarChartComponent.tsx
│   │   │   ├── LineChartComponent.tsx
│   │   │   ├── PieChartComponent.tsx
│   │   │   └── StatCard.tsx
│   │   │
│   │   ├── filters/       # 🔍 Filtering Components
│   │   │   ├── FilterPanel.tsx
│   │   │   └── DateRangeFilter.tsx
│   │   │
│   │   ├── layout/        # 🏗️ Layout Components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   ├── common/        # 🔧 Common Utility Components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   │
│   │   └── index.ts       # Barrel exports
│   │
│   ├── pages/             # 📄 Page Components (Routes)
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx      # Main dashboard view
│   │   ├── Login/
│   │   │   └── Login.tsx          # Authentication page
│   │   ├── DataExplorer/
│   │   │   └── DataExplorer.tsx   # Advanced data exploration
│   │   ├── Reports/
│   │   │   └── Reports.tsx        # Report generation
│   │   └── index.ts       # Barrel exports
│   │
│   ├── services/          # 🌐 API Services
│   │   ├── api.ts                 # Axios configuration
│   │   ├── mentalHealthService.ts # Mental health data API
│   │   ├── authService.ts         # Authentication API
│   │   └── index.ts       # Barrel exports
│   │
│   ├── hooks/             # 🪝 Custom React Hooks
│   │   ├── useMentalHealthData.ts # Data fetching hook
│   │   ├── useAuth.ts             # Authentication hook
│   │   └── index.ts       # Barrel exports
│   │
│   ├── context/           # 🌍 React Context (Global State)
│   │   └── AppContext.tsx         # Application context
│   │
│   ├── types/             # 📝 TypeScript Definitions
│   │   └── index.ts               # All type definitions
│   │
│   ├── constants/         # 🔒 Application Constants
│   │   └── index.ts               # Colors, categories, etc.
│   │
│   ├── utils/             # 🛠️ Utility Functions
│   │   └── utils.ts               # Helper functions (Shadcn)
│   │
│   ├── lib/               # 📚 Library Configurations
│   │   └── utils.ts               # Shadcn utilities
│   │
│   ├── assets/            # 🖼️ Static Assets
│   │   └── react.svg
│   │
│   ├── router.tsx         # 🛣️ Application routing
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   ├── App.css            # App styles
│   └── README.md          # Detailed documentation
│
├── components.json        # Shadcn UI configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env.development       # Development environment variables
└── README.md              # Project overview

```

## 🎯 Component Categories

### 1. **Layout Components** (`components/layout/`)
Define the overall structure of the application:
- **Header**: Top navigation bar with logo, menu, user profile
- **Sidebar**: Side navigation with links to different pages
- **MainLayout**: Wrapper combining Header + Sidebar + Content

### 2. **Chart Components** (`components/charts/`)
Data visualization using Recharts:
- **BarChartComponent**: For categorical comparisons
- **LineChartComponent**: For time series and trends
- **PieChartComponent**: For distribution visualization
- **StatCard**: Display key metrics in cards

### 3. **Filter Components** (`components/filters/`)
Enable data filtering and selection:
- **FilterPanel**: Main filter interface
- **DateRangeFilter**: Date range selection

### 4. **Common Components** (`components/common/`)
Reusable utility components:
- **LoadingSpinner**: Loading indicator
- **ErrorMessage**: Error display with retry option

### 5. **UI Components** (`components/ui/`)
Shadcn UI components (to be added via CLI):
- Button, Card, Select, Input, Table, Dialog, etc.

## 📄 Pages

### 1. **Dashboard** (`/`)
- Overview of key statistics
- Summary charts
- Quick insights for researchers

### 2. **Data Explorer** (`/explorer`)
- Advanced filtering interface
- Data table with sorting/pagination
- Multiple visualization options
- Export functionality

### 3. **Reports** (`/reports`)
- Generate custom reports
- Report templates
- Export options

### 4. **Login** (`/login`)
- User authentication
- Form validation
- Redirect after login

## 🔄 Data Flow

```
User Action
    ↓
Component
    ↓
Custom Hook (useMentalHealthData)
    ↓
Service (mentalHealthService)
    ↓
API (axios instance)
    ↓
Backend/Database
    ↓
Response
    ↓
Component Update (re-render)
    ↓
Display to User
```

## 🧪 Next Steps

1. **Add Shadcn UI Components** (see `src/components/ui/README.md`)
2. **Install React Router**
   ```bash
   npm install react-router-dom
   ```
3. **Define TypeScript Types** (in `src/types/index.ts`)
4. **Implement API Services** (connect to backend)
5. **Build Page Components** (start with Dashboard)
6. **Create Chart Components** (integrate Recharts)
7. **Add Filtering Logic**
8. **Test and Deploy**

## 📚 Best Practices

- ✅ **Component Structure**: One component per file
- ✅ **TypeScript**: Use proper types for all props and data
- ✅ **Comments**: Document complex logic
- ✅ **Naming**: Use clear, descriptive names
- ✅ **Imports**: Use barrel exports (index.ts files)
- ✅ **Styling**: Use Tailwind CSS classes
- ✅ **State Management**: Use React Context for global state
- ✅ **Error Handling**: Always handle API errors
- ✅ **Loading States**: Show loading indicators

## 🚀 Development Workflow

1. Start with page mockup/wireframe
2. Break down into components
3. Implement components with placeholder data
4. Connect to API services
5. Add real data
6. Style and polish
7. Test responsiveness
8. Deploy

---

**Note**: All files currently contain placeholder code with TODO comments. Follow the TODOs to implement each feature systematically.

