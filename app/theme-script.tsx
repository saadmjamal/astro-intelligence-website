export function ThemeScript() {
  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const activeTheme = theme || systemTheme;
      
      if (activeTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />;
}
