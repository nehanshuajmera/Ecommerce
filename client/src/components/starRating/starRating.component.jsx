import { useId } from 'react';
const starPath = `M12 2.2l2.6 5.6 6.2.9-4.5 4.3 1.1 6.1L12 16.1l-5.4 3 1.1-6.1L3.2 8.7l6.2-.9z`;

const StarIcon = ({ fillId, glowId, topId, strokeColor }) => (
  <svg
    viewBox='0 0 24 24'
    width='100%'
    height='100%'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id={fillId} x1='0' y1='0' x2='1' y2='0'>
        {/* fill stop set by parent */}
      </linearGradient>
      <linearGradient id={topId} x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stopColor='rgba(255,255,255,0.32)' />
        <stop offset='55%' stopColor='rgba(255,255,255,0)' />
        <stop offset='100%' stopColor='rgba(0,0,0,0.18)' />
      </linearGradient>
      <radialGradient id={glowId} cx='42%' cy='35%' r='58%'>
        <stop offset='0%' stopColor='rgba(255,255,255,0.45)' />
        <stop offset='100%' stopColor='rgba(0,0,0,0)' />
      </radialGradient>
    </defs>
    <path
      d={starPath}
      fill={`url(#${fillId})`}
      stroke={strokeColor}
      strokeWidth='0.8'
      strokeLinejoin='round'
    />
    <path d={starPath} fill={`url(#${glowId})`} stroke='none' />
    <path d={starPath} fill={`url(#${topId})`} stroke='none' />
  </svg>
);

export const StarRating = ({ rating, size = 22, max = 5 }) => {
  const uid = useId();

  const stars = Array.from({ length: max }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1);
    return {
      fillId: `${uid}-fill-${i}`,
      glowId: `${uid}-glow-${i}`,
      topId: `${uid}-top-${i}`,
      fill,
      strokeColor: fill > 0 ? '#C87D00' : '#BBBBBB',
    };
  });

  return (
    <div
      style={{ display: 'inline-flex', gap: 3 }}
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {/* SVG defs must be in the DOM — one hidden SVG holds all gradients */}
      <svg width='0' height='0' style={{ position: 'absolute' }}>
        <defs>
          {stars.map((s) => (
            <linearGradient
              key={s.fillId}
              id={s.fillId}
              x1='0'
              y1='0'
              x2='1'
              y2='0'
            >
              <stop offset={`${s.fill * 100}%`} stopColor='#FFB800' />
              <stop offset={`${s.fill * 100}%`} stopColor='#D8D8D8' />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {stars.map((s, i) => (
        <span key={i} style={{ width: size, height: size, display: 'block' }}>
          <StarIcon
            fillId={s.fillId}
            glowId={s.glowId}
            topId={s.topId}
            strokeColor={s.strokeColor}
          />
        </span>
      ))}
    </div>
  );
};
