-- ==============================================================================
-- POLARSPHERE AUTHENTICATION & RESEARCHER PROFILES MIGRATION
-- Migration: 20261002_auth_and_profiles.sql
-- "The Polar World, Through India's Eyes"
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked to Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    institution TEXT NOT NULL DEFAULT 'National Centre for Polar and Ocean Research (NCPOR)',
    designation TEXT DEFAULT 'Polar Research Scholar',
    station TEXT DEFAULT 'National Polar Data Center',
    jurisdiction TEXT NOT NULL DEFAULT 'all' CHECK (jurisdiction IN ('all', 'antarctica', 'arctic', 'southern-ocean', 'himalaya')),
    clearance_level TEXT NOT NULL DEFAULT 'LEVEL 3 — RESEARCHER ACCESS',
    is_verified BOOLEAN NOT NULL DEFAULT false,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for high-performance profile lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON public.profiles(institution);

-- ------------------------------------------------------------------------------
-- 2. ROW-LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated or unauthenticated can read public researcher profiles
CREATE POLICY "Public Profiles Read" 
    ON public.profiles 
    FOR SELECT 
    USING (true);

-- Authenticated users can insert their own profile
CREATE POLICY "Users Can Insert Own Profile" 
    ON public.profiles 
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Authenticated users can update only their own profile
CREATE POLICY "Users Can Update Own Profile" 
    ON public.profiles 
    FOR UPDATE 
    USING (auth.uid() = id) 
    WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 3. AUTOMATIC PROFILE CREATION TRIGGER ON AUTH.USERS SIGNUP
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_full_name TEXT;
    v_institution TEXT;
    v_designation TEXT;
    v_station TEXT;
    v_jurisdiction TEXT;
BEGIN
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));
    v_institution := COALESCE(NEW.raw_user_meta_data->>'institution', 'National Centre for Polar and Ocean Research (NCPOR)');
    v_designation := COALESCE(NEW.raw_user_meta_data->>'designation', 'Polar Research Scholar');
    v_station := COALESCE(NEW.raw_user_meta_data->>'station', 'National Polar Data Center');
    v_jurisdiction := COALESCE(NEW.raw_user_meta_data->>'jurisdiction', 'all');

    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        institution,
        designation,
        station,
        jurisdiction,
        clearance_level,
        is_verified
    ) VALUES (
        NEW.id,
        NEW.email,
        v_full_name,
        v_institution,
        v_designation,
        v_station,
        v_jurisdiction,
        'LEVEL 3 — RESEARCHER ACCESS',
        NEW.email_confirmed_at IS NOT NULL
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = now();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if already exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for email verification confirmation
CREATE OR REPLACE FUNCTION public.handle_user_verification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL THEN
        UPDATE public.profiles
        SET is_verified = true, updated_at = now()
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_verified ON auth.users;
CREATE TRIGGER on_auth_user_verified
    AFTER UPDATE OF email_confirmed_at ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_user_verification();
