// PolarSphere Station Data Repository
// India's High-Latitude Polar & High-Altitude Research Bastions

export const STATIONS = [
  {
    id: 'bharati',
    name: 'Bharati Research Station',
    shortName: 'Bharati',
    code: 'BHT-ANT',
    region: 'Antarctica',
    location: 'Larsemann Hills, East Antarctica',
    coordinates: '69°24′28″S, 76°11′14″E',
    lat: -69.4078,
    lng: 76.1872,
    establishedYear: 2012,
    altitude: '35 m',
    status: 'ACTIVE_OBSERVING',
    statusBadge: 'ONLINE // OPTIMAL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd2fXI8Vz93HW704wXmnD8GyuW_Z63GP35Kf7NhpcOIlQCFPsKbqfdLTaux7n9ods3WGg4KUPUi7TO_QxXpVKGzBcYXIvLVDsMqBf7NcCgE2HlSfIK71kqz3W_tTc-yCO5IOiA11Ju243NFD-rHWVgZhp_g3aMReqh2NekjJD9-GmHo9QOJgTGyL0mmhCbvWogwqko1BdDy79tX2gzJZI25IhpxtrgKkzRbNbHPIPY4AEL8AAbGpn6WQ',
    description: 'India’s third Antarctic research facility and one of the world’s most advanced modular green stations. Constructed on stilts to minimize snow drifting and environmental footprint, Bharati facilitates year-round multi-disciplinary research in atmospheric physics, oceanography, geomagnetism, and continental break-up geology.',
    personnel: {
      winter: 24,
      summer: 47,
      current: 24,
      leader: 'Dr. Vivek Kumar (NCPOR)'
    },
    liveWeather: {
      temp: -14.2,
      tempUnit: '°C',
      windSpeed: 28,
      windUnit: 'kt',
      windDirection: 'ESE (115°)',
      windChill: -26.8,
      pressure: 988.4,
      pressureTrend: 'Falling (-1.2 hPa/3h)',
      humidity: 58,
      solarRadiation: '342 W/m²',
      uvIndex: 2.1,
      visibility: '> 25 km'
    },
    diagnostics: {
      powerLoad: '64% (210 kW)',
      powerSource: 'Combined Heat & Power Cogeneration + Solar PV',
      fuelReserveDays: 320,
      satelliteUplink: '98.4% (100 Mbps Low-Latency)',
      waterRecycling: '92% Closed Loop',
      structuralHealth: 'Nominal // Zero Permafrost Shift'
    },
    scientificDisciplines: [
      'Atmospheric Physics & Space Weather',
      'Marine Biogeochemistry & Southern Ocean Dynamics',
      'Gondwana Paleogeology & Crustal Evolution',
      'Glaciology & Ice-Sheet Mass Balance',
      'Satellite Telemetry & Earth Observation (ISRO Ground Station)'
    ],
    facilities: [
      'Clean Analytical Class-1000 Chemistry Lab',
      'High-Speed Satellite Ground Receiving Station (ISRO/NRSC)',
      'Sub-Zero Biological Sample Preservation Vault (-80°C)',
      'Acoustic Doppler Current Profiler (ADCP) Mooring Interface',
      'Continuous Global Navigation Satellite System (GNSS) Receiver'
    ]
  },
  {
    id: 'maitri',
    name: 'Maitri Antarctic Station',
    shortName: 'Maitri',
    code: 'MTR-ANT',
    region: 'Antarctica',
    location: 'Schirmacher Oasis, Queen Maud Land',
    coordinates: '70°45′57″S, 11°44′09″E',
    lat: -70.7658,
    lng: 11.7358,
    establishedYear: 1989,
    altitude: '117 m',
    status: 'ACTIVE_OBSERVING',
    statusBadge: 'ONLINE // OPTIMAL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3asl-gPcTW4ZwmI3BNQUWQw5sMLiEIYS3atd3am-xY_Xv-RXXLfCVz5CJTwdsQQBzEAF7oqQGHmm2Rrm0Jl1_kZ-Ug_0yXF5Sk_IkVP-Zfxj07u9KE3KUaQSaWtGfHW5b9Tdy573wneul7cFLOIDn2ao_vRY9Eh9Ab-HAyrm0JFQ5y4etwFbcgRIOpbMlBMvdL0_nzvML7DCqpLmT5NHfcK8GydTFr2oA9AtpJrL3gSVfvLZ7YDoi6w',
    description: 'India’s veteran permanent Antarctic base situated in the ice-free rocky oasis of Schirmacher Oasis beside Lake Priyadarshini. Operating continuously since 1989, Maitri is the cornerstone of India’s long-term environmental monitoring, paleoclimate lake sediment coring, and geomagnetism observation programs.',
    personnel: {
      winter: 25,
      summer: 65,
      current: 25,
      leader: 'Shri Anand Sengupta (IIG/NCPOR)'
    },
    liveWeather: {
      temp: -18.6,
      tempUnit: '°C',
      windSpeed: 14,
      windUnit: 'kt',
      windDirection: 'SE (135°)',
      windChill: -29.4,
      pressure: 994.2,
      pressureTrend: 'Steady (+0.3 hPa/3h)',
      humidity: 46,
      solarRadiation: '280 W/m²',
      uvIndex: 1.8,
      visibility: '35 km (Clear)'
    },
    diagnostics: {
      powerLoad: '72% (185 kW)',
      powerSource: 'Tri-Diesel Microgrid + Thermal Heat Recovery',
      fuelReserveDays: 285,
      satelliteUplink: '96.8% (Dual Geostationary Uplink)',
      waterRecycling: 'Lake Priyadarshini Potable Pump Cycle',
      structuralHealth: 'Undergoing Scheduled Modernization (Maitri-II Transition)'
    },
    scientificDisciplines: [
      'Geomagnetism & Upper Atmospheric Coupling (IIG)',
      'Meteorological Radiosonde Soundings (IMD)',
      'Lake Limnology & Micro-Invertebrate Extremophile Ecology',
      'Solid Earth Geophysics & Seismology (NGRI)',
      'Polar Medicine & Human Circadian Physiology'
    ],
    facilities: [
      'Digital Ionosonde & 30 MHz Riometer Array',
      'Broadband Seismological Observatory',
      'Lake Priyadarshini Environmental Quality Monitoring Shed',
      'Automated Weather Observation Station (AWOS)',
      'Polar Medicine & Telemedicine Consultation Suite'
    ]
  },
  {
    id: 'himadri',
    name: 'Himadri Arctic Research Base',
    shortName: 'Himadri',
    code: 'HMD-ARC',
    region: 'Arctic',
    location: 'Ny-Ålesund, Spitsbergen, Svalbard, Norway',
    coordinates: '78°55′N, 11°56′E',
    lat: 78.9167,
    lng: 11.9333,
    establishedYear: 2008,
    altitude: '10 m',
    status: 'ACTIVE_OBSERVING',
    statusBadge: 'ONLINE // OBSERVING',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK_sPFPQXSGhwpXdoceluCk2wRpC50uUvDDHDvLI5P0tNkimifL-POjqBkwT4Gs4LLcW2UlGmazOrtEprL1yfKNAb07lxXb4XFuGG_tzXlMyf3lx1vnHhYsHBHEnoDxp6fnNgMPN3A3deCbKzN4-IYjX70tbRX25L6kjjRXY2Cw2vOF9ctQ3DYz7xMj6fu4tRFTBFh138SoexMNvfry68eybqgLDQ0hp4yUFUnzpbtBZSpGhqZHNm6tA',
    description: 'India’s dedicated Arctic research station located at the world’s northernmost permanent civilian research settlement in Ny-Ålesund, Svalbard. Himadri investigates Arctic amplification, aerosol radiative forcing, fjord hydrography, and microbial adaptations in permafrost environments.',
    personnel: {
      winter: 4,
      summer: 18,
      current: 8,
      leader: 'Dr. K. P. Krishnan (NCPOR)'
    },
    liveWeather: {
      temp: -4.1,
      tempUnit: '°C',
      windSpeed: 9,
      windUnit: 'kt',
      windDirection: 'NE (045°)',
      windChill: -8.9,
      pressure: 1012.8,
      pressureTrend: 'Rising (+1.6 hPa/3h)',
      humidity: 79,
      solarRadiation: '110 W/m²',
      uvIndex: 0.8,
      visibility: '18 km'
    },
    diagnostics: {
      powerLoad: '48% (Kings Bay Grid Shared)',
      powerSource: 'Kings Bay Ny-Ålesund Central Infrastructure',
      fuelReserveDays: 365,
      satelliteUplink: '99.9% (Subsea Fiber Cable to Longyearbyen)',
      waterRecycling: 'Municipal Fjord Distillation',
      structuralHealth: 'Fully Certified // Kongsfjorden Laboratory Access'
    },
    scientificDisciplines: [
      'Aerosol Radiative Forcing & Black Carbon Monitoring',
      'Kongsfjorden Marine Biogeochemistry & Hydrography',
      'Arctic Microbial Ecology & Metagenomics',
      'Atmospheric Boundary Layer Physics',
      'Teleconnections between Arctic Amplification & Indian Monsoon'
    ],
    facilities: [
      'Gruvebadet Atmospheric Observatory Shared Lab',
      'Kings Bay Marine Laboratory Wet/Dry Suites',
      'IndARC Kongsfjorden Moored Subsea Oceanographic Array',
      'Optical Particle Sizer & Multi-Angle Absorption Photometer',
      'Glacier Melt Runoff Sampling Station'
    ]
  },
  {
    id: 'himansh',
    name: 'Himansh High-Altitude Station',
    shortName: 'Himansh',
    code: 'HMS-HIM',
    region: 'Himalaya',
    location: 'Sutri Dhaka, Spiti Valley, Himachal Pradesh',
    coordinates: '32°24′N, 77°37′E',
    lat: 32.4000,
    lng: 77.6167,
    establishedYear: 2016,
    altitude: '4080 m',
    status: 'ACTIVE_OBSERVING',
    statusBadge: 'ONLINE // OBSERVING',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzmH0EIu7w7OXYducsygwPpO_NevFVY0-X9gPpUcyTou-PQt968TT8AnQxXUmpf03GHFYnXQ6XO-MKiVOFZHIwgPvFRUo5BVS1PoUkBJA2UnfjrF6Qom0fkZBNHnzscgYUUZ29eeHouWme-1HRes4Z-jE-p9XNKwwnqABHIdc7wLzm1hGuTTUOZuzvV45uUACef-tW_ayXUZ2X-ngpAXEYAhFCH1YTn00dpWBG9NOme-d_TejFp7E7Ww',
    description: 'India’s remote high-altitude research station located at 4,080 meters above sea level in the Chandra Basin of the Western Himalaya. Himansh serves as India’s benchmark facility for Third Pole glaciology, quantifying glacier mass balance, snow depth, permafrost hydrology, and downstream freshwater budget.',
    personnel: {
      winter: 3,
      summer: 12,
      current: 4,
      leader: 'Dr. Parmanand Sharma (NCPOR)'
    },
    liveWeather: {
      temp: -22.4,
      tempUnit: '°C',
      windSpeed: 18,
      windUnit: 'kt',
      windDirection: 'WNW (290°)',
      windChill: -35.2,
      pressure: 618.5,
      pressureTrend: 'Falling (-0.8 hPa/3h)',
      humidity: 32,
      solarRadiation: '720 W/m² (Intense High-Altitude)',
      uvIndex: 7.4,
      visibility: '> 50 km (Crisp Mountain Air)'
    },
    diagnostics: {
      powerLoad: '82% (45 kW Hybrid)',
      powerSource: 'Solar PV Array + High-Altitude Diesel Backup',
      fuelReserveDays: 190,
      satelliteUplink: '94.2% (Dedicated VSAT Satellite Link)',
      waterRecycling: 'Glacial Melt Snowmelt Filter System',
      structuralHealth: 'Reinforced Against Avalanches & High Winds'
    },
    scientificDisciplines: [
      'Chhota Shigri & Batal Glacier Mass Balance',
      'Ground Penetrating Radar (GPR) Ice Thickness Mapping',
      'Terrestrial Laser Scanning & Drone Photogrammetry',
      'High-Altitude Hydrological Runoff Modeling',
      'Cryospheric Influence on Indian Water Security'
    ],
    facilities: [
      'Automated Weather Stations (AWS) Network across 4,000–5,600m',
      'Deep Ice Core Drilling & Storage Container',
      'High-Resolution Terrestrial LiDAR Scanning Kit',
      'Stream Gauging Flumes for Meltwater Discharge Monitoring',
      'Emergency High-Altitude Hypobaric Medical Tent'
    ]
  }
];

export const REGIONS = [
  { id: 'all', name: 'All Polar & Alpine Basins' },
  { id: 'Antarctica', name: 'Antarctica' },
  { id: 'Arctic', name: 'Arctic' },
  { id: 'Himalaya', name: 'Himalaya / Third Pole' }
];
