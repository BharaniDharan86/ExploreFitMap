export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos.coords);
        },
        (err) => {
          reject(err.message);
        }
      );
    }
  });
}
