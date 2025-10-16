-- =====================================================
-- CREATE USERS TABLE IN ORACLE
-- =====================================================
-- This script creates the users table in Oracle database
-- for authentication and authorization
-- =====================================================

-- Drop table if exists (for testing purposes)
-- Uncomment the following line if you want to recreate the table
-- DROP TABLE users CASCADE CONSTRAINTS;

-- Create sequence for user IDs
CREATE SEQUENCE users_seq
    START WITH 1
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- Create users table
CREATE TABLE users (
    id NUMBER(10) PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    hashed_password VARCHAR2(255) NOT NULL,
    full_name VARCHAR2(255),
    role VARCHAR2(20) DEFAULT 'VIEWER' NOT NULL,
    is_active NUMBER(1) DEFAULT 1 NOT NULL,
    is_superuser NUMBER(1) DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Add constraints
ALTER TABLE users ADD CONSTRAINT chk_role 
    CHECK (role IN ('ADMIN', 'RESEARCHER', 'VIEWER'));

ALTER TABLE users ADD CONSTRAINT chk_is_active 
    CHECK (is_active IN (0, 1));

ALTER TABLE users ADD CONSTRAINT chk_is_superuser 
    CHECK (is_superuser IN (0, 1));

-- Create trigger for auto-increment ID
CREATE OR REPLACE TRIGGER users_bir
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF :new.id IS NULL THEN
        SELECT users_seq.NEXTVAL INTO :new.id FROM dual;
    END IF;
END;
/

-- Create trigger for updated_at timestamp
CREATE OR REPLACE TRIGGER users_bur
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    :new.updated_at := CURRENT_TIMESTAMP;
END;
/

-- =====================================================
-- INSERT DEFAULT USERS
-- =====================================================
-- Admin user (password: admin123)
INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser)
VALUES (
    'admin@mindhealth.com',
    '$2b$12$3w68.OyJ6f4RQAFzc/Xr3ufGl1tKS.v5uiMVR59GDSBgKGg7nXx3u',
    'Admin User',
    'ADMIN',
    1,
    1
);

-- Researcher user (password: researcher123)
INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser)
VALUES (
    'researcher@hospital.com',
    '$2b$12$JyYWHk.mfmRBakXUe6yAte/MK.TzZSeg8p1d1hHKm9FAlITV17bXq',
    'Research Analyst',
    'RESEARCHER',
    1,
    0
);

-- Viewer user (password: viewer123)
INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser)
VALUES (
    'viewer@hospital.com',
    '$2b$12$h2S/lmgKD8IYL3gk2OyH3uURecy/A81JSAVPrNSKAsXh7n.Uq5Mku',
    'Data Viewer',
    'VIEWER',
    1,
    0
);

-- Test user (password: test123) - Inactive
INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser)
VALUES (
    'test@hospital.com',
    '$2b$12$bKgBgxcRc99NQBDpUp62ROms6jK.uayAUVkmZRqiuFDVrHszNPExO',
    'Test User',
    'VIEWER',
    0,
    0
);

COMMIT;

-- =====================================================
-- VERIFY INSTALLATION
-- =====================================================
SELECT 'Table created successfully!' as status FROM dual;
SELECT COUNT(*) as total_users FROM users;
SELECT email, role, is_active, is_superuser FROM users ORDER BY id;


