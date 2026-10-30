-- ============================================================================
-- UNIVERSITY ONLINE APPLICATION & STUDENT MANAGEMENT SYSTEM (MVP)
-- Client: Lungi College of Education, Science & Technology (LungiCEST)
-- Currency: SLE (Sierra Leonean Leone)
-- Database: PostgreSQL (Supabase Compatible)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUMS & CONSTANTS
-- ============================================================================
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM (
        'student',
        'admissions',
        'hod',
        'finance',
        'registry',
        'lecturer',
        'admin'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status_enum AS ENUM (
        'draft',
        'submitted',
        'under_review_admissions',
        'under_review_hod',
        'interview_scheduled',
        'interview_completed',
        'recommended_admit',
        'recommended_reject',
        'returned_for_correction',
        'admitted',
        'rejected'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method_enum AS ENUM (
        'cash_office',
        'bank_deposit_slip',
        'orange_money',
        'afrimoney',
        'direct_transfer'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. USER PROFILES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role user_role_enum NOT NULL DEFAULT 'student',
    department_id UUID,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- 3. ACADEMIC STRUCTURE (Faculties, Departments, Programmes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    hod_profile_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.programmes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES public.departments(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    degree_type TEXT NOT NULL, -- 'Degree', 'Diploma', 'Certificate', 'Master'
    duration_years INTEGER NOT NULL DEFAULT 4,
    tuition_per_semester NUMERIC(12, 2) NOT NULL DEFAULT 6500.00,
    currency TEXT NOT NULL DEFAULT 'SLE',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- 4. ADMISSION CYCLES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.admission_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year TEXT NOT NULL, -- e.g. '2026/2027'
    semester TEXT NOT NULL DEFAULT 'Semester 1',
    application_fee_amount NUMERIC(10, 2) NOT NULL DEFAULT 250.00,
    currency TEXT NOT NULL DEFAULT 'SLE',
    application_start DATE NOT NULL,
    application_deadline DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- 5. FINANCE PAYMENTS & APPLICATION CODES (CRITICAL SINGLE-USE SECURITY)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number TEXT UNIQUE NOT NULL,
    payer_name TEXT NOT NULL,
    payer_email TEXT,
    payer_phone TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'SLE',
    payment_method payment_method_enum NOT NULL,
    bank_reference_number TEXT,
    recorded_by_user_id UUID REFERENCES public.profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.application_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- Format: APP-XXXX-XXXX-XXXX
    payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE RESTRICT,
    cycle_id UUID NOT NULL REFERENCES public.admission_cycles(id) ON DELETE RESTRICT,
    issued_to_name TEXT NOT NULL,
    issued_to_email TEXT,
    is_redeemed BOOLEAN DEFAULT FALSE NOT NULL,
    redeemed_at TIMESTAMPTZ,
    redeemed_by_application_id UUID, -- Foreign key linked after application insertion
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_application_codes_code ON public.application_codes(code);
CREATE INDEX IF NOT EXISTS idx_application_codes_status ON public.application_codes(is_redeemed, expires_at);

-- ============================================================================
-- 6. APPLICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number TEXT UNIQUE NOT NULL, -- e.g. LCEST-2026-0001
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    cycle_id UUID NOT NULL REFERENCES public.admission_cycles(id) ON DELETE RESTRICT,
    first_choice_programme_id UUID NOT NULL REFERENCES public.programmes(id),
    second_choice_programme_id UUID REFERENCES public.programmes(id),
    application_code_id UUID NOT NULL UNIQUE REFERENCES public.application_codes(id),
    
    -- Status progression
    status application_status_enum NOT NULL DEFAULT 'submitted',
    
    -- Student Profile details snapshot
    personal_info JSONB NOT NULL DEFAULT '{}'::jsonb,
    academic_history JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Admissions Office verification
    admissions_verified BOOLEAN DEFAULT FALSE,
    admissions_verified_by UUID REFERENCES public.profiles(id),
    admissions_verified_at TIMESTAMPTZ,
    admissions_notes TEXT,
    
    -- HOD Review
    hod_status TEXT DEFAULT 'pending', -- 'approved', 'rejected', 'correction_required'
    hod_reviewed_by UUID REFERENCES public.profiles(id),
    hod_reviewed_at TIMESTAMPTZ,
    hod_comments TEXT,
    
    submitted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add backlink constraint from application_codes to applications
ALTER TABLE public.application_codes 
    DROP CONSTRAINT IF EXISTS fk_application_codes_application,
    ADD CONSTRAINT fk_application_codes_application 
    FOREIGN KEY (redeemed_by_application_id) 
    REFERENCES public.applications(id) ON DELETE SET NULL;

-- ============================================================================
-- 7. INTERVIEWS & ADMISSION DECISIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMPTZ NOT NULL,
    venue_or_link TEXT NOT NULL DEFAULT 'LungiCEST Main Campus, Hall A',
    interviewers_notes TEXT,
    score NUMERIC(5, 2),
    recommendation TEXT, -- 'Admit', 'Reject', 'Pending'
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.admission_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID UNIQUE NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    decision TEXT NOT NULL, -- 'ADMITTED', 'REJECTED', 'PROVISIONAL'
    admission_letter_number TEXT UNIQUE,
    approved_programme_id UUID NOT NULL REFERENCES public.programmes(id),
    academic_year TEXT NOT NULL,
    start_date DATE,
    conditions TEXT,
    decided_by UUID REFERENCES public.profiles(id),
    decision_date TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- 8. DOCUMENTS, RECEIPTS & NOTIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    document_type TEXT NOT NULL, -- 'wassce_slip', 'birth_certificate', 'recommendation', 'passport_photo'
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================================================
-- 9. ATOMIC TRANSACTION: SINGLE-USE APPLICATION CODE REDEMPTION
-- ============================================================================
-- This function guarantees race condition prevention using row-level locking
-- (FOR UPDATE) in a single database transaction. Two simultaneous users cannot
-- redeem the same code.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.redeem_application_voucher(
    p_code TEXT,
    p_user_id UUID,
    p_cycle_id UUID,
    p_first_choice_id UUID,
    p_second_choice_id UUID,
    p_personal_info JSONB,
    p_academic_history JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_code_record public.application_codes%ROWTYPE;
    v_new_app_id UUID;
    v_app_number TEXT;
    v_year TEXT;
    v_seq INT;
BEGIN
    -- Normalize code format (trim whitespace and uppercase)
    p_code := UPPER(TRIM(p_code));

    -- Acquire row lock on the code to prevent race conditions
    SELECT * INTO v_code_record
    FROM public.application_codes
    WHERE code = p_code
    FOR UPDATE;

    -- 1. Check code existence
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid application voucher code. Please check and try again.';
    END IF;

    -- 2. Check if already redeemed
    IF v_code_record.is_redeemed THEN
        RAISE EXCEPTION 'This application code has already been redeemed and cannot be reused.';
    END IF;

    -- 3. Check expiry
    IF v_code_record.expires_at < NOW() THEN
        RAISE EXCEPTION 'This application code has expired. Please contact the Finance Office.';
    END IF;

    -- 4. Check cycle compatibility
    IF v_code_record.cycle_id <> p_cycle_id THEN
        RAISE EXCEPTION 'This application code belongs to a different admission cycle.';
    END IF;

    -- Generate sequential Application Number: LCEST-YYYY-XXXXX
    v_year := TO_CHAR(NOW(), 'YYYY');
    SELECT COUNT(*) + 1 INTO v_seq FROM public.applications;
    v_app_number := 'LCEST-' || v_year || '-' || LPAD(v_seq::text, 4, '0');

    -- Insert new Application record
    INSERT INTO public.applications (
        application_number,
        user_id,
        cycle_id,
        first_choice_programme_id,
        second_choice_programme_id,
        application_code_id,
        status,
        personal_info,
        academic_history,
        submitted_at
    ) VALUES (
        v_app_number,
        p_user_id,
        p_cycle_id,
        p_first_choice_id,
        p_second_choice_id,
        v_code_record.id,
        'submitted',
        p_personal_info,
        p_academic_history,
        NOW()
    )
    RETURNING id INTO v_new_app_id;

    -- Permanently mark the code as redeemed and link it
    UPDATE public.application_codes
    SET is_redeemed = TRUE,
        redeemed_at = NOW(),
        redeemed_by_application_id = v_new_app_id
    WHERE id = v_code_record.id;

    -- Record Audit Log
    INSERT INTO public.audit_logs (actor_id, action, table_name, record_id, details)
    VALUES (
        p_user_id,
        'REDEEM_CODE_AND_SUBMIT',
        'applications',
        v_new_app_id::text,
        jsonb_build_object(
            'code', p_code,
            'application_number', v_app_number,
            'timestamp', NOW()
        )
    );

    -- Notify Student
    INSERT INTO public.notifications (user_id, title, message, link_url)
    VALUES (
        p_user_id,
        'Application Submitted Successfully',
        'Your application ' || v_app_number || ' has been received. You can now track its review status.',
        '/student/tracking'
    );

    RETURN jsonb_build_object(
        'success', TRUE,
        'application_id', v_new_app_id,
        'application_number', v_app_number,
        'message', 'Application submitted and payment code validated successfully.'
    );
END;
$$;

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role_enum
LANGUAGE sql
STABLE
AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- Profiles: Users see their own; Staff and Admin see all
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (id = auth.uid() OR public.current_user_role() IN ('admin', 'admissions', 'hod', 'finance', 'registry'));

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (id = auth.uid());

-- Applications: Students see own applications; Staff see based on role
CREATE POLICY "Students view own applications"
    ON public.applications FOR SELECT
    USING (
        user_id = auth.uid() 
        OR public.current_user_role() IN ('admin', 'admissions', 'registry', 'hod')
    );

CREATE POLICY "Admissions and HOD can update application review"
    ON public.applications FOR UPDATE
    USING (public.current_user_role() IN ('admin', 'admissions', 'hod'));

-- Finance Payments & Application Codes:
CREATE POLICY "Finance and Admin view and create payments"
    ON public.payments FOR ALL
    USING (public.current_user_role() IN ('admin', 'finance'));

CREATE POLICY "Finance and Admin manage application codes"
    ON public.application_codes FOR ALL
    USING (public.current_user_role() IN ('admin', 'finance'));

CREATE POLICY "Students can check code status"
    ON public.application_codes FOR SELECT
    USING (TRUE);

-- Documents: Students view and upload their own; Admissions & Admin view
CREATE POLICY "Students manage own documents"
    ON public.documents FOR ALL
    USING (
        user_id = auth.uid() 
        OR public.current_user_role() IN ('admin', 'admissions', 'hod', 'registry')
    );

-- Notifications: Users only see their own
CREATE POLICY "Users view own notifications"
    ON public.notifications FOR ALL
    USING (user_id = auth.uid());
