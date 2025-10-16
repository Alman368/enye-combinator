# MindHealth Analytics

Mental Health Data Visualization Platform - Full Stack Application

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- Python 3.8+
- PostgreSQL (optional, can use SQLite for development)

### One-Command Setup & Start

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
start.bat
```

**Or using npm:**
```bash
npm install
npm start
```

This will:
1. ✅ Install all dependencies (frontend & backend)
2. ✅ Create Python virtual environment
3. ✅ Initialize the database with sample users
4. ✅ Start both frontend and backend servers

### 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/v1/docs

### 👥 Default Users

| Email | Password | Role |
|-------|----------|------|
| admin@mindhealth.com | admin123 | Admin |
| researcher@hospital.com | researcher123 | Researcher |
| viewer@hospital.com | viewer123 | Viewer |

## 📁 Project Structure

```
enye-combinator/
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── backend/               # Python + FastAPI
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Core functionality
│   │   ├── models/       # Database models
│   │   └── schemas/      # Pydantic schemas
│   ├── requirements.txt
│   └── run_dev.py
│
├── package.json          # Root package for running both
├── start.sh             # Linux/Mac start script
└── start.bat            # Windows start script
```

## 🛠️ Available Scripts

### Root Level
- `npm start` - Start both frontend and backend
- `npm run frontend` - Start only frontend
- `npm run backend` - Start only backend
- `npm run backend:init` - Initialize database

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
python run_dev.py    # Start development server
python init_db.py    # Initialize database
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/.env`:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
SECRET_KEY=your-secret-key
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend Configuration
The frontend is pre-configured to connect to the backend at `http://localhost:8000/api`.

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Frontend (3000): Kill the process or change port in `frontend/vite.config.ts`
   - Backend (8000): Kill the process or change port in `backend/run_dev.py`

2. **Database connection errors**
   - Ensure PostgreSQL is running
   - Check credentials in `backend/.env`
   - Or use SQLite: `DATABASE_URL=sqlite:///./mindhealth.db`

3. **Module not found errors**
   - Backend: Activate virtual environment and run `pip install -r requirements.txt`
   - Frontend: Run `npm install` in the frontend directory

4. **CORS errors**
   - Ensure `BACKEND_CORS_ORIGINS` in `backend/.env` includes your frontend URL

## 📚 Documentation

- **API Documentation**: http://localhost:8000/api/v1/docs
- **Frontend Components**: See `frontend/src/components/README.md`
- **Backend API**: See `backend/README.md`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.