import React, { useState } from 'react';

function SensorData() {
  const [location, setLocation] = useState(null);
  const [orientation, setOrientation] = useState(null);
  const [motion, setMotion] = useState(null);
  const [compassHeading, setCompassHeading] = useState(null);
  const [error, setError] = useState(null);

  const requestPermissions = () => {
    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: parseFloat(position.coords.latitude.toFixed(2)),
          lng: parseFloat(position.coords.longitude.toFixed(2)),
        });
      }, (err) => {
        setError(`Location Error: ${err.message}`);
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    // Device Orientation
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          } else {
            setError('DeviceOrientationEvent permission not granted');
          }
        })
        .catch(err => {
          setError(`Orientation Error: ${err.message}`);
        });
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    // Device Motion
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          } else {
            setError('DeviceMotionEvent permission not granted');
          }
        })
        .catch(err => {
          setError(`Motion Error: ${err.message}`);
        });
    } else {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }
  };

  const handleDeviceOrientation = (event) => {
    setOrientation({
      alpha: parseFloat(event.alpha.toFixed(2)),
      beta: parseFloat(event.beta.toFixed(2)),
      gamma: parseFloat(event.gamma.toFixed(2)),
    });
    if (event.webkitCompassHeading) {
      setCompassHeading(parseFloat(event.webkitCompassHeading.toFixed(2))); // For iOS devices
    }
  };

  const handleDeviceMotion = (event) => {
    setMotion({
      acceleration: {
        x: parseFloat(event.acceleration.x.toFixed(2)),
        y: parseFloat(event.acceleration.y.toFixed(2)),
        z: parseFloat(event.acceleration.z.toFixed(2))
      },
      accelerationIncludingGravity: {
        x: parseFloat(event.accelerationIncludingGravity.x.toFixed(2)),
        y: parseFloat(event.accelerationIncludingGravity.y.toFixed(2)),
        z: parseFloat(event.accelerationIncludingGravity.z.toFixed(2))
      },
      rotationRate: {
        alpha: parseFloat(event.rotationRate.alpha.toFixed(2)),
        beta: parseFloat(event.rotationRate.beta.toFixed(2)),
        gamma: parseFloat(event.rotationRate.gamma.toFixed(2))
      },
      interval: parseFloat(event.interval.toFixed(2))
    });
  };

  return (
    <div>
      <p>Location: {location ? `Lat: ${location.lat}, Lng: ${location.lng}` : 'Not available'}</p>
      <p>Orientation: {orientation ? `Alpha: ${orientation.alpha}, Beta: ${orientation.beta}, Gamma: ${orientation.gamma}` : 'Not available'}</p>
      <p>Compass Heading: {compassHeading ? `${compassHeading}°` : 'Not available'}</p>
      <p>Motion: {motion ? `Acceleration: ${JSON.stringify(motion.acceleration)}, Rotation Rate: ${JSON.stringify(motion.rotationRate)}` : 'Not available'}</p>
      {error && <p>Error: {error}</p>}
      <button onClick={requestPermissions}>Request Permissions</button>
      <p>If permissions are not granted, please go to iPhone Settings > Safari > Privacy & Security to enable them.</p>
    </div>
  );
}

export default SensorData;
