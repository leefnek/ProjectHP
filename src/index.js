const TOTAL_STEP = 5;

const { getStep, addStep } = (() => {
  let step = 0;
  const getStep = () => step;
  const addStep = () => {
    step = ++step % TOTAL_STEP;
  };

  return { getStep, addStep };
})();

const { getTarget, getIsTargetClickable } = (() => {
  const target = {
    x: 0,
    y: 0,
  };
  let isTargetClickable = false;

  const getTarget = () => target;
  const setTargetPos = (x, y) => {
    target.x = x;
    target.y = y;
  };
  const getIsTargetClickable = () => isTargetClickable;
  return { getTarget, setTargetPos, getIsTargetClickable };
})();
