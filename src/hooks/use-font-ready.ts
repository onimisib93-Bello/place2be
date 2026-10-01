"use client";

import { useEffect, useState } from "react";

/** Resolves true once `font` (a CSS font shorthand, e.g. `900 100px "Bodoni Moda"`) is loaded, or after a timeout. */
export function useFontReady(font: string, timeout = 2200) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };
    const t = window.setTimeout(finish, timeout);
    document.fonts.load(font).then(finish, finish);
    return () => {
      done = true;
      window.clearTimeout(t);
    };
  }, [font, timeout]);
  return ready;
}
