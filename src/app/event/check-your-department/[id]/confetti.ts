import confetti from "canvas-confetti";

export const showConfetti = () => {
  const colors = ["#ffffff", "#1779C1", "#1779C1"];
  confetti({
    particleCount: 200,
    spread: 100,
    startVelocity: 60,
    colors,
    gravity: 0.6,
    ticks: 500,
    origin: {
      x: 0.5,
      y: 1,
    },
  });
  confetti({
    particleCount: 100,
    spread: 80,
    angle: 60,
    gravity: 0.7,
    ticks: 500,
    colors,
    origin: {
      x: 0,
      y: 0.6,
    },
  });
  confetti({
    particleCount: 100,
    spread: 80,
    angle: 120,
    colors,
    gravity: 0.7,
    ticks: 500,
    origin: {
      x: 1,
      y: 0.6,
    },
  });
};
