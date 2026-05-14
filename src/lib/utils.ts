import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateEndDate(startDate: Date, workingDays: number): Date {
  let endDate = new Date(startDate);
  let daysAdded = 0;
  
  // If workingDays is 1, the end date is the start date
  if (workingDays <= 0) return endDate;

  // We consider the startDate as day 1
  let current = new Date(startDate);
  
  while (daysAdded < workingDays - 1) {
    current.setDate(current.getDate() + 1);
    const dayOfWeek = current.getDay();
    // 0 is Sunday, 6 is Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      daysAdded++;
    }
  }
  
  return current;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
