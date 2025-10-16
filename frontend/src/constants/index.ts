/**
 * Application Constants
 *
 * This file contains all application-wide constants
 */

// ============================================
// MEDICAL PROFESSIONAL COLOR PALETTE
// ============================================

export const COLORS = {
  // Primary - Dark Medical Blue
  PRIMARY: '#0C4A6E',
  PRIMARY_LIGHT: '#0891B2',

  // Status Colors
  SUCCESS: '#059669', // Health green
  WARNING: '#D97706', // Attention orange
  ERROR: '#DC2626',   // Critical red
  INFO: '#0891B2',    // Teal

  // Backgrounds
  BACKGROUND: '#FFFFFF',
  BACKGROUND_SECONDARY: '#F8FAFC',

  // Text
  TEXT_PRIMARY: '#0F172A',
  TEXT_SECONDARY: '#475569',
  TEXT_MUTED: '#94A3B8',

  // Borders
  BORDER: '#E2E8F0',
  BORDER_LIGHT: '#F1F5F9',
} as const;

// ============================================
// CHART COLORS (for Recharts)
// ============================================

export const CHART_COLORS = {
  primary: '#0C4A6E',    // Dark medical blue
  teal: '#0891B2',       // Complementary blue
  success: '#059669',    // Health green
  purple: '#7C3AED',     // Accent purple
  warning: '#D97706',    // Attention orange
  pink: '#DB2777',       // Accent pink
  yellow: '#CA8A04',     // Caution yellow
  error: '#DC2626',      // Critical red
} as const;

// Array for multiple series charts
export const CHART_COLORS_ARRAY = [
  CHART_COLORS.primary,
  CHART_COLORS.teal,
  CHART_COLORS.success,
  CHART_COLORS.purple,
  CHART_COLORS.warning,
  CHART_COLORS.pink,
  CHART_COLORS.yellow,
  CHART_COLORS.error,
] as const;

// ============================================
// MENTAL HEALTH DIAGNOSIS CATEGORIES
// ============================================

export const DIAGNOSIS_CATEGORIES = [
  'Depression',
  'Anxiety Disorders',
  'Bipolar Disorder',
  'Schizophrenia',
  'PTSD (Post-Traumatic Stress Disorder)',
  'OCD (Obsessive-Compulsive Disorder)',
  'Eating Disorders',
  'Personality Disorders',
  'Substance Use Disorders',
  'ADHD (Attention-Deficit/Hyperactivity Disorder)',
  'Autism Spectrum Disorder',
  'Other',
] as const;

// ============================================
// USER ROLES
// ============================================

export const USER_ROLES = {
  ADMIN: 'admin',
  RESEARCHER: 'researcher',
  DOCTOR: 'doctor',
  VIEWER: 'viewer',
} as const;

// ============================================
// DATE FORMATS
// ============================================

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_LONG: 'DD MMMM YYYY',
  API: 'YYYY-MM-DD',
  API_DATETIME: 'YYYY-MM-DD HH:mm:ss',
} as const;

// ============================================
// FILTER OPTIONS
// ============================================

export const FILTER_PERIODS = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last year', value: '1y' },
  { label: 'All time', value: 'all' },
  { label: 'Custom range', value: 'custom' },
] as const;

// ============================================
// CHART TYPES
// ============================================

export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
  AREA: 'area',
  SCATTER: 'scatter',
} as const;

// ============================================
// EXPORT FORMATS
// ============================================

export const EXPORT_FORMATS = {
  CSV: 'csv',
  PDF: 'pdf',
  EXCEL: 'xlsx',
  JSON: 'json',
} as const;

// ============================================
// APPLICATION SETTINGS
// ============================================

export const APP_CONFIG = {
  NAME: 'Mental Health Data Visualizer',
  VERSION: '1.0.0',
  API_TIMEOUT: 10000, // 10 seconds
  ITEMS_PER_PAGE: 25,
  MAX_CHART_ITEMS: 50,
} as const;

