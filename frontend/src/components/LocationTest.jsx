// // // import React, { useState } from 'react';

// // // export const LocationTest = () => {
// // //   const [location, setLocation] = useState(null);
// // //   const [error, setError] = useState(null);

// // //   const getLocation = () => {
// // //     if (navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         (position) => {
// // //           setLocation({
// // //             latitude: position.coords.latitude,
// // //             longitude: position.coords.longitude
// // //           });
// // //         },
// // //         (error) => {
// // //           setError(error.message);
// // //         }
// // //       );
// // //     } else {
// // //       setError("Geolocation is not supported by your browser.");
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div>LocationTest</div>
// // //       <div>
// // //         <button onClick={getLocation}>Get Location</button>
// // //         {location ? (
// // //           <div>
// // //             <p>Latitude: {location.latitude}</p>
// // //             <p>Longitude: {location.longitude}</p>
// // //           </div>
// // //         ) : error ? (
// // //           <p>Error: {error}</p>
// // //         ) : (
// // //           <p>Click the button to get your location.</p>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // import React, { useState, useEffect } from 'react';

// // export const LocationTest = () => {
// //   const [location, setLocation] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [address, setAddress] = useState(null);

// //   const getLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           setLocation({
// //             latitude: position.coords.latitude,
// //             longitude: position.coords.longitude
// //           });
// //         },
// //         (error) => {
// //           setError(error.message);
// //         }
// //       );
// //     } else {
// //       setError("Geolocation is not supported by your browser.");
// //     }
// //   };

// //   const getFormattedAddress = async (latitude, longitude) => {
// //     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18`;

// //     try {
// //       const response = await fetch(url);
// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }
// //       const data = await response.json();
// //       setAddress(data.display_name);
// //     } catch (error) {
// //       console.error('There was a problem with your fetch operation:', error);
// //       setAddress("Error: Unable to retrieve address.");
// //     }
// //   };

// //   useEffect(() => {
// //     if (location) {
// //       getFormattedAddress(location.latitude, location.longitude);
// //     }
// //   }, [location]);

// //   return (
// //     <>
// //       <div>LocationTest</div>
// //       <div>
// //         <button onClick={getLocation}>Get Location</button>
// //         {location ? (
// //           <div>
// //             <p>Latitude: {location.latitude}</p>
// //             <p>Longitude: {location.longitude}</p>
// //             {address && <p>Address: {address}</p>}
// //           </div>
// //         ) : error ? (
// //           <p>Error: {error}</p>
// //         ) : (
// //           <p>Click the button to get your location.</p>
// //         )}
// //       </div>
// //     </>
// //   );
// // };


// function getFormattedAddress(latitude, longitude) {
//   const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

//   return fetch(url)
//       .then(response => {
//           if (!response.ok) {
//               throw new Error('Network response was not ok');
//           }
//           return response.json();
//       })
//       .then(data => {
//           return data.display_name;
//       })
//       .catch(error => {
//           console.error('There was a problem with your fetch operation:', error);
//           return "Error: Unable to retrieve address.";
//       });
// }

// // Example usage:
// const latitude = 22.991857417451424;
// const longitude = 72.51667896775913;

// getFormattedAddress(latitude, longitude)
//   .then(address => {
//       console.log("Address:", address);
//   });


// import React from 'react'

// export const LocationTest = () => {
//   const getLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log(position)
//     })
//   }
// return (
//   <div>
//     <br /><br /><br /><br />

//     <div className="form-group">
//       <button type="button" className="btn btn-primary btn-block bold" onClick={getLocation()}> get location </button>
//     </div>
//   </div>
// )
// }

// import React from 'react';

// export const LocationTest = () => {
//   const getLocation = () => {
//     // navigator.geolocation.getCurrentPosition(
//     //   (position) => {
//     //     console.log(position);
//     //   },
//     //   (error) => {
//     //     console.error(error);
//     //   },
//     //   {
//     //     enableHighAccuracy: true,
//     //     timeout: 5000,
//     //     maximumAge: 0
//     //   }
//     // );
//     fetch('https://ipinfo.io/json?token=f23e46fd66d05d')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error fetching IP geolocation:', error);
//   });

//   };

//   return (
//     <div>
//       <br /><br /><br /><br />
//       <div className="form-group">
//         <button type="button" className="btn btn-primary btn-block bold" onClick={getLocation}>
//           Get Location
//         </button>
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react';

export const LocationTest = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
      console.log('Latitude:', latitude, 'Longitude:', longitude);
    };

    const error = (err) => {
      console.error(`ERROR(${err.code}): ${err.message}`);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,  // Wait for 10 seconds
      maximumAge: 0    // Do not use cached position
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div>
      <br /><br /><br /><br />
      <div className="form-group">
        <button type="button" className="btn btn-primary btn-block bold" onClick={getLocation}>
          Get Location
        </button>
      </div>
      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};




