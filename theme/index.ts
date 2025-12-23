export const themeColors = {
    text: '#1f2937',
    bgColor: (opacity: number) => `rgba(249, 115, 22, ${opacity})`,
}

export const lightTheme = {
    dark: false,
    colors: {
        background: '#ffffff',
        surface: '#ffffff',
        surfaceHighlight: '#f3f4f6',
        text: '#1f2937',
        textSecondary: '#6b7280',
        primary: '#f97316',
        border: '#e5e7eb',
        input: '#f3f4f6',
        error: '#ef4444',
        success: '#22c55e',
        overlay: 'rgba(0,0,0,0.5)',
    }
}

export const darkTheme = {
    dark: true,
    colors: {
        background: '#111827',
        surface: '#1f2937',
        surfaceHighlight: '#374151',
        text: '#f9fafb',
        textSecondary: '#9ca3af',
        primary: '#f97316', // Keep brand color same or adjust slightly
        border: '#374151',
        input: '#374151',
        error: '#ef4444',
        success: '#22c55e',
        overlay: 'rgba(0,0,0,0.7)',
    }
}

export type Theme = typeof lightTheme;
