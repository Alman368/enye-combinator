# MindHealth Analytics Backend

Backend API for MindHealth Analytics - Mental Health Data Visualization Platform

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL (or SQLite for development)
- Virtual environment (recommended)

### Installation

1. **Clone the repository** (if not already done)
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. **Initialize database**
```bash
python init_db.py
```

6. **Run the development server**
```bash
python run_dev.py
# or
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running, you can access:
- **Interactive API docs**: http://localhost:8000/api/v1/docs
- **Alternative API docs**: http://localhost:8000/api/v1/redoc

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Default Users

After running `init_db.py`, these users are available:

| Email | Password | Role | Description |
|-------|----------|------|-------------|
| admin@mindhealth.com | admin123 | Admin | Full system access |
| researcher@hospital.com | researcher123 | Researcher | Data analysis access |
| viewer@hospital.com | viewer123 | Viewer | Read-only access |
| test@hospital.com | test123 | Viewer | Inactive user (for testing) |

### Login Flow

1. **Get tokens**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@mindhealth.com&password=admin123"
```

2. **Use access token**
```bash
curl -X GET "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

3. **Refresh token**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/refresh" \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "YOUR_REFRESH_TOKEN"}'
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login with email/password
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user info
- `POST /api/v1/auth/logout` - Logout (client-side)

### Users (Admin only)
- `GET /api/v1/users/` - List all users
- `POST /api/v1/users/` - Create new user
- `GET /api/v1/users/{user_id}` - Get user details
- `PATCH /api/v1/users/{user_id}` - Update user

## 🗄️ Database

### Using PostgreSQL (Recommended)

1. Install PostgreSQL
2. Create database and user:
```sql
CREATE DATABASE mindhealth_db;
CREATE USER mindhealth_user WITH PASSWORD 'mindhealth_pass';
GRANT ALL PRIVILEGES ON DATABASE mindhealth_db TO mindhealth_user;
```

3. Update `.env` with your database URL:
```
DATABASE_URL=postgresql://mindhealth_user:mindhealth_pass@localhost:5432/mindhealth_db
```

### Using SQLite (Development only)

Update `.env`:
```
DATABASE_URL=sqlite:///./mindhealth.db
```

## 🧪 Testing

Run tests with pytest:
```bash
pytest
```

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── api_v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py      # Authentication endpoints
│   │   │   │   └── users.py     # User management
│   │   │   └── api.py          # API router
│   │   └── deps.py             # Dependencies
│   ├── core/
│   │   ├── config.py           # App configuration
│   │   └── security.py         # Security utilities
│   ├── db/
│   │   ├── base_class.py       # Base SQLAlchemy class
│   │   └── session.py          # Database session
│   ├── models/
│   │   └── user.py             # User model
│   ├── schemas/
│   │   ├── token.py            # Token schemas
│   │   └── user.py             # User schemas
│   └── main.py                 # FastAPI app
├── alembic/                    # Database migrations
├── tests/                      # Test files
├── .env                        # Environment variables
├── requirements.txt            # Python dependencies
├── init_db.py                  # Database initialization
└── run_dev.py                  # Development server

```

## 🔧 Development

### Code Style
- Use Black for formatting: `black .`
- Use isort for imports: `isort .`
- Use flake8 for linting: `flake8`

### Database Migrations

Using Alembic for database migrations:

```bash
# Create a new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## 🐛 Troubleshooting

### Common Issues

1. **Database connection error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Import errors**
   - Make sure you're in the virtual environment
   - Reinstall dependencies: `pip install -r requirements.txt`

3. **CORS errors**
   - Check `BACKEND_CORS_ORIGINS` in `.env`
   - Ensure frontend URL is included

## 📝 License

This project is part of MindHealth Analytics platform.
