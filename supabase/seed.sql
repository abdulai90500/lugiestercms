-- ============================================================================
-- SEED DATA: Lungi College of Education, Science & Technology (LungiCEST)
-- Currency: SLE (Sierra Leonean Leone)
-- ============================================================================

-- 1. Departments & Faculties
INSERT INTO public.departments (id, faculty_name, department_name, code)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Faculty of Information & Communication Technology', 'Software Engineering & IT', 'FICT'),
    ('22222222-2222-2222-2222-222222222222', 'Faculty of Business & Globalisation', 'Business Administration', 'FBG'),
    ('33333333-3333-3333-3333-333333333333', 'Faculty of Design Innovation', 'Creative Multimedia', 'FDI'),
    ('44444444-4444-4444-4444-444444444444', 'Faculty of Architecture & Built Environment', 'Architecture & Interior Design', 'FABE')
ON CONFLICT (code) DO NOTHING;

-- 2. Programmes Offered
INSERT INTO public.programmes (id, department_id, name, code, degree_type, duration_years, tuition_per_semester, currency)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'BSc (Hons) in Software Engineering', 'BSE', 'Degree', 4, 6500.00, 'SLE'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'BSc (Hons) in Information Technology', 'BIT', 'Degree', 4, 6000.00, 'SLE'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'BSc (Hons) in Cyber Security', 'BCS', 'Degree', 4, 6800.00, 'SLE'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'BSc (Hons) in International Business', 'BIB', 'Degree', 3, 5500.00, 'SLE'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'BSc (Hons) in Accounting & Finance', 'BAF', 'Degree', 4, 5800.00, 'SLE'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'Diploma in Multimedia & Graphic Design', 'DMD', 'Diploma', 2, 4200.00, 'SLE'),
    ('gggggggg-gggg-gggg-gggg-gggggggggggg', '44444444-4444-4444-4444-444444444444', 'BSc (Hons) in Interior Architecture', 'BIA', 'Degree', 4, 6200.00, 'SLE')
ON CONFLICT (code) DO NOTHING;

-- 3. Active Admission Cycle
INSERT INTO public.admission_cycles (id, academic_year, semester, application_fee_amount, currency, application_start, application_deadline, is_active)
VALUES 
    ('c0000000-0000-0000-0000-000000000001', '2026/2027', 'Semester 1 (September Intake)', 250.00, 'SLE', '2026-08-01', '2026-11-30', TRUE)
ON CONFLICT DO NOTHING;

-- 4. Sample Finance Payment Records
INSERT INTO public.payments (id, receipt_number, payer_name, payer_email, payer_phone, amount, currency, payment_method, bank_reference_number, notes)
VALUES
    ('p1111111-1111-1111-1111-111111111111', 'REC-2026-0891', 'Ibrahim S. Bangura', 'ibrahim.bangura@gmail.com', '+232 76 123456', 250.00, 'SLE', 'bank_deposit_slip', 'SL-CB-90214-A', 'Verified Rokel Commercial Bank slip'),
    ('p2222222-2222-2222-2222-222222222222', 'REC-2026-0892', 'Fatmata Sesay', 'fatmata.sesay@gmail.com', '+232 78 889900', 250.00, 'SLE', 'orange_money', 'OM-SL-882190', 'Orange Money SMS confirmation verified'),
    ('p3333333-3333-3333-3333-333333333333', 'REC-2026-0893', 'Mohamed Kamara', 'mohamed.kamara@gmail.com', '+232 79 443322', 250.00, 'SLE', 'cash_office', 'CASH-REC-0012', 'Paid at Finance Cashier Counter'),
    ('p4444444-4444-4444-4444-444444444444', 'REC-2026-0894', 'Mariama Conteh', 'mariama.conteh@gmail.com', '+232 77 556677', 250.00, 'SLE', 'afrimoney', 'AF-SL-330192', 'Afrimoney direct transfer')
ON CONFLICT (receipt_number) DO NOTHING;

-- 5. Verified Single-Use Application Codes
INSERT INTO public.application_codes (id, code, payment_id, cycle_id, issued_to_name, issued_to_email, is_redeemed, expires_at)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'APP-7K9M-X4PQ-2D6R', 'p1111111-1111-1111-1111-111111111111', 'c0000000-0000-0000-0000-000000000001', 'Ibrahim S. Bangura', 'ibrahim.bangura@gmail.com', FALSE, NOW() + INTERVAL '90 days'),
    ('c2222222-2222-2222-2222-222222222222', 'APP-3V8L-9W1C-5H2J', 'p2222222-2222-2222-2222-222222222222', 'c0000000-0000-0000-0000-000000000001', 'Fatmata Sesay', 'fatmata.sesay@gmail.com', FALSE, NOW() + INTERVAL '90 days'),
    ('c3333333-3333-3333-3333-333333333333', 'APP-8M4T-2Y7N-1K9P', 'p3333333-3333-3333-3333-333333333333', 'c0000000-0000-0000-0000-000000000001', 'Mohamed Kamara', 'mohamed.kamara@gmail.com', FALSE, NOW() + INTERVAL '90 days'),
    ('c4444444-4444-4444-4444-444444444444', 'APP-LCEST-2026-TEST', 'p4444444-4444-4444-4444-444444444444', 'c0000000-0000-0000-0000-000000000001', 'Mariama Conteh', 'mariama.conteh@gmail.com', FALSE, NOW() + INTERVAL '90 days')
ON CONFLICT (code) DO NOTHING;
