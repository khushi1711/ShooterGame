const checkCollision = (rect1, rect2) => {
  if (
    rect1.positionX < rect2.positionX + rect2.width &&
    rect1.positionX + rect1.width > rect2.positionX &&
    rect1.positionY < rect2.positionY + rect2.height &&
    rect1.positionY + rect1.height > rect2.positionY
  )
    return true;

  return false;
};

export default checkCollision;
