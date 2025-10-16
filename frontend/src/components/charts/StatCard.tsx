/**
 * Stat Card Component
 *
 * Display key statistics in a card format
 *
 * TODO: Implement:
 * - Card layout
 * - Large number display
 * - Icon support
 * - Trend indicator (up/down)
 * - Percentage change
 *
 * Use cases:
 * - Total diagnoses
 * - Active patients
 * - Most common diagnosis
 * - Average cases per month
 */

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
}

const StatCard = ({ title, value, icon, trend, trendValue }: StatCardProps) => {
  return (
    <div>
      {/* TODO: Implement stat card */}
      <div>
        <div>{title}</div>
        <div>{value}</div>
      </div>
    </div>
  );
};

export default StatCard;

