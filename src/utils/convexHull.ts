export const computeConvexHull = (
  points: google.maps.LatLngLiteral[],
): google.maps.LatLngLiteral[] => {
  if (points.length <= 3) {
    return points;
  }

  const sortedPoints = points.sort((a, b) => a.lat - b.lat || a.lng - b.lng);

  const getNextPointIndex = (current: number): number => {
    let next = (current + 1) % points.length;
    for (let i = 0; i < points.length; i++) {
      if (
        orientation(
          sortedPoints[current],
          sortedPoints[i],
          sortedPoints[next],
        ) === 2
      ) {
        next = i;
      }
    }
    return next;
  };

  const hull: google.maps.LatLngLiteral[] = [];
  let currentPoint = 0;
  do {
    hull.push(sortedPoints[currentPoint]);
    currentPoint = getNextPointIndex(currentPoint);
  } while (currentPoint !== 0);

  return hull;
};

function orientation(
  p: google.maps.LatLngLiteral,
  q: google.maps.LatLngLiteral,
  r: google.maps.LatLngLiteral,
): number {
  const val =
    (q.lng - p.lng) * (r.lat - q.lat) - (q.lat - p.lat) * (r.lng - q.lng);
  if (val === 0) {
    return 0; // colinear
  }
  return val > 0 ? 1 : 2; // clock or counterclock wise
}
