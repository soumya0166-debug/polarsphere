// PolarSphere Open Science Data Repository
// National Polar Data Center (NPDC) & NCPOR Metadata Compliant Datasets

export const POLAR_DATASETS = [
  {
    id: 'ds-01',
    doi: '10.5065/D6NPDC-BHARATI-GPS-2025',
    title: 'Larsemann Hills Continuous GNSS & Crustal Post-Glacial Rebound Dataset (2012–2025)',
    shortTitle: 'Larsemann Hills Crustal GNSS',
    region: 'Antarctica',
    subRegion: 'Prydz Bay / Larsemann Hills',
    domain: 'Geoscience & Cryosphere Geodynamics',
    stationId: 'bharati',
    author: 'National Centre for Polar and Ocean Research (NCPOR) & Survey of India',
    license: 'Creative Commons Attribution 4.0 International (CC-BY 4.0)',
    publishedDate: '15 Jan 2025',
    version: 'v3.2',
    formats: ['RINEX 3.04', 'NetCDF-4', 'GeoTIFF', 'CSV'],
    size: '14.8 GB',
    recordCount: '4,750,000 Station Epochs',
    temporalCoverage: '2012-02-14 to 2025-01-01',
    spatialBounds: '69°24′S to 69°26′S; 76°10′E to 76°14′E',
    abstract: 'High-frequency continuous Global Navigation Satellite System (GNSS) carrier-phase observation logs recorded at the bedrock geodetic pillar of Bharati Station. Contains derived 3D coordinate velocity vectors, precipitable water vapor estimates, and empirical post-glacial rebound (PGR) crustal uplift rates essential for calibrating Grace-FO mass-change calculations in East Antarctica.',
    fairCompliance: {
      findable: '100% (Crossref DOI, DataCite schema, OAI-PMH compliant)',
      accessible: '100% (Direct HTTPS download + OPeNDAP streaming without embargo)',
      interoperable: '95% (CF-1.8 NetCDF conventions, ISO 19115 geographic metadata)',
      reusable: '100% (Rich provenance, instrumentation calibration certs included)'
    },
    citations: {
      apa: 'NCPOR Geodesy Team. (2025). Larsemann Hills Continuous GNSS & Crustal Post-Glacial Rebound Dataset (2012–2025) (Version 3.2) [Data set]. National Polar Data Center (NPDC). https://doi.org/10.5065/D6NPDC-BHARATI-GPS-2025',
      bibtex: `@dataset{npdc_bharati_gnss_2025,\n  author = {NCPOR Geodesy Team},\n  title = {Larsemann Hills Continuous GNSS and Crustal Post-Glacial Rebound Dataset},\n  year = {2025},\n  publisher = {National Polar Data Center},\n  doi = {10.5065/D6NPDC-BHARATI-GPS-2025}\n}`,
      ris: `TY  - DATA\nAU  - NCPOR Geodesy Team\nTI  - Larsemann Hills Continuous GNSS & Crustal Post-Glacial Rebound Dataset\nPY  - 2025\nDO  - 10.5065/D6NPDC-BHARATI-GPS-2025\nER  -`
    }
  },
  {
    id: 'ds-02',
    doi: '10.5065/D6NPDC-MAITRI-MET-1990-2025',
    title: 'Maitri Station 1-Minute Meteorological Time-Series Archive (1990–2025)',
    shortTitle: 'Maitri 35-Year Surface Met Series',
    region: 'Antarctica',
    subRegion: 'Schirmacher Oasis, Queen Maud Land',
    domain: 'Atmospheric Physics & Climate Teleconnections',
    stationId: 'maitri',
    author: 'India Meteorological Department (IMD) & NCPOR',
    license: 'Open Access (WMO Core Climate Archive)',
    publishedDate: '02 Feb 2025',
    version: 'v4.0',
    formats: ['NetCDF-4', 'CSV', 'Parquet'],
    size: '8.4 GB',
    recordCount: '18,400,000 Clean Minutes',
    temporalCoverage: '1990-01-01 to 2025-01-31',
    spatialBounds: '70°45′57″S, 11°44′09″E',
    abstract: 'Continuous 35-year calibrated surface meteorological observation time series from Maitri Station. Includes air temperature, barometric pressure, horizontal wind velocity and azimuth, relative humidity, surface solar irradiance, global radiation, and snow drift precipitation accumulation.',
    fairCompliance: {
      findable: '100% (WMO WIS 2.0 registered, WMO Station ID 89514)',
      accessible: '100% (Open REST API + direct bulk tarball)',
      interoperable: '100% (CF-1.7 NetCDF, WMO BUFR & GRIB2 formats)',
      reusable: '100% (Full sensor calibration history & quality assurance flags)'
    },
    citations: {
      apa: 'IMD & NCPOR. (2025). Maitri Station 1-Minute Meteorological Time-Series Archive (1990–2025) (Version 4.0) [Data set]. https://doi.org/10.5065/D6NPDC-MAITRI-MET-1990-2025',
      bibtex: `@dataset{imd_maitri_met_2025,\n  author = {IMD and NCPOR},\n  title = {Maitri Station 1-Minute Meteorological Time-Series Archive (1990-2025)},\n  year = {2025},\n  doi = {10.5065/D6NPDC-MAITRI-MET-1990-2025}\n}`,
      ris: `TY  - DATA\nAU  - IMD; NCPOR\nTI  - Maitri Station 1-Minute Meteorological Time-Series Archive\nPY  - 2025\nDO  - 10.5065/D6NPDC-MAITRI-MET-1990-2025\nER  -`
    }
  },
  {
    id: 'ds-03',
    doi: '10.5065/D6NPDC-HIMADRI-KONGS-SED-2024',
    title: 'Kongsfjorden High-Arctic Marine Sediment Biogeochemistry & Stable Isotope Logs',
    shortTitle: 'Kongsfjorden Biogeochemistry Logs',
    region: 'Arctic',
    subRegion: 'Ny-Ålesund, Svalbard (78°55′N)',
    domain: 'Marine Geochemistry & Glacier Runoff',
    stationId: 'himadri',
    author: 'NCPOR Arctic Science Division',
    license: 'Creative Commons Attribution 4.0 (CC-BY 4.0)',
    publishedDate: '10 Nov 2024',
    version: 'v2.1',
    formats: ['CSV', 'Excel', 'NetCDF-4'],
    size: '1.2 GB',
    recordCount: '340 Core Depth Intervals',
    temporalCoverage: '2014-06-01 to 2024-09-30',
    spatialBounds: '78°54′N to 79°02′N; 11°40′E to 12°25′E',
    abstract: 'Downcore sediment geochemistry profiles, organic carbon to total nitrogen (C/N) elemental ratios, stable carbon (δ13C) and nitrogen (δ15N) isotope fractionation values, and trace metal concentrations from sediment multi-cores retrieved across the glacial meltwater gradient of Kongsfjorden, Spitsbergen.',
    fairCompliance: {
      findable: '100% (PANGAEA cross-linked & NPDC indexed)',
      accessible: '100% (Direct open download)',
      interoperable: '90% (ISO 19139 compliant tabular schema)',
      reusable: '95% (Complete analytical lab protocol & mass spec QA docs)'
    },
    citations: {
      apa: 'Krishnan, K. P., et al. (2024). Kongsfjorden High-Arctic Marine Sediment Biogeochemistry & Stable Isotope Logs [Data set]. NCPOR. https://doi.org/10.5065/D6NPDC-HIMADRI-KONGS-SED-2024',
      bibtex: `@dataset{krishnan_kongsfjorden_2024,\n  author = {Krishnan, K. P. and NCPOR Arctic Team},\n  title = {Kongsfjorden High-Arctic Marine Sediment Biogeochemistry and Stable Isotope Logs},\n  year = {2024},\n  doi = {10.5065/D6NPDC-HIMADRI-KONGS-SED-2024}\n}`,
      ris: `TY  - DATA\nAU  - Krishnan, K. P.\nTI  - Kongsfjorden High-Arctic Marine Sediment Biogeochemistry Logs\nPY  - 2024\nDO  - 10.5065/D6NPDC-HIMADRI-KONGS-SED-2024\nER  -`
    }
  },
  {
    id: 'ds-04',
    doi: '10.5065/D6NPDC-HIMANSH-CHHOTA-LIDAR-2024',
    title: 'Chhota Shigri Glacier Surface Mass Balance & 3D Drone/LiDAR Point Clouds (2016–2024)',
    shortTitle: 'Chhota Shigri 3D LiDAR & Mass Balance',
    region: 'Himalaya',
    subRegion: 'Chandra Basin, Lahaul-Spiti, Himachal Pradesh',
    domain: 'Cryosphere & Alpine Glaciology',
    stationId: 'himansh',
    author: 'NCPOR Cryosphere Division & Himansh Research Observatory',
    license: 'Creative Commons Attribution-NonCommercial 4.0',
    clearanceRequired: 'researcher',
    publishedDate: '18 Dec 2024',
    version: 'v2.0',
    formats: ['LAS/LAZ', 'GeoTIFF (1m DEM)', 'CSV'],
    size: '32.6 GB',
    recordCount: '1.8 Billion LiDAR Points + 120 Stake Readings',
    temporalCoverage: '2016-09-01 to 2024-10-15',
    spatialBounds: '32°12′N to 32°18′N; 77°30′E to 77°36′E',
    abstract: 'High-density airborne UAV LiDAR point clouds, 1-meter digital elevation models (DEMs), and annual in-situ glaciological mass-balance ablation stake measurements across the 15.7 km² area of Chhota Shigri Glacier benchmark site in the Western Himalaya.',
    fairCompliance: {
      findable: '100% (NPDC & World Glacier Monitoring Service WGMS ID 2341)',
      accessible: '90% (Open download after registration)',
      interoperable: '95% (Standard ASPRS LAS 1.4 & GeoTIFF)',
      reusable: '100% (Ground control points GCP coordinates included)'
    },
    citations: {
      apa: 'Sharma, P., et al. (2024). Chhota Shigri Glacier Surface Mass Balance & 3D Drone/LiDAR Point Clouds (2016–2024) [Data set]. NCPOR. https://doi.org/10.5065/D6NPDC-HIMANSH-CHHOTA-LIDAR-2024',
      bibtex: `@dataset{sharma_chhota_shigri_2024,\n  author = {Sharma, Parmanand and Himansh Glaciology Team},\n  title = {Chhota Shigri Glacier Surface Mass Balance and 3D LiDAR Point Clouds},\n  year = {2024},\n  doi = {10.5065/D6NPDC-HIMANSH-CHHOTA-LIDAR-2024}\n}`,
      ris: `TY  - DATA\nAU  - Sharma, Parmanand\nTI  - Chhota Shigri Glacier Surface Mass Balance & 3D LiDAR Point Clouds\nPY  - 2024\nDO  - 10.5065/D6NPDC-HIMANSH-CHHOTA-LIDAR-2024\nER  -`
    }
  },
  {
    id: 'ds-05',
    doi: '10.5065/D6NPDC-SO-CO2-ACID-2024',
    title: 'Southern Ocean Surface Partial Pressure of CO2 & Ocean Acidification Profiling Transect (40°S–68°S)',
    shortTitle: 'Southern Ocean pCO2 & Acidification',
    region: 'Southern Ocean',
    subRegion: 'Indian Sector of Southern Ocean',
    domain: 'Chemical Oceanography & Carbon Flux',
    stationId: 'bharati',
    author: 'ORV Sagar Nidhi Expedition Scientists & NCPOR Oceanography Group',
    license: 'Creative Commons Attribution 4.0 International (CC-BY 4.0)',
    publishedDate: '28 Aug 2024',
    version: 'v1.5',
    formats: ['NetCDF-4', 'CSV', 'ODV Spreadsheet'],
    size: '3.8 GB',
    recordCount: '860 Underway Hydrographic Stations',
    temporalCoverage: '2020-01-10 to 2024-03-25',
    spatialBounds: '40°00′S to 68°30′S; 50°00′E to 78°00′E',
    abstract: 'Underway high-precision pCO2, total alkalinity (TA), dissolved inorganic carbon (DIC), pH (total scale), and seawater aragonite/calcite saturation state (Ω) measurements collected along repeatable seasonal transects from Mauritius to Prydz Bay, Antarctica.',
    fairCompliance: {
      findable: '100% (SOCAT Global Carbon Index linked)',
      accessible: '100% (Open unrestricted download)',
      interoperable: '100% (Ocean Data View ODV & NetCDF-CF)',
      reusable: '100% (Dickson certified reference material CRM calibrated)'
    },
    citations: {
      apa: 'Tiwari, M., et al. (2024). Southern Ocean Surface Partial Pressure of CO2 & Ocean Acidification Profiling Transect (40°S–68°S) [Data set]. NCPOR. https://doi.org/10.5065/D6NPDC-SO-CO2-ACID-2024',
      bibtex: `@dataset{tiwari_southern_ocean_co2_2024,\n  author = {Tiwari, Manish and NCPOR Ocean Science Group},\n  title = {Southern Ocean Surface Partial Pressure of CO2 and Ocean Acidification Profiling Transect},\n  year = {2024},\n  doi = {10.5065/D6NPDC-SO-CO2-ACID-2024}\n}`,
      ris: `TY  - DATA\nAU  - Tiwari, Manish\nTI  - Southern Ocean Surface Partial Pressure of CO2 & Ocean Acidification Profiling Transect\nPY  - 2024\nDO  - 10.5065/D6NPDC-SO-CO2-ACID-2024\nER  -`
    }
  }
];

export const DATA_DOMAINS = [
  { id: 'all', name: 'All Scientific Domains' },
  { id: 'Cryosphere', name: 'Cryosphere & Glaciology' },
  { id: 'Atmospheric Physics', name: 'Atmospheric Physics & Space Weather' },
  { id: 'Oceanography', name: 'Oceanography & Carbon Flux' },
  { id: 'Geoscience', name: 'Geoscience & Crustal Geodynamics' },
  { id: 'Marine Geochemistry', name: 'Marine Geochemistry & Runoff' }
];
