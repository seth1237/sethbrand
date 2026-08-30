// Store calculator results in memory (would be a database in production)
type CalculatorPayload = Record<string, unknown>

interface CalculatorResult {
  shareId: string;
  timestamp: number;
  data: CalculatorPayload;
}

// In-memory store for calculator results (this would be a database in production)
const calculatorResultsStore = new Map<string, CalculatorResult>();

// Save calculator results and return a share ID
export const saveCalculatorResults = (data: CalculatorPayload): { shareId: string; timestamp: number } => {
  const shareId = `calc-${crypto.randomUUID().slice(0, 8)}`;
  const timestamp = Date.now();

  cleanupOldResults();
  
  calculatorResultsStore.set(shareId, {
    shareId,
    timestamp,
    data
  });
  
  // In production, this would be saved to a database
  return { shareId, timestamp };
};

// Retrieve calculator results by share ID
export const getCalculatorResultsById = (shareId: string): CalculatorResult | null => {
  if (!calculatorResultsStore.has(shareId)) {
    return null;
  }
  
  return calculatorResultsStore.get(shareId) || null;
};

// Clean up old calculator results (optional maintenance function)
export const cleanupOldResults = (): void => {
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const now = Date.now();
  
  // Remove entries older than one week
  calculatorResultsStore.forEach((result, key) => {
    if (now - result.timestamp > ONE_WEEK_MS) {
      calculatorResultsStore.delete(key);
    }
  });
};