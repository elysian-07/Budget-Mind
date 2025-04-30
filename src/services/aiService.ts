
import { Category, Transaction } from "../context/FinanceContext";

// This is a simple mock AI service that would normally use a real ML model
// For demonstration, we're using simple pattern matching

// Keywords that suggest certain categories
const categoryKeywords: Record<Category, string[]> = {
  food: ['grocery', 'restaurant', 'cafe', 'coffee', 'food', 'meal', 'lunch', 'dinner', 'breakfast', 'takeout'],
  transportation: ['gas', 'fuel', 'uber', 'lyft', 'taxi', 'car', 'bus', 'train', 'metro', 'transport', 'fare'],
  housing: ['rent', 'mortgage', 'lease', 'housing', 'apartment', 'home', 'house'],
  utilities: ['electricity', 'water', 'gas', 'internet', 'phone', 'utility', 'bill', 'wifi'],
  entertainment: ['movie', 'theater', 'concert', 'show', 'subscription', 'netflix', 'spotify', 'game', 'entertainment'],
  healthcare: ['doctor', 'medical', 'health', 'dental', 'healthcare', 'medicine', 'pharmacy', 'prescription', 'hospital'],
  education: ['tuition', 'school', 'college', 'university', 'course', 'class', 'book', 'education', 'learning'],
  shopping: ['mall', 'clothes', 'clothing', 'retail', 'store', 'shop', 'purchase', 'amazon', 'online'],
  personal: ['haircut', 'salon', 'gym', 'fitness', 'personal', 'self-care'],
  travel: ['hotel', 'flight', 'airline', 'vacation', 'trip', 'travel', 'booking', 'airbnb'],
  gifts: ['gift', 'present', 'donation', 'charity'],
  income: ['salary', 'deposit', 'payday', 'income', 'paycheck', 'wage', 'payment', 'revenue', 'dividend'],
  other: []
};

export function predictCategory(description: string): Category {
  const normalizedDesc = description.toLowerCase();
  
  // Check if the description contains any keywords
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => normalizedDesc.includes(keyword))) {
      return category as Category;
    }
  }
  
  // Default to other if no match
  return 'other';
}

export function detectAnomalies(transactions: Transaction[]): Transaction[] {
  // Group transactions by category
  const categories = new Map<Category, number[]>();
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const amounts = categories.get(transaction.category) || [];
      amounts.push(transaction.amount);
      categories.set(transaction.category, amounts);
    }
  });
  
  // Calculate mean and standard deviation for each category
  const stats = new Map<Category, { mean: number, stdDev: number }>();
  categories.forEach((amounts, category) => {
    const mean = amounts.reduce((sum, val) => sum + val, 0) / amounts.length;
    const squaredDiffs = amounts.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    stats.set(category, { mean, stdDev });
  });
  
  // Find transactions that are more than 2 standard deviations from the mean
  const anomalies: Transaction[] = [];
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const stat = stats.get(transaction.category);
      if (stat && (transaction.amount > stat.mean + 2 * stat.stdDev)) {
        anomalies.push(transaction);
      }
    }
  });
  
  return anomalies;
}

export function suggestSavings(transactions: Transaction[]): { category: Category; potential: number }[] {
  // Group transactions by category
  const categorySpending = new Map<Category, number>();
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const currentAmount = categorySpending.get(transaction.category) || 0;
      categorySpending.set(transaction.category, currentAmount + transaction.amount);
    }
  });
  
  // Find top spending categories that aren't essential
  const nonEssential: Category[] = ['entertainment', 'shopping', 'personal', 'travel'];
  const suggestions: { category: Category; potential: number }[] = [];
  
  nonEssential.forEach(category => {
    const amount = categorySpending.get(category) || 0;
    if (amount > 0) {
      // Suggest reducing by 15%
      suggestions.push({
        category,
        potential: Math.round(amount * 0.15 * 100) / 100
      });
    }
  });
  
  // Sort by highest potential savings
  return suggestions.sort((a, b) => b.potential - a.potential);
}
