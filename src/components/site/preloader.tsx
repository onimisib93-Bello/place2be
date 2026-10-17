/**
 * First-visit preloader. Pure CSS (no JS wait), skipped for the rest of the session
 * by an inline script in <head> that sets `html.no-preloader`.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <span className="display preloader-word">
          {"Place2Be".split("").map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.05 + i * 0.035}s` }} className={c === "2" ? "italic text-gold" : undefined}>
              {c}
            </span>
          ))}
        </span>
        <span className="preloader-line" />
      </div>
    </div>
  );
}

export const preloaderScript = `try{if(sessionStorage.getItem('p2b-seen')){document.documentElement.classList.add('no-preloader')}else{sessionStorage.setItem('p2b-seen','1')}}catch(e){}`;
