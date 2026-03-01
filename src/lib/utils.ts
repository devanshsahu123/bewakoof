/** Merge class names, filtering out falsy values */
export function cn(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
}

/** Format a date string to a human-readable form */
export function formatDate(
    date: string | Date,
    locale = "en-IN",
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }
): string {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

/** Format a number as Indian Rupee currency */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

/** Debounce a function call */
export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

/** Truncate long strings */
export function truncate(text: string, maxLength: number): string {
    return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}
