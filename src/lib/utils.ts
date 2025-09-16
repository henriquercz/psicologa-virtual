import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export function formatTime(date: Date | string): string {
  // Converte string para Date se necessário
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Verifica se a data é válida
  if (!dateObj || isNaN(dateObj.getTime())) {
    return '--:--'
  }
  
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}

export function getDayKey(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}
