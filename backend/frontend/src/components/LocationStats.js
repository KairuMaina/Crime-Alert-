// locations.js
const locations = [
    { id: 1, name: "Nairobi", region: "Central" },
    { id: 2, name: "Mombasa", region: "Coast" },
    { id: 3, name: "Kisumu", region: "Western" },
    { id: 4, name: "Eldoret", region: "Rift Valley" },
    { id: 5, name: "Nakuru", region: "Rift Valley" },
    { id: 6, name: "Machakos", region: "Central" },
    { id: 7, name: "Kakamega", region: "Western" },
    { id: 8, name: "Nyeri", region: "Central" },
    // Add more locations here...
  ];
  
  export const getAllLocations = () => {
    return locations;
  };
  
  export const getLocationById = (id) => {
    return locations.find(location => location.id === id);
  };
  
  export const addLocation = (name, region) => {
    const newLocation = {
      id: locations.length + 1,
      name,
      region,
    };
    locations.push(newLocation);
    return newLocation;
  };
  
  export const getRegions = () => {
    return [...new Set(locations.map(location => location.region))];
  };
  