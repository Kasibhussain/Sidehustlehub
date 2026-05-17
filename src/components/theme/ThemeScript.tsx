import { THEME_COLOR, THEME_STORAGE_KEY } from "@/lib/theme";

/** Runs before paint to avoid a flash of the wrong theme. */
export function ThemeScript() {
  const script = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=t==="dark"?"dark":"light";document.documentElement.setAttribute("data-theme",d);var c=d==="dark"?${JSON.stringify(THEME_COLOR.dark)}:${JSON.stringify(THEME_COLOR.light)};var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
