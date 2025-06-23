function getBadge(points) {
  if (points >= 2500) return "Gold";
  if (points >= 1000) return "Silver";
  return "Bronze";
}

module.exports = getBadge;
