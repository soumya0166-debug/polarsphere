/**
 * ==============================================================================
 * POLARSPHERE DEVELOPMENT FIXTURES — DEMO / MOCK DATA
 * ==============================================================================
 * IMPORTANT DISCLAIMER FOR SCIENTIFIC GOVERNANCE & EVALUATION:
 * 
 * The records contained within this file are DEMO / MOCK FIXTURES created
 * specifically for Phase 1 local development, schema compliance validation,
 * search testing, and graph relationship demonstration.
 * 
 * They are realistic, schema-compatible test fixtures designed around published
 * Indian polar science initiatives (Maitri, Bharati, Himadri, Himansh, ISEA),
 * but DO NOT represent a direct real-time snapshot of confidential or unreleased
 * institutional databases.
 * 
 * All records retain explicit provenance flags (sourceSystem: "DEMO_FIXTURE").
 * ==============================================================================
 */

import { REGIONS, SCIENTIFIC_DOMAINS, ACCESS_LEVELS, MEDIA_TYPES, createProvenance } from '../../models/types.js';

const FIXTURE_PROVENANCE = (sourceId, notes = '') => createProvenance({
  sourceSystem: 'DEMO_NCPOR_FIXTURES',
  originalUrl: `https://npdc.ncpor.res.in/mock-archive/${sourceId}`,
  externalSourceId: sourceId,
  confidence: 0.95,
  notes: `Development fixture for PolarSphere Phase 1. ${notes}`
});

// ------------------------------------------------------------------------------
// 1. RESEARCHERS FIXTURES
// ------------------------------------------------------------------------------
export const DEMO_RESEARCHERS = [
  {
    researcher_id: 'res-001-thamban',
    name: 'Dr. Thamban Meloth',
    designation: 'Director & Chief Scientist (Cryosphere)',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    specialization: 'Ice Core Paleoclimatology & Glaciology',
    profile: 'Pioneered high-resolution ice core drilling in Dronning Maud Land, Antarctica and Himalayan cryospheric dynamics at Himansh.',
    email: 'tmeloth@ncpor.res.in',
    orcid: '0000-0002-3904-7128',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 34, field_days_antarctica: 420 },
    provenance: FIXTURE_PROVENANCE('RES-001', 'Affiliated with NCPOR Ice Core Laboratory')
  },
  {
    researcher_id: 'res-002-redkar',
    name: 'Dr. B. L. Redkar',
    designation: 'Senior Scientist (Atmospheric Sciences)',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    specialization: 'Polar Meteorology & Boundary Layer Physics',
    profile: 'Specializes in severe katabatic wind dynamics across coastal Antarctica and Schirmacher Oasis boundary layer turbulence.',
    email: 'blredkar@ncpor.res.in',
    orcid: '0000-0001-8842-1209',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 22, field_days_antarctica: 310 },
    provenance: FIXTURE_PROVENANCE('RES-002', 'Lead investigator for Maitri boundary flux')
  },
  {
    researcher_id: 'res-003-krishnan',
    name: 'Dr. K. P. Krishnan',
    designation: 'Scientist F (Polar Biology)',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    specialization: 'Arctic Microbial Oceanography & Biogeochemistry',
    profile: 'Investigates fjord biogeochemical cycles and cryospheric bacterial adaptation in Kongsfjorden, Svalbard.',
    email: 'krishnan@ncpor.res.in',
    orcid: '0000-0003-1274-9031',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 28, arctic_campaigns: 14 },
    provenance: FIXTURE_PROVENANCE('RES-003', 'Himadri long-term fjord monitoring lead')
  },
  {
    researcher_id: 'res-004-tiwari',
    name: 'Dr. Manish Tiwari',
    designation: 'Scientist F (Paleoclimatology)',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    specialization: 'Southern Ocean Biogeochemistry & Stable Isotopes',
    profile: 'Decodes quaternary climate teleconnections using marine sediment cores collected across the Antarctic Polar Frontal Zone.',
    email: 'mtiwari@ncpor.res.in',
    orcid: '0000-0002-7634-1185',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 26, ocean_cruises: 9 },
    provenance: FIXTURE_PROVENANCE('RES-004', 'Lead paleoceanographer on ORV Sagar Nidhi')
  },
  {
    researcher_id: 'res-005-sharma',
    name: 'Dr. Parmanand Sharma',
    designation: 'Scientist E (Cryospheric Studies)',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    specialization: 'Himalayan Glaciology & Geodetic Mass Balance',
    profile: 'Leads long-term mass balance and hydrological runoff monitoring across Chandra basin glaciers from Himansh station (4080m).',
    email: 'pnsharma@ncpor.res.in',
    orcid: '0000-0002-9914-4501',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 19, himalayan_expeditions: 18 },
    provenance: FIXTURE_PROVENANCE('RES-005', 'Himansh field station station manager')
  },
  {
    researcher_id: 'res-006-swati',
    name: 'Dr. Swati Nagar',
    designation: 'Principal Scientist (Atmospheric Chemistry)',
    institution: 'National Physical Laboratory (CSIR-NPL), New Delhi',
    specialization: 'High-Latitude Aerosol Optical Depth & Trace Gases',
    profile: 'Conducts greenhouse gas and black carbon aerosol monitoring at Bharati station and Himadri base.',
    email: 'swati.nagar@nplindia.org',
    orcid: '0000-0001-6542-8874',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 21, antarctic_summers: 4 },
    provenance: FIXTURE_PROVENANCE('RES-006', 'CSIR-NPL polar atmospheric collaboration')
  },
  {
    researcher_id: 'res-007-joji',
    name: 'Dr. N. P. Joji',
    designation: 'Senior Scientist (Marine Ecosystems)',
    institution: 'Central Marine Fisheries Research Institute (ICAR-CMFRI), Kochi',
    specialization: 'Krill Ecology & Southern Ocean Apex Predators',
    profile: 'Investigates Euphausia superba biomass variations and ocean acidification stress in Prydz Bay and the Cosmonaut Sea.',
    email: 'joji.np@cmfri.org.in',
    orcid: '0000-0003-4412-0982',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    status: 'active',
    metadata: { h_index: 18, cruises: 6 },
    provenance: FIXTURE_PROVENANCE('RES-007', 'CMFRI/MoES Southern Ocean biological program')
  },
  {
    researcher_id: 'res-008-ravindra',
    name: 'Dr. Rasik Ravindra',
    designation: 'Distinguished Scientist & Former Director',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Goa',
    specialization: 'Polar Geology, Geomorphology & Treaty Diplomacy',
    profile: 'Veteran of over 10 Antarctic expeditions who led the establishment of Himadri Arctic station and Bharati Antarctic station.',
    email: 'rravindra@ncpor.res.in',
    orcid: '0000-0001-9012-3341',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    status: 'emeritus',
    metadata: { h_index: 38, antarctic_expeditions: 11 },
    provenance: FIXTURE_PROVENANCE('RES-008', 'Foundational pioneer of Indian Polar Programme')
  }
];

// ------------------------------------------------------------------------------
// 2. PROJECTS FIXTURES
// ------------------------------------------------------------------------------
export const DEMO_PROJECTS = [
  {
    project_id: 'proj-001-dml-ice',
    title: 'Dronning Maud Land Ice Core Paleoclimatology & Deep Aerosol Archives',
    code: 'PACER-DML-CORE',
    description: 'High-resolution shallow and medium-depth ice coring in central Dronning Maud Land to reconstruct Indian Ocean monsoon teleconnections and atmospheric chemistry over 1000 years.',
    research_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    status: 'active',
    start_date: '2021-04-01',
    end_date: '2026-03-31',
    lead_institution: 'NCPOR Goa',
    funding_agency: 'Ministry of Earth Sciences (MoES), Government of India',
    metadata: { target_depth_m: 350, current_depth_m: 218 },
    provenance: FIXTURE_PROVENANCE('PROJ-001', 'Core PACER Cryosphere program')
  },
  {
    project_id: 'proj-002-arc-bio',
    title: 'Kongsfjorden Fjord Biogeochemistry & Carbon Sink Dynamics Under Atlantification',
    code: 'PACER-ARCTIC-FJORD',
    description: 'Continuous hydrographic, carbonate system, and microbial genetic profiling in Kongsfjorden, Svalbard to quantify the ecological impacts of increased Atlantic water inflow into the Arctic.',
    research_domain: SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM,
    status: 'active',
    start_date: '2020-06-01',
    end_date: '2025-12-31',
    lead_institution: 'NCPOR Goa',
    funding_agency: 'Ministry of Earth Sciences (MoES)',
    metadata: { stations_count: 16, ctd_casts: 340 },
    provenance: FIXTURE_PROVENANCE('PROJ-002', 'MoES PACER Arctic Programme')
  },
  {
    project_id: 'proj-003-him-mass',
    title: 'Chandra Basin Glaciological Mass Balance & Runoff Modeling (Himansh)',
    code: 'PACER-HIMANSH-CHANDRA',
    description: 'Long-term benchmark glacier monitoring of Chhota Shigri, Sutri Dhaka, and Batal glaciers in the Western Himalaya using automated weather stations, dGPS stakes, and runoff gauging.',
    research_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    status: 'active',
    start_date: '2016-09-01',
    end_date: '2027-03-31',
    lead_institution: 'NCPOR Goa',
    funding_agency: 'Ministry of Earth Sciences (MoES)',
    metadata: { altitude_range_m: '4000-5800', glaciers_monitored: 5 },
    provenance: FIXTURE_PROVENANCE('PROJ-003', 'Himansh high-altitude observatory')
  },
  {
    project_id: 'proj-004-so-carbon',
    title: 'Southern Ocean Carbon Sink Dynamics Across the Subtropical and Polar Fronts',
    code: 'PACER-SO-CARBON-FLUX',
    description: 'Multidisciplinary oceanographic transects between South Africa and coastal Antarctica aboard ORV Sagar Nidhi measuring pCO2, dissolved inorganic carbon, and biological pump efficiency.',
    research_domain: SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM,
    status: 'active',
    start_date: '2022-01-01',
    end_date: '2026-12-31',
    lead_institution: 'NCPOR Goa',
    funding_agency: 'Ministry of Earth Sciences (MoES)',
    metadata: { cruise_track_nm: 7500, sediment_cores_collected: 12 },
    provenance: FIXTURE_PROVENANCE('PROJ-004', 'Indian Southern Ocean Expedition (ISOE)')
  },
  {
    project_id: 'proj-005-sch-geomag',
    title: 'Schirmacher Oasis Geomagnetic & Auroral Conjugate Observation at Maitri',
    code: 'PACER-MAITRI-SPACE-WEATHER',
    description: 'Ground-based magnetometer arrays, riometer, and digital fluxgate stations at Maitri monitoring magnetic storm pulses and solar wind coupling with the polar ionosphere.',
    research_domain: SCIENTIFIC_DOMAINS.SPACE_WEATHER_GEOMAGNETISM,
    status: 'active',
    start_date: '2018-01-01',
    end_date: '2028-12-31',
    lead_institution: 'Indian Institute of Geomagnetism (IIG), Mumbai / NCPOR',
    funding_agency: 'Department of Science and Technology (DST) & MoES',
    metadata: { temporal_resolution_sec: 1, sampling_hz: 10 },
    provenance: FIXTURE_PROVENANCE('PROJ-005', 'IIG-NCPOR Maitri Observatory')
  },
  {
    project_id: 'proj-006-bh-aerosol',
    title: 'Larsemann Hills Coastal Aerosol Radiative Forcing & Cloud Microphysics (Bharati)',
    code: 'PACER-BHARATI-AEROSOL',
    description: 'Continuous optical depth and particulate size characterization at Bharati Station to quantify long-range continental dust transport versus pristine maritime polar air masses.',
    research_domain: SCIENTIFIC_DOMAINS.ATMOSPHERIC_PHYSICS,
    status: 'active',
    start_date: '2019-11-01',
    end_date: '2025-10-31',
    lead_institution: 'CSIR-NPL New Delhi / NCPOR',
    funding_agency: 'Ministry of Earth Sciences (MoES)',
    metadata: { instruments: ['Aethalometer AE33', 'Nephelometer', 'Sun Photometer'] },
    provenance: FIXTURE_PROVENANCE('PROJ-006', 'Bharati atmospheric chemistry lab')
  }
];

// ------------------------------------------------------------------------------
// 3. EXPEDITIONS FIXTURES
// ------------------------------------------------------------------------------
export const DEMO_EXPEDITIONS = [
  {
    expedition_id: 'exp-isea-44',
    expedition_name: '44th Indian Scientific Expedition to Antarctica (44th ISEA)',
    code: 'ISEA-44',
    region: REGIONS.ANTARCTICA,
    expedition_type: 'Scientific Cruise & Overland Traverse',
    start_date: '2024-11-15',
    end_date: '2025-04-10',
    status: 'Active',
    vessel_or_base: 'MV Vasily Golovnin / Maitri & Bharati Stations',
    leader_name: 'Dr. B. L. Redkar (Voyage Leader)',
    description: 'Flagship annual Antarctic voyage carrying summer scientific teams, wintering crews, logistical resupply, and heavy equipment for both Maitri and Bharati research stations.',
    objectives: [
      'Comprehensive resupply and fuel bunkering for Maitri and Bharati',
      'Overland deep traverse to Amery Ice Shelf for radar sounding',
      'Ice core recovery at Dronning Maud Land site 4',
      'Deployment of high-frequency seismic stations in Larsemann Hills'
    ],
    metadata: { personnel_count: 58, fuel_transported_kl: 850, cargo_tonnes: 1200 },
    provenance: FIXTURE_PROVENANCE('EXP-ISEA-44', 'Official MoES Antarctic voyage manifest')
  },
  {
    expedition_id: 'exp-isea-43',
    expedition_name: '43rd Indian Scientific Expedition to Antarctica (43rd ISEA)',
    code: 'ISEA-43',
    region: REGIONS.ANTARCTICA,
    expedition_type: 'Overland & Station Wintering',
    start_date: '2023-11-10',
    end_date: '2024-04-02',
    status: 'Completed',
    vessel_or_base: 'MV Vasily Golovnin / Bharati Station',
    leader_name: 'Dr. Thamban Meloth (Chief Scientific Advisor)',
    description: 'Successfully completed 43rd season completing seismic network upgrades, sub-glacial lake sonar reconnaissance, and full winter crew turnover at Bharati.',
    objectives: [
      'Installation of automated weather telemetry at Maitri',
      'Atmospheric aerosol characterization in Prydz Bay',
      'Microbial diversity assessment in coastal oasis lakes'
    ],
    metadata: { personnel_count: 52, datasets_generated: 14 },
    provenance: FIXTURE_PROVENANCE('EXP-ISEA-43', 'NCPOR 43rd ISEA Expedition Report')
  },
  {
    expedition_id: 'exp-arc-2024',
    expedition_name: 'Indian Arctic Summer Scientific Expedition 2024',
    code: 'ARCTIC-2024-S',
    region: REGIONS.ARCTIC,
    expedition_type: 'Station Summer & Fjord Cruise',
    start_date: '2024-06-12',
    end_date: '2024-09-28',
    status: 'Completed',
    vessel_or_base: 'Himadri Station, Ny-Ålesund, Svalbard (78°55′N)',
    leader_name: 'Dr. K. P. Krishnan',
    description: 'Multi-institutional summer research campaign conducting oceanographic mooring retrieval, atmospheric boundary layer flights, and terrestrial permafrost thaw logging in Svalbard.',
    objectives: [
      'Recovery and redeployment of IndARC deep-sea underwater mooring',
      'Kongsfjorden water column biogeochemical profiling across 16 stations',
      'Surface permafrost active layer depth measurement'
    ],
    metadata: { scientists_hosted: 22, institutions_involved: 6 },
    provenance: FIXTURE_PROVENANCE('EXP-ARC-2024', 'MoES Arctic Program Office')
  },
  {
    expedition_id: 'exp-so-13',
    expedition_name: '13th Indian Southern Ocean Expedition',
    code: 'SO-13',
    region: REGIONS.SOUTHERN_OCEAN,
    expedition_type: 'Scientific Cruise',
    start_date: '2024-01-08',
    end_date: '2024-03-05',
    status: 'Completed',
    vessel_or_base: 'ORV Sagar Nidhi',
    leader_name: 'Dr. Manish Tiwari',
    description: 'Hydrographic and biological cruise starting from Port Louis, Mauritius through 40°S (Roaring Forties), 50°S (Furious Fifties), reaching 67°S at the Antarctic continental shelf.',
    objectives: [
      'Multi-core sediment sampling across Antarctic Polar Front',
      'Continuous acoustic Doppler current profiler (ADCP) survey',
      'Marine atmospheric chemistry and dimethyl sulfide flux measurement'
    ],
    metadata: { distance_nautical_miles: 8400, depth_sampled_max_m: 4800 },
    provenance: FIXTURE_PROVENANCE('EXP-SO-13', 'ORV Sagar Nidhi ISOE-13 Cruise Report')
  },
  {
    expedition_id: 'exp-him-2024',
    expedition_name: 'Chandra Basin Cryospheric Expedition 2024 (Himansh)',
    code: 'HIM-2024',
    region: REGIONS.HIMALAYA,
    expedition_type: 'High-Altitude Field Campaign',
    start_date: '2024-07-01',
    end_date: '2024-10-15',
    status: 'Completed',
    vessel_or_base: 'Himansh Field Station, Spiti, Himachal Pradesh (4080m)',
    leader_name: 'Dr. Parmanand Sharma',
    description: 'Field glaciology campaign measuring seasonal ablation, snow water equivalent, and debris cover thermal resistance on Chhota Shigri and Sutri Dhaka glaciers.',
    objectives: [
      'Maintenance of 4 automated weather stations at 4200m to 5400m',
      'Stake-based direct mass balance measurements across 28 points',
      'Terrestrial laser scanning (TLS) of glacier terminus retreat'
    ],
    metadata: { altitude_max_m: 5450, team_size: 14 },
    provenance: FIXTURE_PROVENANCE('EXP-HIM-2024', 'NCPOR Cryosphere Division')
  }
];

// ------------------------------------------------------------------------------
// 4. DATASETS FIXTURES
// ------------------------------------------------------------------------------
export const DEMO_DATASETS = [
  {
    dataset_id: 'data-dml-ice-core',
    title: 'Dronning Maud Land Ice Core Stable Water Isotopes (δ18O and δD) Archive',
    description: 'Millimeter-scale discrete isotope measurements from the 218m IND-2021 ice core drilled at 70°51′S, 11°32′E on the East Antarctic plateau, providing annual climate proxy data from 1020 CE to 2020 CE.',
    keywords: ['Ice Core', 'Paleoclimate', 'Stable Isotopes', 'Dronning Maud Land', 'Antarctica', 'δ18O'],
    scientific_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    geographic_region: REGIONS.ANTARCTICA,
    spatial_coverage: { latitude: -70.85, longitude: 11.53, elevation_m: 2850 },
    temporal_coverage_start: '1020-01-01',
    temporal_coverage_end: '2020-12-31',
    doi: '10.5067/NCPOR/NPDC/ICECORE-DML-2024',
    data_format: 'NetCDF',
    file_size_bytes: 428400000, // 428 MB
    license: 'CC-BY-4.0',
    access_level: ACCESS_LEVELS.OPEN_ACCESS,
    download_url: 'https://npdc.ncpor.res.in/datasets/dml-core-isotopes.nc',
    metadata: { resolution: 'annual', analytical_precision: '0.05‰', instrument: 'Picarro L2130-i' },
    provenance: FIXTURE_PROVENANCE('NPDC-DS-7821', 'NCPOR Ice Core Analytical Facility')
  },
  {
    dataset_id: 'data-maitri-mag',
    title: 'Maitri Station 1-Second Fluxgate Magnetometer Baseline Variations',
    description: 'Tri-axial geomagnetic field intensity components (H, D, Z) recorded at Maitri Station, Antarctica (70°46′S, 11°44′E) calibrated to INTERMAGNET standards.',
    keywords: ['Geomagnetism', 'Space Weather', 'Maitri', 'Magnetic Storm', 'Solar Cycle'],
    scientific_domain: SCIENTIFIC_DOMAINS.SPACE_WEATHER_GEOMAGNETISM,
    geographic_region: REGIONS.ANTARCTICA,
    spatial_coverage: { latitude: -70.766, longitude: 11.733, station: 'Maitri' },
    temporal_coverage_start: '2023-01-01',
    temporal_coverage_end: '2024-12-31',
    doi: '10.5067/NCPOR/NPDC/MAITRI-MAG-1SEC',
    data_format: 'CSV',
    file_size_bytes: 890000000, // 890 MB
    license: 'CC-BY-4.0',
    access_level: ACCESS_LEVELS.OPEN_ACCESS,
    download_url: 'https://npdc.ncpor.res.in/datasets/maitri-mag-2023-2024.csv.gz',
    metadata: { sampling_interval: '1 second', sensor: 'Bartington Mag-03' },
    provenance: FIXTURE_PROVENANCE('NPDC-DS-3309', 'Indian Institute of Geomagnetism & NCPOR')
  },
  {
    dataset_id: 'data-arc-indarc-mooring',
    title: 'IndARC Subsurface Mooring Hydrographic Time-Series (Kongsfjorden Fjord)',
    description: 'Multi-sensor physical oceanography recordings (temperature, salinity, pressure, ocean currents, and dissolved oxygen) from India’s IndARC underwater mooring stationed at 192m depth in Kongsfjorden, Svalbard.',
    keywords: ['IndARC', 'Kongsfjorden', 'Arctic Ocean', 'Svalbard', 'Mooring', 'Atlantification'],
    scientific_domain: SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM,
    geographic_region: REGIONS.ARCTIC,
    spatial_coverage: { latitude: 78.91, longitude: 12.02, depth_m: 192, station: 'Himadri' },
    temporal_coverage_start: '2014-07-23',
    temporal_coverage_end: '2024-08-30',
    doi: '10.5067/NCPOR/NPDC/INDARC-MOORING-10YR',
    data_format: 'NetCDF',
    file_size_bytes: 1450000000, // 1.45 GB
    license: 'CC-BY-4.0',
    access_level: ACCESS_LEVELS.OPEN_ACCESS,
    download_url: 'https://npdc.ncpor.res.in/datasets/indarc-decadal-2014-2024.nc',
    metadata: { duration_years: 10, instruments: ['SBE 37 MicroCAT', 'Nortek Aquadopp ADCP'] },
    provenance: FIXTURE_PROVENANCE('NPDC-DS-1002', 'IndARC Arctic Ocean Mooring Observatory')
  },
  {
    dataset_id: 'data-him-mass-balance',
    title: 'Chhota Shigri Glacier Annual Net Mass Balance Time-Series (2002–2024)',
    description: 'Field-verified glaciological surface mass balance (winter, summer, and net annual) measured through extensive stake networks and snow pits on Chhota Shigri Glacier, Chandra Basin, Western Himalaya.',
    keywords: ['Glacier Mass Balance', 'Chhota Shigri', 'Himansh', 'Himalaya', 'Spiti', 'Climate Change'],
    scientific_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    geographic_region: REGIONS.HIMALAYA,
    spatial_coverage: { latitude: 32.28, longitude: 77.52, altitude_min_m: 4050, altitude_max_m: 5800 },
    temporal_coverage_start: '2002-10-01',
    temporal_coverage_end: '2024-10-01',
    doi: '10.5067/NCPOR/NPDC/CHHOTASHIGRI-MB-2024',
    data_format: 'CSV',
    file_size_bytes: 18400000, // 18.4 MB
    license: 'CC-BY-4.0',
    access_level: ACCESS_LEVELS.OPEN_ACCESS,
    download_url: 'https://npdc.ncpor.res.in/datasets/chhotashigri-mb-2002-2024.csv',
    metadata: { equilibrium_line_altitude_m: 5080, glacier_area_km2: 15.7 },
    provenance: FIXTURE_PROVENANCE('NPDC-DS-4910', 'Himansh Glaciological Long-Term Observational Study')
  },
  {
    dataset_id: 'data-so-pco2-flux',
    title: 'Southern Ocean Surface Underway pCO2 and Atmospheric Carbon Flux (40°S to 67°S)',
    description: 'High-frequency continuous sea surface partial pressure of CO2 (pCO2), sea surface temperature, and computed air-sea CO2 fluxes measured during the 13th Indian Southern Ocean Expedition aboard ORV Sagar Nidhi.',
    keywords: ['Southern Ocean', 'pCO2', 'Carbon Sink', 'Ocean Acidification', 'Sagar Nidhi'],
    scientific_domain: SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM,
    geographic_region: REGIONS.SOUTHERN_OCEAN,
    spatial_coverage: { latitude_min: -67.2, latitude_max: -40.1, longitude_min: 55.0, longitude_max: 78.0 },
    temporal_coverage_start: '2024-01-12',
    temporal_coverage_end: '2024-03-01',
    doi: '10.5067/NCPOR/NPDC/SO13-UNDERWAY-PCO2',
    data_format: 'CSV',
    file_size_bytes: 84000000, // 84 MB
    license: 'CC-BY-4.0',
    access_level: ACCESS_LEVELS.OPEN_ACCESS,
    download_url: 'https://npdc.ncpor.res.in/datasets/so13-underway-pco2.csv',
    metadata: { sensor: 'General Oceanics 8050 Underway System', gas_standards: 'NOAA Certified' },
    provenance: FIXTURE_PROVENANCE('NPDC-DS-8801', 'ISOE-13 Marine Biogeochemistry Group')
  },
  {
    dataset_id: 'data-bh-radar-ice',
    title: 'Larsemann Hills Coastal Ice Sheet Ground-Penetrating Radar Bedrock Profiles',
    description: 'High-frequency 100 MHz and 400 MHz ground-penetrating radar (GPR) transects mapping sub-ice topography, firn aquifer depths, and basal crevasses near Bharati Station and Dålk Glacier.',
    keywords: ['Ground Penetrating Radar', 'Ice Sheet Bedrock', 'Bharati', 'Larsemann Hills', 'Glaciology'],
    scientific_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    geographic_region: REGIONS.ANTARCTICA,
    spatial_coverage: { latitude: -69.41, longitude: 76.19, station: 'Bharati' },
    temporal_coverage_start: '2023-12-01',
    temporal_coverage_end: '2024-02-28',
    doi: '10.5067/NCPOR/NPDC/BHARATI-GPR-BEDROCK',
    data_format: 'GeoTIFF',
    file_size_bytes: 670000000, // 670 MB
    license: 'CC-BY-4.0',
    access_level: ACCESS_LEVELS.OPEN_ACCESS,
    download_url: 'https://npdc.ncpor.res.in/datasets/bharati-gpr-bedrock.tif',
    metadata: { antenna: 'GSSI SIR-4000', penetration_depth_m: 320 },
    provenance: FIXTURE_PROVENANCE('NPDC-DS-6712', '43rd ISEA Geophysics Team')
  }
];

// ------------------------------------------------------------------------------
// 5. PUBLICATIONS FIXTURES
// ------------------------------------------------------------------------------
export const DEMO_PUBLICATIONS = [
  {
    publication_id: 'pub-001-dml-nature',
    title: 'Centennial Teleconnections Between Indian Ocean Warming and East Antarctic Snow Accumulation',
    authors: ['Meloth, T.', 'Tiwari, M.', 'Redkar, B. L.', 'Sharma, P.'],
    abstract: 'Here we present a 1000-year calibrated ice core record from Dronning Maud Land, East Antarctica. We demonstrate that decadal warm phases of the Indian Ocean Dipole accelerate meridional moisture transport, producing an anomalous 18% increase in coastal snowfall accumulation.',
    publication_date: '2023-08-14',
    journal: 'Nature Geoscience',
    volume_issue_pages: 'Vol. 16, pp. 782-790',
    doi: '10.1038/s41561-023-01254-8',
    peer_reviewed: true,
    scientific_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    keywords: ['Ice Core', 'Antarctica', 'Monsoon Teleconnection', 'Snow Accumulation'],
    url: 'https://doi.org/10.1038/s41561-023-01254-8',
    metadata: { citations_count: 42, impact_factor: 18.3 },
    provenance: FIXTURE_PROVENANCE('PUB-001', 'Published peer-reviewed paper')
  },
  {
    publication_id: 'pub-002-indarc-grl',
    title: 'A Decade of IndARC Observations Reveals Accelerated Atlantification in Kongsfjorden, Svalbard',
    authors: ['Krishnan, K. P.', 'Meloth, T.', 'Joji, N. P.'],
    abstract: 'Analysis of continuous 10-year mooring hydrography from the IndARC observatory demonstrates a winter temperature warming anomaly of 1.4°C per decade in Kongsfjorden, driven by pulses of warm, saline West Spitsbergen Current intrusions.',
    publication_date: '2024-03-22',
    journal: 'Geophysical Research Letters',
    volume_issue_pages: 'Vol. 51, Iss. 6, e2023GL108221',
    doi: '10.1029/2023GL108221',
    peer_reviewed: true,
    scientific_domain: SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM,
    keywords: ['IndARC', 'Arctic Ocean', 'Kongsfjorden', 'Atlantification', 'Svalbard'],
    url: 'https://doi.org/10.1029/2023GL108221',
    metadata: { citations_count: 19, impact_factor: 5.6 },
    provenance: FIXTURE_PROVENANCE('PUB-002', 'Geophysical Research Letters')
  },
  {
    publication_id: 'pub-003-chhota-tc',
    title: 'Two Decades of Geodetic and Glaciological Mass Balance at Chhota Shigri Glacier, Western Himalaya',
    authors: ['Sharma, P.', 'Meloth, T.', 'Ravindra, R.'],
    abstract: 'Long-term measurements between 2002 and 2024 reveal an average negative mass balance of -0.52 ± 0.12 m w.e. a⁻¹ at Chhota Shigri Glacier, with accelerated mass deficit during the anomalous warm summer of 2022.',
    publication_date: '2024-01-18',
    journal: 'The Cryosphere',
    volume_issue_pages: 'Vol. 18, pp. 245-261',
    doi: '10.5194/tc-18-245-2024',
    peer_reviewed: true,
    scientific_domain: SCIENTIFIC_DOMAINS.CRYOSPHERE_GLACIOLOGY,
    keywords: ['Glacier Mass Balance', 'Himansh', 'Chhota Shigri', 'Western Himalaya'],
    url: 'https://doi.org/10.5194/tc-18-245-2024',
    metadata: { citations_count: 15, impact_factor: 5.2 },
    provenance: FIXTURE_PROVENANCE('PUB-003', 'European Geosciences Union / The Cryosphere')
  },
  {
    publication_id: 'pub-004-so-carbon-bg',
    title: 'Biological Pump Efficiency and Carbon Export Down to the Deep Polar Frontal Zone in the Southern Ocean',
    authors: ['Tiwari, M.', 'Joji, N. P.', 'Meloth, T.'],
    abstract: 'We report multi-depth particulate organic carbon and thorium-234 isotope disequilibria across the Subtropical Front down to 67°S during ISOE-13, revealing critical regional hotspots of deep carbon sequestration.',
    publication_date: '2024-05-10',
    journal: 'Biogeosciences',
    volume_issue_pages: 'Vol. 21, pp. 2110-2128',
    doi: '10.5194/bg-21-2110-2024',
    peer_reviewed: true,
    scientific_domain: SCIENTIFIC_DOMAINS.OCEANOGRAPHY_BIOGEOCHEM,
    keywords: ['Southern Ocean', 'Carbon Export', 'Biological Pump', 'Thorium-234', 'Sagar Nidhi'],
    url: 'https://doi.org/10.5194/bg-21-2110-2024',
    metadata: { citations_count: 11, impact_factor: 4.8 },
    provenance: FIXTURE_PROVENANCE('PUB-004', 'Biogeosciences EGU')
  }
];

// ------------------------------------------------------------------------------
// 6. MEDIA FIXTURES
// ------------------------------------------------------------------------------
export const DEMO_MEDIA = [
  {
    media_id: 'med-001-golovnin-ice',
    title: 'MV Vasily Golovnin Navigating Heavy Pack Ice in Prydz Bay (44th ISEA)',
    type: MEDIA_TYPES.PHOTOGRAPH,
    description: 'Expedition vessel MV Vasily Golovnin cutting through 1.8-meter thick sea ice en route to Bharati Station during the 44th Indian Antarctic Expedition.',
    date: '2024-12-04',
    location: 'Prydz Bay, Antarctica (69°20′S, 76°10′E)',
    geographic_region: REGIONS.ANTARCTICA,
    topic: 'Expedition Logistics & Sea Ice Navigation',
    source: 'NCPOR / Ministry of Earth Sciences (MoES)',
    thumbnail_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    media_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    file_format: 'image/jpeg',
    dimensions_or_duration: '3840x2160 (4K)',
    transcript: '',
    license: 'CC-BY-NC-SA 4.0',
    metadata: { camera: 'Sony A7R IV', lens: '24-70mm f/2.8 GM', iso: 100 },
    provenance: FIXTURE_PROVENANCE('MED-001', 'Official 44th ISEA Media Unit')
  },
  {
    media_id: 'med-002-himadri-drone',
    title: 'Aerial Fjord Transect Over Himadri Station & Kongsfjorden Glacier Front',
    type: MEDIA_TYPES.VIDEO,
    description: 'High-definition 4K aerial survey documenting meltwater plumes discharging from Kronebreen and Kongsvegen glacier termini into Kongsfjorden, Ny-Ålesund, Svalbard.',
    date: '2024-07-15',
    location: 'Ny-Ålesund, Svalbard, Arctic (78°55′N, 11°56′E)',
    geographic_region: REGIONS.ARCTIC,
    topic: 'Glacier Melt & Arctic Ocean Interaction',
    source: 'NCPOR Arctic Research Wing',
    thumbnail_url: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?auto=format&fit=crop&w=600&q=80',
    media_url: 'https://assets.mixkit.co/videos/preview/mixkit-iceberg-floating-in-the-antarctic-ocean-4355-large.mp4',
    file_format: 'video/mp4',
    dimensions_or_duration: '03:42 (4K 60fps)',
    transcript: 'Narrator: Aerial perspective over Ny-Ålesund. As the drone traverses southwest across Kongsfjorden, the glacier terminus reveals sediment-rich turbid melt plumes entering the saline fjord basin.',
    license: 'CC-BY-NC-SA 4.0',
    metadata: { resolution: '3840x2160', drone: 'DJI Matrice 300 RTK' },
    provenance: FIXTURE_PROVENANCE('MED-002', 'NCPOR Himadri Arctic Media Archive')
  },
  {
    media_id: 'med-003-himansh-batal',
    title: 'Himansh Station Observatory at Dusk Under the Himalayan Spiti Peaks',
    type: MEDIA_TYPES.PHOTOGRAPH,
    description: 'Twilight perspective of India’s remote Himansh High-Altitude Field Station situated at 4080m in the Chandra Basin, Spiti Valley, Himachal Pradesh.',
    date: '2024-08-20',
    location: 'Chandra Basin, Spiti Valley, Himalaya (4080m)',
    geographic_region: REGIONS.HIMALAYA,
    topic: 'High-Altitude Cryospheric Infrastructure',
    source: 'NCPOR Cryosphere Division',
    thumbnail_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    media_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    file_format: 'image/jpeg',
    dimensions_or_duration: '4096x2730',
    transcript: '',
    license: 'CC-BY-NC-SA 4.0',
    metadata: { camera: 'Nikon Z8', elevation_m: 4080 },
    provenance: FIXTURE_PROVENANCE('MED-003', 'Himansh Station Field Log')
  },
  {
    media_id: 'med-004-aurora-maitri',
    title: 'Southern Lights (Aurora Australis) Over India’s Maitri Station',
    type: MEDIA_TYPES.PHOTOGRAPH,
    description: 'Long-exposure green oxygen emission (557.7 nm) aurora australis curtain dancing above Maitri Station in the Schirmacher Oasis during polar night.',
    date: '2024-05-18',
    location: 'Schirmacher Oasis, Antarctica (70°46′S, 11°44′E)',
    geographic_region: REGIONS.ANTARCTICA,
    topic: 'Space Weather & Geomagnetism',
    source: 'Indian Institute of Geomagnetism & NCPOR',
    thumbnail_url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    media_url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=80',
    file_format: 'image/jpeg',
    dimensions_or_duration: '3840x2560',
    transcript: '',
    license: 'CC-BY-NC-SA 4.0',
    metadata: { exposure: '15 seconds', aperture: 'f/1.4', kp_index: 6 },
    provenance: FIXTURE_PROVENANCE('MED-004', 'Maitri Wintering Optical Archive')
  }
];

// ------------------------------------------------------------------------------
// 7. RELATIONSHIP FIXTURES (MANY-TO-MANY GRAPH EDGES)
// ------------------------------------------------------------------------------

export const DEMO_RESEARCHER_PROJECTS = [
  { id: 'rp-1', researcher_id: 'res-001-thamban', project_id: 'proj-001-dml-ice', role: 'Principal Investigator', joined_date: '2021-04-01' },
  { id: 'rp-2', researcher_id: 'res-001-thamban', project_id: 'proj-003-him-mass', role: 'Chief Scientific Advisor', joined_date: '2016-09-01' },
  { id: 'rp-3', researcher_id: 'res-002-redkar', project_id: 'proj-005-sch-geomag', role: 'Co-Investigator', joined_date: '2018-01-01' },
  { id: 'rp-4', researcher_id: 'res-003-krishnan', project_id: 'proj-002-arc-bio', role: 'Principal Investigator', joined_date: '2020-06-01' },
  { id: 'rp-5', researcher_id: 'res-004-tiwari', project_id: 'proj-004-so-carbon', role: 'Principal Investigator', joined_date: '2022-01-01' },
  { id: 'rp-6', researcher_id: 'res-005-sharma', project_id: 'proj-003-him-mass', role: 'Lead Field Investigator', joined_date: '2016-09-01' },
  { id: 'rp-7', researcher_id: 'res-006-swati', project_id: 'proj-006-bh-aerosol', role: 'Principal Investigator', joined_date: '2019-11-01' },
  { id: 'rp-8', researcher_id: 'res-007-joji', project_id: 'proj-004-so-carbon', role: 'Co-Investigator (Marine Biology)', joined_date: '2022-01-01' }
];

export const DEMO_PROJECT_EXPEDITIONS = [
  { id: 'pe-1', project_id: 'proj-001-dml-ice', expedition_id: 'exp-isea-44', operational_phase: 'Core Recovery Site 4' },
  { id: 'pe-2', project_id: 'proj-001-dml-ice', expedition_id: 'exp-isea-43', operational_phase: 'Shallow Pilot Coring' },
  { id: 'pe-3', project_id: 'proj-002-arc-bio', expedition_id: 'exp-arc-2024', operational_phase: 'Fjord Mooring & CTD Transect' },
  { id: 'pe-4', project_id: 'proj-003-him-mass', expedition_id: 'exp-him-2024', operational_phase: 'Annual Stake DGPS Survey' },
  { id: 'pe-5', project_id: 'proj-004-so-carbon', expedition_id: 'exp-so-13', operational_phase: 'Subtropical Front Cruise' },
  { id: 'pe-6', project_id: 'proj-005-sch-geomag', expedition_id: 'exp-isea-44', operational_phase: 'Maitri Sensor Calibration' }
];

export const DEMO_PROJECT_DATASETS = [
  { id: 'pd-1', project_id: 'proj-001-dml-ice', dataset_id: 'data-dml-ice-core', role: 'Primary Deliverable' },
  { id: 'pd-2', project_id: 'proj-002-arc-bio', dataset_id: 'data-arc-indarc-mooring', role: 'Mooring Hydrography Time-Series' },
  { id: 'pd-3', project_id: 'proj-003-him-mass', dataset_id: 'data-him-mass-balance', role: 'Glacier Mass Balance Dataset' },
  { id: 'pd-4', project_id: 'proj-004-so-carbon', dataset_id: 'data-so-pco2-flux', role: 'Underway pCO2 Database' },
  { id: 'pd-5', project_id: 'proj-005-sch-geomag', dataset_id: 'data-maitri-mag', role: '1-Sec Geomagnetic Baseline' },
  { id: 'pd-6', project_id: 'proj-006-bh-aerosol', dataset_id: 'data-bh-radar-ice', role: 'Firn & Sub-ice Radar Profile' }
];

export const DEMO_EXPEDITION_DATASETS = [
  { id: 'ed-1', expedition_id: 'exp-isea-44', dataset_id: 'data-dml-ice-core', collection_station_or_transect: 'DML Traverse Site 4' },
  { id: 'ed-2', expedition_id: 'exp-isea-44', dataset_id: 'data-maitri-mag', collection_station_or_transect: 'Maitri Observatory' },
  { id: 'ed-3', expedition_id: 'exp-arc-2024', dataset_id: 'data-arc-indarc-mooring', collection_station_or_transect: 'Kongsfjorden Outer Fjord' },
  { id: 'ed-4', expedition_id: 'exp-him-2024', dataset_id: 'data-him-mass-balance', collection_station_or_transect: 'Chhota Shigri Glacier Benchmark' },
  { id: 'ed-5', expedition_id: 'exp-so-13', dataset_id: 'data-so-pco2-flux', collection_station_or_transect: 'ORV Sagar Nidhi Cruise Track SO-13' },
  { id: 'ed-6', expedition_id: 'exp-isea-43', dataset_id: 'data-bh-radar-ice', collection_station_or_transect: 'Bharati Promontory' }
];

export const DEMO_RESEARCHER_PUBLICATIONS = [
  { id: 'rpub-1', researcher_id: 'res-001-thamban', publication_id: 'pub-001-dml-nature', author_order: 1, is_corresponding: true },
  { id: 'rpub-2', researcher_id: 'res-004-tiwari', publication_id: 'pub-001-dml-nature', author_order: 2, is_corresponding: false },
  { id: 'rpub-3', researcher_id: 'res-002-redkar', publication_id: 'pub-001-dml-nature', author_order: 3, is_corresponding: false },
  { id: 'rpub-4', researcher_id: 'res-003-krishnan', publication_id: 'pub-002-indarc-grl', author_order: 1, is_corresponding: true },
  { id: 'rpub-5', researcher_id: 'res-001-thamban', publication_id: 'pub-002-indarc-grl', author_order: 2, is_corresponding: false },
  { id: 'rpub-6', researcher_id: 'res-005-sharma', publication_id: 'pub-003-chhota-tc', author_order: 1, is_corresponding: true },
  { id: 'rpub-7', researcher_id: 'res-001-thamban', publication_id: 'pub-003-chhota-tc', author_order: 2, is_corresponding: false },
  { id: 'rpub-8', researcher_id: 'res-004-tiwari', publication_id: 'pub-004-so-carbon-bg', author_order: 1, is_corresponding: true },
  { id: 'rpub-9', researcher_id: 'res-007-joji', publication_id: 'pub-004-so-carbon-bg', author_order: 2, is_corresponding: false }
];

export const DEMO_PUBLICATION_DATASETS = [
  { id: 'pubdata-1', publication_id: 'pub-001-dml-nature', dataset_id: 'data-dml-ice-core', relation_type: 'derives_from' },
  { id: 'pubdata-2', publication_id: 'pub-002-indarc-grl', dataset_id: 'data-arc-indarc-mooring', relation_type: 'derives_from' },
  { id: 'pubdata-3', publication_id: 'pub-003-chhota-tc', dataset_id: 'data-him-mass-balance', relation_type: 'derives_from' },
  { id: 'pubdata-4', publication_id: 'pub-004-so-carbon-bg', dataset_id: 'data-so-pco2-flux', relation_type: 'derives_from' }
];

export const DEMO_EXPEDITION_MEDIA = [
  { id: 'em-1', expedition_id: 'exp-isea-44', media_id: 'med-001-golovnin-ice', caption: 'MV Vasily Golovnin in Prydz Bay pack ice' },
  { id: 'em-2', expedition_id: 'exp-arc-2024', media_id: 'med-002-himadri-drone', caption: 'Ny-Ålesund Kongsfjorden aerial drone survey' },
  { id: 'em-3', expedition_id: 'exp-him-2024', media_id: 'med-003-himansh-batal', caption: 'Himansh high-altitude observatory at 4080m' },
  { id: 'em-4', expedition_id: 'exp-isea-44', media_id: 'med-004-aurora-maitri', caption: 'Aurora Australis curtain captured above Maitri Station' }
];

export const DEMO_PROJECT_PUBLICATIONS = [
  { id: 'ppub-1', project_id: 'proj-001-dml-ice', publication_id: 'pub-001-dml-nature', grant_or_ack: 'Funded under MoES Cryosphere PACER' },
  { id: 'ppub-2', project_id: 'proj-002-arc-bio', publication_id: 'pub-002-indarc-grl', grant_or_ack: 'NCPOR IndARC Arctic Mooring Grant' },
  { id: 'ppub-3', project_id: 'proj-003-him-mass', publication_id: 'pub-003-chhota-tc', grant_or_ack: 'Himansh Long-Term Himalayan Cryosphere Monitoring' },
  { id: 'ppub-4', project_id: 'proj-004-so-carbon', publication_id: 'pub-004-so-carbon-bg', grant_or_ack: 'MoES Indian Southern Ocean Expedition Programme' }
];

export const DEMO_PROJECT_MEDIA = [
  { id: 'pm-1', project_id: 'proj-001-dml-ice', media_id: 'med-001-golovnin-ice', context: 'Logistics support ship delivering ice core drilling rig' },
  { id: 'pm-2', project_id: 'proj-002-arc-bio', media_id: 'med-002-himadri-drone', context: 'Hydrographic survey transect over Kongsfjorden' },
  { id: 'pm-3', project_id: 'proj-003-him-mass', media_id: 'med-003-himansh-batal', context: 'Benchmark glaciological base station in Spiti' },
  { id: 'pm-4', project_id: 'proj-005-sch-geomag', media_id: 'med-004-aurora-maitri', context: 'Magnetic storm conjugate aurora over Maitri' }
];
