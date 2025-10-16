/**
 * Error Message Component
 *
 * Reusable error display component
 *
 * TODO: Implement:
 * - Error message display
 * - Retry button
 * - Different error types (warning, error, info)
 */

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div>
      {/* TODO: Implement error message */}
      <div>{message}</div>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
};

export default ErrorMessage;

