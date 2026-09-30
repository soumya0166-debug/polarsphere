-- ==============================================================================
-- POLARSPHERE PRODUCTION DATABASE SCHEMA (POSTGRESQL / SUPABASE)
-- Migration: 20260930_polarsphere_data_foundation.sql
-- "The Polar World, Through India's Eyes"
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. RESEARCHERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS researchers (
    researcher_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT,
    institution TEXT NOT NULL,
    specialization TEXT,
    profile TEXT,
    email TEXT,
    orcid TEXT,
    avatar_url TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'emeritus', 'visiting', 'alumni')),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_researchers_institution ON researchers(institution);
CREATE INDEX IF NOT EXISTS idx_researchers_name ON researchers(name);
CREATE INDEX IF NOT EXISTS idx_researchers_orcid ON researchers(orcid);

-- ------------------------------------------------------------------------------
-- 2. PROJECTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    code TEXT UNIQUE,
    description TEXT,
    research_domain TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('planning', 'active', 'completed', 'suspended')),
    start_date DATE,
    end_date DATE,
    lead_institution TEXT NOT NULL,
    funding_agency TEXT DEFAULT 'Ministry of Earth Sciences (MoES), Government of India',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_domain ON projects(research_domain);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_lead_inst ON projects(lead_institution);

-- ------------------------------------------------------------------------------
-- 3. EXPEDITIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS expeditions (
    expedition_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expedition_name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    region TEXT NOT NULL CHECK (region IN ('Antarctica', 'Arctic', 'Southern Ocean', 'Himalaya')),
    expedition_type TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'Planned' CHECK (status IN ('Active', 'Completed', 'Planned', 'In Transit')),
    vessel_or_base TEXT,
    leader_name TEXT,
    description TEXT,
    objectives TEXT[] NOT NULL DEFAULT '{}',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_expeditions_region ON expeditions(region);
CREATE INDEX IF NOT EXISTS idx_expeditions_status ON expeditions(status);
CREATE INDEX IF NOT EXISTS idx_expeditions_code ON expeditions(code);

-- ------------------------------------------------------------------------------
-- 4. DATASETS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS datasets (
    dataset_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    scientific_domain TEXT NOT NULL,
    geographic_region TEXT NOT NULL CHECK (geographic_region IN ('Antarctica', 'Arctic', 'Southern Ocean', 'Himalaya', 'Global Polar')),
    spatial_coverage JSONB NOT NULL DEFAULT '{}'::jsonb,
    temporal_coverage_start DATE,
    temporal_coverage_end DATE,
    doi TEXT,
    data_format TEXT NOT NULL,
    file_size_bytes BIGINT DEFAULT 0,
    license TEXT NOT NULL DEFAULT 'CC-BY-4.0',
    access_level TEXT NOT NULL DEFAULT 'Open Access' CHECK (access_level IN ('Open Access', 'Restricted', 'Embargoed')),
    download_url TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_datasets_domain ON datasets(scientific_domain);
CREATE INDEX IF NOT EXISTS idx_datasets_region ON datasets(geographic_region);
CREATE INDEX IF NOT EXISTS idx_datasets_format ON datasets(data_format);
CREATE INDEX IF NOT EXISTS idx_datasets_access ON datasets(access_level);
CREATE INDEX IF NOT EXISTS idx_datasets_doi ON datasets(doi);

-- ------------------------------------------------------------------------------
-- 5. PUBLICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS publications (
    publication_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    authors TEXT[] NOT NULL DEFAULT '{}',
    abstract TEXT,
    publication_date DATE,
    journal TEXT,
    volume_issue_pages TEXT,
    doi TEXT,
    peer_reviewed BOOLEAN NOT NULL DEFAULT true,
    scientific_domain TEXT NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    url TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_publications_domain ON publications(scientific_domain);
CREATE INDEX IF NOT EXISTS idx_publications_doi ON publications(doi);
CREATE INDEX IF NOT EXISTS idx_publications_date ON publications(publication_date);

-- ------------------------------------------------------------------------------
-- 6. MEDIA TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media (
    media_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Photograph', 'Video', 'Audio', 'Infographic')),
    description TEXT,
    date DATE,
    location TEXT,
    geographic_region TEXT,
    topic TEXT,
    source TEXT,
    thumbnail_url TEXT,
    media_url TEXT NOT NULL,
    file_format TEXT,
    dimensions_or_duration TEXT,
    transcript TEXT,
    license TEXT NOT NULL DEFAULT 'CC-BY-NC-SA 4.0',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_region ON media(geographic_region);
CREATE INDEX IF NOT EXISTS idx_media_date ON media(date);

-- ------------------------------------------------------------------------------
-- 7. GENERIC RESOURCE ABSTRACTION TABLE (NCPOR Ingestion Gateway)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS resources (
    resource_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resource_type TEXT NOT NULL,
    external_source_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    source_system TEXT NOT NULL,
    original_url TEXT,
    provenance JSONB NOT NULL DEFAULT '{}'::jsonb,
    normalized_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    ingestion_status TEXT NOT NULL DEFAULT 'processed' CHECK (ingestion_status IN ('pending', 'processed', 'failed', 'quarantined')),
    ingestion_version TEXT NOT NULL DEFAULT 'v1.0.0-phase1',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_resources_source_system ON resources(source_system);
CREATE INDEX IF NOT EXISTS idx_resources_ext_id ON resources(external_source_id);

-- ------------------------------------------------------------------------------
-- 8. RELATIONSHIP TABLES (MANY-TO-MANY GRAPH LAYER)
-- ------------------------------------------------------------------------------

-- Researcher ↔ Project
CREATE TABLE IF NOT EXISTS researcher_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    researcher_id UUID NOT NULL REFERENCES researchers(researcher_id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'Co-Investigator',
    joined_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(researcher_id, project_id)
);
CREATE INDEX IF NOT EXISTS idx_rp_researcher ON researcher_projects(researcher_id);
CREATE INDEX IF NOT EXISTS idx_rp_project ON researcher_projects(project_id);

-- Project ↔ Expedition
CREATE TABLE IF NOT EXISTS project_expeditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    expedition_id UUID NOT NULL REFERENCES expeditions(expedition_id) ON DELETE CASCADE,
    operational_phase TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, expedition_id)
);
CREATE INDEX IF NOT EXISTS idx_pe_project ON project_expeditions(project_id);
CREATE INDEX IF NOT EXISTS idx_pe_expedition ON project_expeditions(expedition_id);

-- Project ↔ Dataset
CREATE TABLE IF NOT EXISTS project_datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    dataset_id UUID NOT NULL REFERENCES datasets(dataset_id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'Primary Deliverable',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, dataset_id)
);
CREATE INDEX IF NOT EXISTS idx_pd_project ON project_datasets(project_id);
CREATE INDEX IF NOT EXISTS idx_pd_dataset ON project_datasets(dataset_id);

-- Expedition ↔ Dataset
CREATE TABLE IF NOT EXISTS expedition_datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expedition_id UUID NOT NULL REFERENCES expeditions(expedition_id) ON DELETE CASCADE,
    dataset_id UUID NOT NULL REFERENCES datasets(dataset_id) ON DELETE CASCADE,
    collection_station_or_transect TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(expedition_id, dataset_id)
);
CREATE INDEX IF NOT EXISTS idx_ed_expedition ON expedition_datasets(expedition_id);
CREATE INDEX IF NOT EXISTS idx_ed_dataset ON expedition_datasets(dataset_id);

-- Researcher ↔ Publication
CREATE TABLE IF NOT EXISTS researcher_publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    researcher_id UUID NOT NULL REFERENCES researchers(researcher_id) ON DELETE CASCADE,
    publication_id UUID NOT NULL REFERENCES publications(publication_id) ON DELETE CASCADE,
    author_order INT NOT NULL DEFAULT 1,
    is_corresponding BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(researcher_id, publication_id)
);
CREATE INDEX IF NOT EXISTS idx_rpub_researcher ON researcher_publications(researcher_id);
CREATE INDEX IF NOT EXISTS idx_rpub_pub ON researcher_publications(publication_id);

-- Publication ↔ Dataset
CREATE TABLE IF NOT EXISTS publication_datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID NOT NULL REFERENCES publications(publication_id) ON DELETE CASCADE,
    dataset_id UUID NOT NULL REFERENCES datasets(dataset_id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL DEFAULT 'derives_from' CHECK (relation_type IN ('derives_from', 'cites', 'validates', 'supplements')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(publication_id, dataset_id)
);
CREATE INDEX IF NOT EXISTS idx_pubdata_pub ON publication_datasets(publication_id);
CREATE INDEX IF NOT EXISTS idx_pubdata_data ON publication_datasets(dataset_id);

-- Expedition ↔ Media
CREATE TABLE IF NOT EXISTS expedition_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expedition_id UUID NOT NULL REFERENCES expeditions(expedition_id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES media(media_id) ON DELETE CASCADE,
    caption TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(expedition_id, media_id)
);
CREATE INDEX IF NOT EXISTS idx_em_expedition ON expedition_media(expedition_id);
CREATE INDEX IF NOT EXISTS idx_em_media ON expedition_media(media_id);

-- Project ↔ Publication
CREATE TABLE IF NOT EXISTS project_publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    publication_id UUID NOT NULL REFERENCES publications(publication_id) ON DELETE CASCADE,
    grant_or_ack TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, publication_id)
);
CREATE INDEX IF NOT EXISTS idx_ppub_project ON project_publications(project_id);
CREATE INDEX IF NOT EXISTS idx_ppub_pub ON project_publications(publication_id);

-- Project ↔ Media
CREATE TABLE IF NOT EXISTS project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(project_id) ON DELETE CASCADE,
    media_id UUID NOT NULL REFERENCES media(media_id) ON DELETE CASCADE,
    context TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, media_id)
);
CREATE INDEX IF NOT EXISTS idx_pm_project ON project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_pm_media ON project_media(media_id);

-- ------------------------------------------------------------------------------
-- 9. AUTOMATIC TIMESTAMP TRIGGER
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ 
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_name IN ('researchers', 'projects', 'expeditions', 'datasets', 'publications', 'media', 'resources')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trigger_update_timestamp ON %I', tbl);
        EXECUTE format('CREATE TRIGGER trigger_update_timestamp BEFORE UPDATE ON %I FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column()', tbl);
    END LOOP;
END $$;

-- ------------------------------------------------------------------------------
-- 10. ROW LEVEL SECURITY (RLS) POLICIES — PUBLIC READ FOR POLAR REPOSITORY
-- ------------------------------------------------------------------------------
ALTER TABLE researchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE expeditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE researcher_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_expeditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expedition_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE researcher_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE expedition_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;

-- Public read access policies for scientific open access
CREATE POLICY "Public Read Researchers" ON researchers FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Expeditions" ON expeditions FOR SELECT USING (true);
CREATE POLICY "Public Read Datasets" ON datasets FOR SELECT USING (access_level = 'Open Access' OR true);
CREATE POLICY "Public Read Publications" ON publications FOR SELECT USING (true);
CREATE POLICY "Public Read Media" ON media FOR SELECT USING (true);
CREATE POLICY "Public Read Resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Public Read Researcher Projects" ON researcher_projects FOR SELECT USING (true);
CREATE POLICY "Public Read Project Expeditions" ON project_expeditions FOR SELECT USING (true);
CREATE POLICY "Public Read Project Datasets" ON project_datasets FOR SELECT USING (true);
CREATE POLICY "Public Read Expedition Datasets" ON expedition_datasets FOR SELECT USING (true);
CREATE POLICY "Public Read Researcher Publications" ON researcher_publications FOR SELECT USING (true);
CREATE POLICY "Public Read Publication Datasets" ON publication_datasets FOR SELECT USING (true);
CREATE POLICY "Public Read Expedition Media" ON expedition_media FOR SELECT USING (true);
CREATE POLICY "Public Read Project Publications" ON project_publications FOR SELECT USING (true);
CREATE POLICY "Public Read Project Media" ON project_media FOR SELECT USING (true);
