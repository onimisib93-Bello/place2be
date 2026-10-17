/** Motion tokens shared across the site. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  micro: 0.2,
  base: 0.6,
  reveal: 0.9,
  page: 0.7,
};

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
};
