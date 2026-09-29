// PolarSphere Expeditions & Mission Control Data
// Featuring the 44th Indian Scientific Expedition to Antarctica (ISEA-44) and affiliated campaigns

export const ACTIVE_EXPEDITIONS = [
  {
    id: 'isea-44',
    name: '44th Indian Scientific Expedition to Antarctica (ISEA-44)',
    shortName: 'ISEA-44',
    status: 'ACTIVE // AT SEA',
    statusCategory: 'active',
    region: 'Antarctica & Southern Ocean',
    year: '2025–2026',
    vessel: 'MV Vasiliy Golovnin (Chartered Polar Vessel)',
    departurePort: 'Mormugao Port, Goa, India',
    transitPort: 'Cape Town, South Africa',
    destination: 'Larsemann Hills (Bharati) & Schirmacher Oasis (Maitri)',
    departureDate: 'Nov 18, 2025',
    etaArrival: 'Jan 06, 2026',
    currentStage: 'VOYAGE LEG 2: IN TRANSIT // ICE-EDGE REACHED',
    leader: 'Dr. Rahul Mohan (NCPOR)',
    totalPersonnel: 54,
    participatingInstitutions: ['NCPOR', 'IMD', 'IIG', 'NGRI', 'GSI', 'WIHG', 'IIT Roorkee', 'CSIR-NIO'],
    heroImage: 'https://lh3.googleusercontent.com/aida/AEtjO1V4sMITjXTVdewsx2TEN_ePgvWeHku7uOGP61QAss5beXso64Wx_VEp3bIcfivykWeLnLAH6eNLg0dv5UaTcUrUz_0yASpBW478GInqaeHEhhFfuwbgKcWPoDBdawi5N1AEfhe4WK2gDYttQmilJuRg0ltcvOdT4Tw5nMDhMaLVJGjPAN4j43t-XlCl17TYnFYDnu-sUuPbwJRA5XCHB9Sk7emxPk3P8bxBsdm28grluChy3Sn9BRq7QCeb',
    currentTelemetry: {
      lat: '62°18′42″S',
      lng: '54°32′10″E',
      course: '168° S-SE',
      speed: '11.8 knots',
      seaSurfaceTemp: '-1.4°C',
      swellHeight: '3.8 m',
      seaIceCover: '42% (Broken First-Year Pack Ice)',
      barometer: '978.2 hPa',
      airTemp: '-6.8°C'
    },
    waypoints: [
      { id: 'wp-1', name: 'Mormugao Port (Departure)', lat: 15.41, lng: 73.80, date: '18 Nov 2025', status: 'COMPLETED' },
      { id: 'wp-2', name: 'Equator Crossing (Zero Meridian)', lat: 0.0, lng: 68.5, date: '25 Nov 2025', status: 'COMPLETED' },
      { id: 'wp-3', name: 'Cape Town (Bunkering & Cargo)', lat: -33.92, lng: 18.42, date: '04 Dec 2025', status: 'COMPLETED' },
      { id: 'wp-4', name: 'Roaring Forties (40°S Transect)', lat: -42.5, lng: 32.1, date: '14 Dec 2025', status: 'COMPLETED' },
      { id: 'wp-5', name: 'Furious Fifties (Sub-Antarctic Front)', lat: -53.2, lng: 44.8, date: '21 Dec 2025', status: 'COMPLETED' },
      { id: 'wp-6', name: 'Current Coordinates (Pack Ice Edge)', lat: -62.3, lng: 54.5, date: '29 Dec 2025', status: 'CURRENT_LOC' },
      { id: 'wp-7', name: 'Prydz Bay Sea-Ice Fast Line', lat: -68.8, lng: 74.5, date: '04 Jan 2026', status: 'UPCOMING' },
      { id: 'wp-8', name: 'Bharati Anchorage (Larsemann Hills)', lat: -69.4, lng: 76.2, date: '06 Jan 2026', status: 'UPCOMING' },
      { id: 'wp-9', name: 'Maitri Relief & Resupply (India Bay)', lat: -70.0, lng: 12.0, date: '22 Jan 2026', status: 'UPCOMING' }
    ],
    leadershipTeam: [
      {
        role: 'Expedition Leader',
        name: 'Dr. Rahul Mohan',
        affiliation: 'Scientist G, National Centre for Polar and Ocean Research',
        expertise: 'Polar Micropaleontology & Ocean Climate',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1UCU5w-6NUnIH38_5oLbFQ96j7yUkf1O8kWOS-kuY6P2hP9EYyBhGrj2gj31d6z75jnqW7SWhdeEMBh9RpkGJyGVpk9D9pdBWnzEsncWWxGcSozo2IyO8FrbH5Qk5ZuRZvcqe0OiyWFdXuQ__XLr5kV3cHBWmIF9SOj-wq_xad5ae2nv-XpF6Ru9WMoIRCLZ2W0xaAM4a1O2AAm3QTcRz-SDtvTEXdcVkFd-iYXcIMEwepUCKdyoUKGBBYj'
      },
      {
        role: 'Chief Scientist',
        name: 'Dr. Shramik Patil',
        affiliation: 'Senior Scientist, Marine Geoscience NCPOR',
        expertise: 'Calcareous Nannofossils & Past Climate Reconstruction',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1XA3v-cYmjo8tJQO3Q4PHjER9bex7jdnw55009UZXnU_jyz9_moS2x874YlqBGwdjSZtyHn6Vzur7BoCrlxJQVq5qNZNwVtvFfR4MgB_7MwpYg9w6ibvF9vZneyst2Z6jv8dx-jXg1BAWDbC6caqaP6uuWXznNZ113HLNNKnbS3z3LQ698NinfDPikqxBGEtbF_uKTIeQEXsuvWKPHpT5tk_2xO5zm5v-CeHm6gVY8tVpvUPFnDOr8_nHD8'
      },
      {
        role: 'Logistics & Wintering Station Commander (Bharati)',
        name: 'Cdr. Vikrant Singh (Retd.)',
        affiliation: 'NCPOR Polar Logistics Division',
        expertise: 'High-Latitude Extreme Cold Operations',
        image: 'https://lh3.googleusercontent.com/aida/AEtjO1V4thwI4bU35B_qvWIWOvWB8c3qyjIR77Y09An0HiuiGojic2v6gEYpMxVW4g5EVEt_cHQZUzDQ44EsgfWKaJW0-r2Mdl8lwZT5gVvBIpxqxF9iGSywzVX20rg8Higpak0o65dSpmfrtmWYgLw0bgAUW9SB3u6RJ5imVdYTD1vvpZYfB8edohkPWJolWTOWi5RfE7FOuhzwH46j3vuhlKh99HfIiIKK2PUTyf4MvbWxi41R5KIsvbjdrz8z'
      }
    ],
    objectives: [
      'Relief, replenishment, and fuel resupply for the 43rd wintering teams at Bharati and Maitri stations.',
      'Deployment of deep-sea sediment multi-corers along the 50°S–65°S Southern Ocean paleoclimate transect.',
      'Validation of ISRO EOS-04 satellite radar altimetry against measured Antarctic land-fast ice thickness.',
      'Initiation of geotechnical site surveys for India’s next-generation Maitri-II sustainable research complex.',
      'Real-time atmospheric black carbon and aerosol sampling across the Antarctic divergence zone.'
    ]
  },
  {
    id: 'arctic-nyalesund-2025',
    name: 'Ny-Ålesund Marine Biogeochemistry & Kongsfjorden Runoff Campaign',
    shortName: 'Arctic Kongsfjorden 2025',
    status: 'ACTIVE // FIELD OPS',
    statusCategory: 'active',
    region: 'Arctic (Svalbard, Norway)',
    year: '2025',
    base: 'Himadri Station, Ny-Ålesund',
    vessel: 'Teisten (Kings Bay Research Launch)',
    leader: 'Dr. K. P. Krishnan',
    totalPersonnel: 12,
    participatingInstitutions: ['NCPOR', 'Goa University', 'IIT Bombay'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeLbdn55CLVetatNHCFUTfcdaXACZtthHVGUVVbeC5kgsJsA5b8LM2u8eSH48qjc8vpOKvSm51KwckUS1yXQNX-KJgJ7g4BQMtPRERcJcSukisX_q13dMVygIGywc67D_sU6MXkrEMK1ly0G0jtAUJFjYAMhbjCVd2W62Z3sC_pzB8GgDXsaKrtwSMEL1F_L6v2_ZAvEmbnMuzaCp8xE3BYuEox0ZoBoyCac1fkrGeAkxvks6FKlBbsg',
    currentTelemetry: {
      lat: '78°56′12″N',
      lng: '11°53′40″E',
      airTemp: '-4.1°C',
      salinity: '34.2 PSU',
      waterDepth: '128 m',
      ctdCasts: '48 / 60 Completed'
    },
    objectives: [
      'High-resolution CTD profiling across the glacier-fed Kronebreen freshwater plume in Kongsfjorden.',
      'Recovery and annual refurbishment of IndARC subsea moored multi-sensor observatory.',
      'Continuous aerosol optical depth profiling at Gruvebadet Observatory.'
    ]
  },
  {
    id: 'southern-ocean-cruise',
    name: 'Southern Ocean Hydrographic & Paleoclimate Core Cruise (ORV Sagar Nidhi)',
    shortName: 'ORV Sagar Nidhi SO-13',
    status: 'PLANNED // LOGISTICS STAGED',
    statusCategory: 'upcoming',
    region: 'Southern Ocean (40°S to 68°S)',
    year: '2026',
    vessel: 'ORV Sagar Nidhi (MoES Ice-Class Research Vessel)',
    departurePort: 'Port Louis, Mauritius',
    destination: 'Prydz Bay Sector & Kerguelen Plateau',
    leader: 'Dr. Manish Tiwari (NCPOR)',
    totalPersonnel: 32,
    participatingInstitutions: ['NCPOR', 'CSIR-NIO', 'INCOIS', 'Banasthali Vidyapith'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDloMAEeDVAnEky3KiYbz_5XymyWRE7J4LGozsPoKjbT0_rw9MASivIJ46m3FBc9L1VHj-4_2Qw2co7gTNnWCmGFTfA7GOyjcPAvQbqUefu4lNI-JOKV_mGBOPgYUAkjKjeAOZiq-0bZFJwhSAN6WQi8xHCTEpvwyhAXPizVEHuHgUg8dwwHJJBK0pmbr--dpWXSSxwcqni_Ne-zDzmSekcWBBxtnzOy-hgnUnaplyY3zBNWup58qmclA',
    currentTelemetry: {
      lat: 'Port Louis Basin',
      lng: 'Mauritius Staging Yard',
      vesselReadiness: '95%',
      bunkering: 'Fuel & Provisioning On Schedule'
    },
    objectives: [
      'Investigate the Antarctic Circumpolar Current (ACC) heat transport and ocean stratification.',
      'Coring 15-meter piston sediment records across the Agulhas-Southern Ocean Gateway.',
      'Quantifying oceanic uptake of anthropogenic atmospheric carbon dioxide.'
    ]
  },
  {
    id: 'himalaya-chhotashigri',
    name: 'Chhota Shigri & Batal Deep GPR Mass-Balance Traverse',
    shortName: 'Himalaya Chandra Basin Traverse',
    status: 'COMPLETED // DATA PROCESSING',
    statusCategory: 'completed',
    region: 'Western Himalaya (Himachal Pradesh)',
    year: '2025',
    base: 'Himansh Station (4080m ASL)',
    leader: 'Dr. Parmanand Sharma',
    totalPersonnel: 14,
    participatingInstitutions: ['NCPOR', 'JNU', 'Wadia Institute of Himalayan Geology'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa_ejpjPbo9oQR_pqtwTkmbBKgMsP4LiP91D_rMvSB_KvoSr7lIUqoMDEWdWjMVkqMSZJpICPNcH3nivO_dO9I38oaWZY_2LfybfFaRLC46AAOLfQJXWjoIOoU9tE9DzF_s_G4yl8vrdSfsGagjOAVAcMglvP82n1mEIovblh1ZpdY4Dad-4QesHjGm9vgCioBMhs7tTTU7Pmiz7xZQXMWdzASexorMEcF5WNT9r57pHdSUva5ylXC1Q',
    currentTelemetry: {
      elevation: '4,080m – 5,600m',
      snowAccumulation: '1.42m w.e.',
      glacierEquilibriumLine: '5,020m ASL',
      status: 'Annual Benchmark Stake Network Measured'
    },
    objectives: [
      'Measurement of 28 ablation/accumulation stakes across Chhota Shigri Glacier.',
      '50 MHz Ground Penetrating Radar (GPR) bed topography profiles.',
      'Deployment of autonomous cryogenic stream discharge monitoring flumes.'
    ]
  }
];

export const FIELD_DISPATCHES = [
  {
    id: 'disp-01',
    expeditionId: 'isea-44',
    timestamp: '29 Dec 2025 // 16:45 UTC',
    location: '62°18′S, 54°32′E (Antarctic Convergence)',
    author: 'Dr. Rahul Mohan (Voyage Leader)',
    title: 'First Heavy Pack Ice Encounter & Katabatic Front Entry',
    body: 'The vessel entered the marginal ice zone at 14:20 UTC. Icebreaker escort procedures initiated as pack ice density increased to 4–5 octas. Air temperature dropped sharply to -6.8°C with wind gusts touching 34 knots. The marine physics team commenced underway radiometer soundings.',
    tags: ['NAVIGATION', 'SEA_ICE', 'KATABATIC']
  },
  {
    id: 'disp-02',
    expeditionId: 'isea-44',
    timestamp: '24 Dec 2025 // 09:30 UTC',
    location: '55°02′S, 48°15′E (Furious Fifties Transect)',
    author: 'Dr. Shramik Patil (Chief Scientist)',
    title: 'Deep Multi-Corer Recovery at Station SO-08 (3,840m Depth)',
    body: 'Successfully retrieved 12 undisturbed sediment tubes from 3,840 meters depth. Preliminary smear-slide examination indicates rich biosiliceous diatom blooms interspersed with volcanic ash horizons, promising high-resolution paleoclimatic records of the Holocene optimum.',
    tags: ['SCIENCE', 'SEDIMENT_CORING', 'PALEOCLIMATE']
  },
  {
    id: 'disp-03',
    expeditionId: 'isea-44',
    timestamp: '15 Dec 2025 // 19:15 UTC',
    location: '41°40′S, 33°20′E (Roaring Forties)',
    author: 'Cdr. Vikrant Singh (Logistics Lead)',
    title: 'Cargo Lashing Inspection in Heavy Swell Conditions',
    body: 'Sustained 4.5m beam sea swells negotiated through the 40°S corridor. All containerized fuel pods, snow-vehicles (PistenBullys), and scientific module containers secured and passed safety audit. Personnel acclimatization drills progressing nominally.',
    tags: ['LOGISTICS', 'MARITIME_SAFETY', 'SWELL']
  },
  {
    id: 'disp-04',
    expeditionId: 'arctic-nyalesund-2025',
    timestamp: '12 Dec 2025 // 11:20 UTC',
    location: 'Kongsfjorden Fjord Mooring site (78°57′N)',
    author: 'Dr. K. P. Krishnan',
    title: 'IndARC Subsea Mooring Telemetry Ping Verified',
    body: 'Acoustic release interrogation confirmed that IndARC array sensors at 60m, 100m, and 150m depth are recording ambient salinity, turbidity, and current velocity in Kongsfjorden without drift. Data transfer staged for summer recovery.',
    tags: ['ARCTIC', 'INDARC', 'MOORING']
  }
];
