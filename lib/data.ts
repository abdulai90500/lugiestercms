import { Programme, ApplicationCode, ApplicationRecord, PaymentRecord, UserProfile } from './types';

// ──────────────────────────────────────────────────────────────────────────────
// INSTITUTION CONSTANTS
// ──────────────────────────────────────────────────────────────────────────────
export const INSTITUTION = {
  name: 'Lungi College of Education Science & Technology',
  shortName: 'LUNGICEST',
  tagline: 'Education that transforms communities',
  subTagline: 'Learning with purpose. Growing together.',
  established: '2021',
  location: 'Lungi, Sierra Leone',
  district: 'Port Loko District, Kaffu Bullom',
  email: 'info@lungicest.edu.sl',
  phone: '+232 77 528393',
  whatsapp: '+232 77 528393',
  whatsappUrl: 'https://wa.me/23277528393?text=Hello%20LUNGICEST%2C%20I%20would%20like%20to%20enquire%20about%20registration.',
  website: 'www.lungicest.edu.sl',
  affiliation: 'Milton Margai Technical University (MMTU)',
  accreditation: 'Accredited by TEC & NCTVA',
  registrar: 'Finda Sesay',
  currency: 'SLE',
};

// ──────────────────────────────────────────────────────────────────────────────
// PROGRAMMES (01 – 05 categories, full catalogue)
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_PROGRAMMES: Programme[] = [

  // ── 01 BACHELOR'S DEGREE — B.Ed. ──────────────────────────────────────────
  { id: 'prog-bed-01', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Early Childhood Education', code: 'BED-ECE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-02', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Educational Administration and Management', code: 'BED-EAM', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-03', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Educational Guidance and Counselling', code: 'BED-EGC', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-04', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. English', code: 'BED-ENG', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-05', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. French', code: 'BED-FRE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-06', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Measurement and Evaluation', code: 'BED-MEV', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-07', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Performing Arts', code: 'BED-PFA', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-08', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Physical Health Education', code: 'BED-PHE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-09', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Religious Studies', code: 'BED-RES', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-10', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Business Studies', code: 'BED-BUS', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bed-11', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'B.Ed. Visual Arts (Fine and Applied Arts)', code: 'BED-VAA', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },

  // ── 01 BACHELOR'S DEGREE — B.Tech. ────────────────────────────────────────
  { id: 'prog-btech-01', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'B.Tech. Automobile Engineering', code: 'BTE-AUE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4500, currency: 'SLE' },
  { id: 'prog-btech-02', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'B.Tech. Building and Civil Engineering', code: 'BTE-BCE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4500, currency: 'SLE' },
  { id: 'prog-btech-03', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'B.Tech. Electrical and Electronics Engineering', code: 'BTE-EEE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4500, currency: 'SLE' },
  { id: 'prog-btech-04', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'B.Tech. Information Technology', code: 'BTE-ITE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4500, currency: 'SLE' },
  { id: 'prog-btech-05', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'B.Tech. Mechanical Engineering', code: 'BTE-MEE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4500, currency: 'SLE' },

  // ── 01 BACHELOR'S DEGREE — B.Sc. (Science, Computing & Agriculture) ───────
  { id: 'prog-bsc-01', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Agricultural Education', code: 'BSC-AEd', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-02', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Agricultural Science (General)', code: 'BSC-AGS', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-03', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Biology', code: 'BSC-BIO', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-04', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Chemistry', code: 'BSC-CHM', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-05', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Community Development Studies / Agricultural Science', code: 'BSC-CDA', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-06', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Community Development Studies / Home Science', code: 'BSC-CDH', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-07', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Computer Science', code: 'BSC-CPS', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4500, currency: 'SLE' },
  { id: 'prog-bsc-08', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Home Science', code: 'BSC-HMS', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bsc-09', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Laboratory Technology', code: 'BSC-LAT', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bsc-10', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Mathematics', code: 'BSC-MTH', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-11', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Nutrition and Dietetics', code: 'BSC-NUD', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bsc-12', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Physics', code: 'BSC-PHY', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bsc-13', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'B.Sc. Public Health', code: 'BSC-PUH', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },

  // ── 01 BACHELOR'S DEGREE — B.Sc. (Business & Finance) ────────────────────
  { id: 'prog-bscb-01', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Accounting and Finance', code: 'BSB-ACF', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bscb-02', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Banking and Finance', code: 'BSB-BAF', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bscb-03', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Business Administration — Human Resource Management', code: 'BSB-HRM', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bscb-04', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Business Administration — Marketing', code: 'BSB-MKT', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bscb-05', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Business Administration — Procurement and Logistics', code: 'BSB-PRL', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bscb-06', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Business Administration — Transportation Economics', code: 'BSB-TRE', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4200, currency: 'SLE' },
  { id: 'prog-bscb-07', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Insurance', code: 'BSB-INS', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 4000, currency: 'SLE' },
  { id: 'prog-bscb-08', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Secretarial Studies', code: 'BSB-SEC', degreeType: 'Degree', durationYears: 3, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-bscb-09', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'B.Sc. Hotel and Tourism', code: 'BSB-HOT', degreeType: 'Degree', durationYears: 3, tuitionPerSemester: 4000, currency: 'SLE' },

  // ── 01 BACHELOR'S DEGREE — B.A. ───────────────────────────────────────────
  { id: 'prog-ba-01', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'B.A. International Relations', code: 'BAR-INR', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-ba-02', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'B.A. Public Administration', code: 'BAR-PUA', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-ba-03', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'B.A. Peace and Conflict Studies', code: 'BAR-PCS', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },
  { id: 'prog-ba-04', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'B.A. Population and Family Life Education', code: 'BAR-PFL', degreeType: 'Degree', durationYears: 4, tuitionPerSemester: 3800, currency: 'SLE' },

  // ── 02 NATIONAL DIPLOMA — Business, Finance & Administration ─────────────
  { id: 'prog-nd-bus-01', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Accounting and Finance', code: 'ND-ACF', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2500, currency: 'SLE' },
  { id: 'prog-nd-bus-02', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Banking and Finance', code: 'ND-BAF', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2500, currency: 'SLE' },
  { id: 'prog-nd-bus-03', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Business Administration', code: 'ND-BUA', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2500, currency: 'SLE' },
  { id: 'prog-nd-bus-04', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Co-operative and Rural Development Studies', code: 'ND-CRD', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-bus-05', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Human Resource Management', code: 'ND-HRM', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2500, currency: 'SLE' },
  { id: 'prog-nd-bus-06', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Insurance', code: 'ND-INS', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-bus-07', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Marketing', code: 'ND-MKT', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-bus-08', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Procurement and Logistics', code: 'ND-PRL', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-bus-09', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Secretarial Studies', code: 'ND-SEC', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-bus-10', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND/HND Transportation Economics', code: 'ND-TRE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },

  // ── 02 NATIONAL DIPLOMA — Engineering, Construction & Surveying ───────────
  { id: 'prog-nd-eng-01', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Architectural Technology', code: 'ND-ARC', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-02', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Automobile Engineering', code: 'ND-AUE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-03', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Building and Civil Engineering', code: 'ND-BCE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-04', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Building Engineering', code: 'ND-BUE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-05', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Electrical and Electronics Engineering', code: 'ND-EEE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-06', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Mechanical Engineering', code: 'ND-MEE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-07', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Marine Engineering', code: 'ND-MAE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 3000, currency: 'SLE' },
  { id: 'prog-nd-eng-08', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Mining Engineering', code: 'ND-MNE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 3000, currency: 'SLE' },
  { id: 'prog-nd-eng-09', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Petroleum Engineering', code: 'ND-PTE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 3200, currency: 'SLE' },
  { id: 'prog-nd-eng-10', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Photographic Engineering', code: 'ND-PHE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2600, currency: 'SLE' },
  { id: 'prog-nd-eng-11', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Quantity Surveying', code: 'ND-QSU', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-12', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Surveying', code: 'ND-SUR', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-13', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND/HND Geographical Information System (GIS)', code: 'ND-GIS', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-eng-14', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'ND General Photography', code: 'ND-GPH', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2600, currency: 'SLE' },

  // ── 02 NATIONAL DIPLOMA — Education, Humanities & Social Sciences ─────────
  { id: 'prog-nd-edu-01', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Civic Education', code: 'ND-CIV', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-02', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Cultural Studies', code: 'ND-CUS', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-03', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Education', code: 'ND-EDU', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-04', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND French', code: 'ND-FRE', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-05', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Performing Arts (Music and Theatre Arts)', code: 'ND-PFA', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-edu-06', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Religious Studies', code: 'ND-RES', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-07', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND RH/HIV/AIDS Counselling', code: 'ND-RHC', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-edu-08', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Sports Coaching and Management', code: 'ND-SCM', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-edu-09', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'ND/HND Visual Arts (Fine and Applied Arts)', code: 'ND-VAA', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-edu-10', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'ND/HND International Relations', code: 'ND-INR', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-11', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'ND/HND Peace and Conflict Studies', code: 'ND-PCS', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-12', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'ND/HND Population and Family Life Education', code: 'ND-PFL', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-edu-13', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'ND/HND Social Work', code: 'ND-SWK', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },

  // ── 02 NATIONAL DIPLOMA — Agriculture, Health & Applied Sciences ──────────
  { id: 'prog-nd-agr-01', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Agricultural/Fish Farming', code: 'ND-AFF', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-agr-02', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Animal Production and Health', code: 'ND-APH', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-agr-03', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Community Development Studies / Agricultural Science', code: 'ND-CDA', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-agr-04', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Community Development Studies / Health', code: 'ND-CDH', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2200, currency: 'SLE' },
  { id: 'prog-nd-agr-05', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Diagnostic Laboratory Technology', code: 'ND-DLT', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2800, currency: 'SLE' },
  { id: 'prog-nd-agr-06', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Interior Decoration and Designing', code: 'ND-IDD', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-agr-07', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Laboratory Technology', code: 'ND-LAT', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2600, currency: 'SLE' },
  { id: 'prog-nd-agr-08', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Computer Science', code: 'ND-CPS', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2600, currency: 'SLE' },
  { id: 'prog-nd-agr-09', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Public Health', code: 'ND-PUH', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2600, currency: 'SLE' },
  { id: 'prog-nd-agr-10', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'ND Veterinary Technology', code: 'ND-VET', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2600, currency: 'SLE' },

  // ── 02 NATIONAL DIPLOMA — Hospitality & Tourism ───────────────────────────
  { id: 'prog-nd-hot-01', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND Food and Beverage Production Services', code: 'ND-FBP', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-hot-02', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND Front Office and Housekeeping', code: 'ND-FOH', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-hot-03', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND Hospitality Innovation / Hotel Management', code: 'ND-HIM', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-hot-04', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND Hotel and Catering Management', code: 'ND-HCM', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },
  { id: 'prog-nd-hot-05', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'ND Tourism Management', code: 'ND-TRM', degreeType: 'Diploma', durationYears: 2, tuitionPerSemester: 2400, currency: 'SLE' },

  // ── 03 CERTIFICATES & NTC ─────────────────────────────────────────────────
  { id: 'prog-cert-01', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'Certificate in Business Studies', code: 'CRT-BUS', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1500, currency: 'SLE' },
  { id: 'prog-cert-02', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'Certificate in Co-operative and Rural Development Studies', code: 'CRT-CRD', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-03', departmentId: 'dept-bus', facultyName: 'Faculty of Business & Finance', name: 'Certificate in Secretarial Studies', code: 'CRT-SEC', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-04', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate in Arts and Crafts', code: 'CRT-ARC', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-05', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate in French', code: 'CRT-FRE', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-06', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate in Performing Arts', code: 'CRT-PFA', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-07', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate in Religious Studies', code: 'CRT-RES', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-08', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate in Visual Arts', code: 'CRT-VAA', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-09', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate in Early Childhood Education', code: 'CRT-ECE', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-10', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Teacher Certificate French (TC)', code: 'CRT-TCF', degreeType: 'Certificate', durationYears: 2, tuitionPerSemester: 1600, currency: 'SLE' },
  { id: 'prog-cert-11', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Electrical Installation', code: 'NTC-ELI', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1600, currency: 'SLE' },
  { id: 'prog-cert-12', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Masonry', code: 'NTC-MAS', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1500, currency: 'SLE' },
  { id: 'prog-cert-13', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Metal Work and Welding', code: 'NTC-MWW', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1500, currency: 'SLE' },
  { id: 'prog-cert-14', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Plumbing', code: 'NTC-PLB', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1500, currency: 'SLE' },
  { id: 'prog-cert-15', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Refrigeration and Air Conditioning', code: 'NTC-RAC', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1600, currency: 'SLE' },
  { id: 'prog-cert-16', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Solar Electrification', code: 'NTC-SOL', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1600, currency: 'SLE' },
  { id: 'prog-cert-17', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'NTC Tiling', code: 'NTC-TIL', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-18', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'Certificate Geographical Information System (GIS)', code: 'CRT-GIS', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-cert-19', departmentId: 'dept-tech', facultyName: 'Faculty of Technology & Engineering', name: 'Certificate Petroleum Engineering', code: 'CRT-PTE', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 2000, currency: 'SLE' },
  { id: 'prog-cert-20', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'Certificate Animal Production and Health', code: 'CRT-APH', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1500, currency: 'SLE' },
  { id: 'prog-cert-21', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'Certificate Public Health', code: 'CRT-PUH', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1600, currency: 'SLE' },
  { id: 'prog-cert-22', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'Certificate Veterinary Technology', code: 'CRT-VET', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1600, currency: 'SLE' },
  { id: 'prog-cert-23', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'Certificate Statistics', code: 'CRT-STA', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1500, currency: 'SLE' },
  { id: 'prog-cert-24', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate Tailoring and Dressmaking', code: 'CRT-TDM', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-25', departmentId: 'dept-soc', facultyName: 'Faculty of Social Sciences & Humanities', name: 'Certificate Population and Family Life Education', code: 'CRT-PFL', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-26', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'Certificate Sports Coaching and Management', code: 'CRT-SCM', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },
  { id: 'prog-cert-27', departmentId: 'dept-sci', facultyName: 'Faculty of Science, Computing & Agriculture', name: 'Certificate RH/HIV/AIDS Counselling', code: 'CRT-RHC', degreeType: 'Certificate', durationYears: 1, tuitionPerSemester: 1400, currency: 'SLE' },

  // ── 04 TEACHER TRAINING — HTC ─────────────────────────────────────────────
  { id: 'prog-htc-01', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Business and Management Studies', code: 'HTC-BMS', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-02', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Secretarial Studies', code: 'HTC-SEC', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-03', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Early Childhood Education', code: 'HTC-ECE', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-04', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC English / Indigenous Language', code: 'HTC-EIL', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-05', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC English / French', code: 'HTC-EFR', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-06', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Performing Arts', code: 'HTC-PFA', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-07', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Physical Health Education', code: 'HTC-PHE', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-08', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Agricultural Science', code: 'HTC-AGS', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-09', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Home Science', code: 'HTC-HMS', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-10', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Integrated Science', code: 'HTC-ISC', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 1800, currency: 'SLE' },
  { id: 'prog-htc-11', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Mathematics and Computer Science', code: 'HTC-MCS', degreeType: 'Certificate', durationYears: 3, tuitionPerSemester: 2000, currency: 'SLE' },
  { id: 'prog-htc-12', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Social Studies — Economics', code: 'HTC-SSE', degreeType: 'Certificate', durationYears: 3 },
  { id: 'prog-htc-13', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Social Studies — Geography', code: 'HTC-SSG', degreeType: 'Certificate', durationYears: 3 },
  { id: 'prog-htc-14', departmentId: 'dept-edu', facultyName: 'Faculty of Education', name: 'HTC Social Studies — History', code: 'HTC-SSH', degreeType: 'Certificate', durationYears: 3 },

  // ── 05 VOCATIONAL & SKILLS-TRAINING INITIATIVES ───────────────────────────
  { id: 'prog-voc-01', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Cybersecurity and Coding', code: 'VOC-CSC', degreeType: 'Vocational', durationYears: 1, studyMode: 'Practical Hands-on' },
  { id: 'prog-voc-02', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Plumbing and Carpentry', code: 'VOC-PLC', degreeType: 'Vocational', durationYears: 1, studyMode: 'Apprenticeship' },
  { id: 'prog-voc-03', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Agriculture and Animal Husbandry', code: 'VOC-AAH', degreeType: 'Vocational', durationYears: 1, studyMode: 'Field Practice' },
  { id: 'prog-voc-04', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Automobile Engineering Skills', code: 'VOC-AUE', degreeType: 'Vocational', durationYears: 1, studyMode: 'Workshop Intensive' },
  { id: 'prog-voc-05', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Hairdressing & Cosmetology', code: 'VOC-HDC', degreeType: 'Vocational', durationYears: 1, studyMode: 'Studio Training' },
  { id: 'prog-voc-06', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Cooling and Refrigeration Systems', code: 'VOC-CRS', degreeType: 'Vocational', durationYears: 1, studyMode: 'Technical Workshop' },
  { id: 'prog-voc-07', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Soap Making & Detergent Production', code: 'VOC-SMD', degreeType: 'Vocational', durationYears: 1, studyMode: 'Laboratory & Production' },
  { id: 'prog-voc-08', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Baking and Confectionery', code: 'VOC-BKC', degreeType: 'Vocational', durationYears: 1, studyMode: 'Culinary Studio' },
  { id: 'prog-voc-09', departmentId: 'dept-voc', facultyName: 'Vocational & Skills Initiatives', name: 'Climate Change Adaptation & Green Skills (CAGE)', code: 'VOC-CCA', degreeType: 'Vocational', durationYears: 1, studyMode: 'Environmental Project' },
];

// ──────────────────────────────────────────────────────────────────────────────
// PAYMENTS
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    receiptNumber: 'REC-2026-0891',
    payerName: 'Ibrahim S. Bangura',
    payerEmail: 'ibrahim.bangura@gmail.com',
    payerPhone: '+232 76 123456',
    amount: 250,
    currency: 'SLE',
    paymentMethod: 'bank_deposit_slip',
    bankReference: 'SL-CB-90214-A',
    recordedBy: 'Finance Cashier (Alpha Mansaray)',
    createdAt: '2026-10-25T09:14:00Z',
    notes: 'Rokel Commercial Bank deposit slip verified'
  },
  {
    id: 'pay-2',
    receiptNumber: 'REC-2026-0892',
    payerName: 'Fatmata Sesay',
    payerEmail: 'fatmata.sesay@gmail.com',
    payerPhone: '+232 78 889900',
    amount: 250,
    currency: 'SLE',
    paymentMethod: 'orange_money',
    bankReference: 'OM-SL-882190',
    recordedBy: 'Finance Cashier (Alpha Mansaray)',
    createdAt: '2026-10-25T11:30:00Z',
    notes: 'Orange Money transaction verified'
  },
  {
    id: 'pay-3',
    receiptNumber: 'REC-2026-0893',
    payerName: 'Mohamed Kamara',
    payerEmail: 'mohamed.kamara@gmail.com',
    payerPhone: '+232 79 443322',
    amount: 250,
    currency: 'SLE',
    paymentMethod: 'cash_office',
    bankReference: 'CASH-REC-0012',
    recordedBy: 'Finance Cashier (Alpha Mansaray)',
    createdAt: '2026-10-26T08:45:00Z',
    notes: 'Paid at College Cash Office'
  },
  {
    id: 'pay-4',
    receiptNumber: 'REC-2026-0894',
    payerName: 'Mariama Conteh',
    payerEmail: 'mariama.conteh@gmail.com',
    payerPhone: '+232 77 556677',
    amount: 250,
    currency: 'SLE',
    paymentMethod: 'afrimoney',
    bankReference: 'AF-SL-330192',
    recordedBy: 'Finance Cashier (Alpha Mansaray)',
    createdAt: '2026-10-26T14:20:00Z',
    notes: 'Afrimoney payment confirmation slip'
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// SINGLE-USE VOUCHER CODES
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_CODES: ApplicationCode[] = [
  {
    id: 'code-luct-1',
    code: '7K4P9QXR',
    paymentId: 'pay-luct-1',
    receiptNumber: 'CMB-2026-0041',
    issuedToName: 'Alhaji M. Kamara',
    issuedToEmail: 'applicant@example.com',
    isRedeemed: false,
    expiresAt: '2028-01-31T23:59:59Z',
    createdAt: '2026-10-25T10:00:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-luct-2',
    code: 'LCEST2026',
    paymentId: 'pay-luct-2',
    receiptNumber: 'CMB-2026-0099',
    issuedToName: 'Mariama Conteh',
    issuedToEmail: 'mariama.conteh@gmail.com',
    isRedeemed: false,
    expiresAt: '2028-01-31T23:59:59Z',
    createdAt: '2026-10-25T10:00:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-luct-legacy',
    code: 'LUCT2026',
    paymentId: 'pay-luct-legacy',
    receiptNumber: 'CMB-2026-0099-LEGACY',
    issuedToName: 'Mariama Conteh',
    issuedToEmail: 'mariama.conteh@gmail.com',
    isRedeemed: false,
    expiresAt: '2028-01-31T23:59:59Z',
    createdAt: '2026-10-25T10:00:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-1',
    code: 'APP-7K9M-X4PQ-2D6R',
    paymentId: 'pay-1',
    receiptNumber: 'REC-2026-0891',
    issuedToName: 'Ibrahim S. Bangura',
    issuedToEmail: 'ibrahim.bangura@gmail.com',
    isRedeemed: false,
    expiresAt: '2027-01-31T23:59:59Z',
    createdAt: '2026-10-25T09:15:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-2',
    code: 'APP-3V8L-9W1C-5H2J',
    paymentId: 'pay-2',
    receiptNumber: 'REC-2026-0892',
    issuedToName: 'Fatmata Sesay',
    issuedToEmail: 'fatmata.sesay@gmail.com',
    isRedeemed: false,
    expiresAt: '2027-01-31T23:59:59Z',
    createdAt: '2026-10-25T11:32:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-3',
    code: 'APP-8M4T-2Y7N-1K9P',
    paymentId: 'pay-3',
    receiptNumber: 'REC-2026-0893',
    issuedToName: 'Mohamed Kamara',
    issuedToEmail: 'mohamed.kamara@gmail.com',
    isRedeemed: false,
    expiresAt: '2027-01-31T23:59:59Z',
    createdAt: '2026-10-26T08:46:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-4',
    code: 'APP-LCST-2026-TEST',
    paymentId: 'pay-4',
    receiptNumber: 'REC-2026-0894',
    issuedToName: 'Mariama Conteh',
    issuedToEmail: 'mariama.conteh@gmail.com',
    isRedeemed: false,
    expiresAt: '2027-01-31T23:59:59Z',
    createdAt: '2026-10-26T14:22:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-5',
    code: 'APP-LCEST-2026-TEST',
    paymentId: 'pay-5',
    receiptNumber: 'REC-2026-0895',
    issuedToName: 'Finda Sesay',
    issuedToEmail: 'finda.sesay@gmail.com',
    isRedeemed: false,
    expiresAt: '2027-01-31T23:59:59Z',
    createdAt: '2026-10-26T15:00:00Z',
    amount: 250,
    currency: 'SLE'
  },
  {
    id: 'code-used',
    code: 'APP-ALREADY-USED-99',
    paymentId: 'pay-used',
    receiptNumber: 'REC-2026-0001',
    issuedToName: 'Sorie Koroma',
    issuedToEmail: 'sorie.koroma@gmail.com',
    isRedeemed: true,
    redeemedAt: '2026-10-20T10:00:00Z',
    redeemedByApplicationId: 'app-demo-admitted',
    expiresAt: '2027-01-31T23:59:59Z',
    createdAt: '2026-10-19T10:00:00Z',
    amount: 250,
    currency: 'SLE'
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// DEMO APPLICATIONS
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-demo-1',
    applicationNumber: 'LCST-2026-0001',
    userId: 'user-demo-1',
    userEmail: 'alhassan.turay@gmail.com',
    codeId: 'code-prev-1',
    codeUsed: 'APP-9988-7766-5544',
    status: 'under_review_hod',
    firstChoiceProgramme: INITIAL_PROGRAMMES[6], // B.Sc. Computer Science
    secondChoiceProgramme: INITIAL_PROGRAMMES[14], // B.Tech. IT
    personalInfo: {
      fullName: 'Alhassan Turay',
      dob: '2004-06-15',
      gender: 'Male',
      nationality: 'Sierra Leonean',
      phone: '+232 76 554433',
      address: '14 Wilkinson Road, Freetown, Sierra Leone',
      nextOfKinName: 'Dr. Abu Turay',
      nextOfKinPhone: '+232 77 112233'
    },
    academicHistory: {
      highSchool: 'Sierra Leone Grammar School, Freetown',
      graduationYear: '2023',
      wassceIndexNumber: '0010102045',
      examType: 'WASSCE (May/June School Candidate)',
      waecSerialNumber: 'WG2023-8849201',
      waecPin: '8492 0184 7291',
      resultSlipName: 'Alhassan_Turay_WASSCE_Result_Slip_2023.pdf',
      resultSlipUrl: '/sample-result-slip.pdf',
      grades: [
        { subject: 'English Language', grade: 'B3' },
        { subject: 'Mathematics (Core)', grade: 'A1' },
        { subject: 'Further Mathematics', grade: 'B2' },
        { subject: 'Physics', grade: 'B3' },
        { subject: 'Chemistry', grade: 'C4' },
        { subject: 'Biology', grade: 'C4' }
      ]
    },
    passportPhotoUrl: '/images/IMG-20261026-WA0017.jpg',
    documents: [
      { type: 'passport_photo', name: 'Passport_Photo_Alhassan.jpg', url: '/images/IMG-20261026-WA0017.jpg', verified: true, fileSize: '1.2 MB' },
      { type: 'birth_cert', name: 'National_Birth_Certificate.pdf', url: '#', verified: true, fileSize: '840 KB' },
      { type: 'testimonial', name: 'Principal_Recommendation_Testimonial.pdf', url: '#', verified: true, fileSize: '650 KB' },
      { type: 'result_slip', name: 'Alhassan_Turay_WASSCE_Result_Slip_2023.pdf', url: '#', verified: true, fileSize: '1.8 MB' }
    ],
    admissionsVerified: true,
    admissionsNotes: 'WASSCE online scratch-card serial/PIN verification passed. Validated via WAEC portal.',
    hodStatus: 'pending',
    hodComments: '',
    confirmationEmailSent: true,
    submittedAt: '2026-10-24T16:30:00Z',
    updatedAt: '2026-10-25T10:15:00Z'
  },
  {
    id: 'app-demo-2',
    applicationNumber: 'LCST-2026-0002',
    userId: 'user-demo-2',
    userEmail: 'kadiatu.kamara@gmail.com',
    codeId: 'code-prev-2',
    codeUsed: 'APP-5544-3322-1100',
    status: 'interview_scheduled',
    firstChoiceProgramme: INITIAL_PROGRAMMES[29], // B.Sc. Business Administration - HRM
    secondChoiceProgramme: INITIAL_PROGRAMMES[30], // Marketing
    personalInfo: {
      fullName: 'Kadiatu Kamara',
      dob: '2003-11-20',
      gender: 'Female',
      nationality: 'Sierra Leonean',
      phone: '+232 88 998877',
      address: '22 Campbell Street, Freetown',
      nextOfKinName: 'Fatmata Kamara',
      nextOfKinPhone: '+232 76 667788'
    },
    academicHistory: {
      highSchool: 'Government Technical Institute, Freetown',
      graduationYear: '2023',
      wassceIndexNumber: '0010203099',
      examType: 'SWO (Senior West African Technical / Vocational Result)',
      waecSerialNumber: 'SWO2023-4410293',
      waecPin: '3391 8820 4410',
      resultSlipName: 'Kadiatu_Kamara_SWO_Technical_Result.pdf',
      resultSlipUrl: '/sample-result-slip.pdf',
      grades: [
        { subject: 'English Language', grade: 'A1' },
        { subject: 'Mathematics (Core)', grade: 'B3' },
        { subject: 'Economics', grade: 'A1' },
        { subject: 'Financial Accounting', grade: 'B2' },
        { subject: 'Commerce', grade: 'B3' }
      ]
    },
    passportPhotoUrl: '/images/IMG-20261026-WA0005.jpg',
    documents: [
      { type: 'passport_photo', name: 'Passport_Photo_Kadiatu.jpg', url: '/images/IMG-20261026-WA0005.jpg', verified: true, fileSize: '1.4 MB' },
      { type: 'birth_cert', name: 'Birth_Certificate_Attested.pdf', url: '#', verified: true, fileSize: '920 KB' },
      { type: 'testimonial', name: 'School_Leaving_Testimonial.pdf', url: '#', verified: true, fileSize: '580 KB' },
      { type: 'result_slip', name: 'Kadiatu_Kamara_SWO_Technical_Result.pdf', url: '#', verified: true, fileSize: '2.1 MB' }
    ],
    admissionsVerified: true,
    admissionsNotes: 'SWO Technical result verified against examination registry. Credentials in order.',
    hodStatus: 'approved',
    hodComments: 'Excellent vocational and technical standing. Recommended for interview.',
    interviewDetails: {
      scheduledAt: '2026-11-04T10:00:00Z',
      venue: 'Faculty of Business Conference Room (Lungi Campus)',
      completed: false
    },
    confirmationEmailSent: true,
    submittedAt: '2026-10-22T11:00:00Z',
    updatedAt: '2026-10-24T14:00:00Z'
  },
  {
    id: 'app-demo-admitted',
    applicationNumber: 'LCST-2026-0003',
    userId: 'user-demo-3',
    userEmail: 'sorie.koroma@gmail.com',
    codeId: 'code-used',
    codeUsed: 'APP-ALREADY-USED-99',
    status: 'admitted',
    firstChoiceProgramme: INITIAL_PROGRAMMES[6], // B.Sc. Computer Science
    personalInfo: {
      fullName: 'Sorie Koroma',
      dob: '2002-04-12',
      gender: 'Male',
      nationality: 'Sierra Leonean',
      phone: '+232 77 440011',
      address: '5 Lungi Town, Port Loko District',
      nextOfKinName: 'Alie Koroma',
      nextOfKinPhone: '+232 76 990011'
    },
    academicHistory: {
      highSchool: 'The Albert Academy, Freetown',
      graduationYear: '2022',
      wassceIndexNumber: '0010304050',
      examType: 'WASSCE (School Candidate)',
      waecSerialNumber: 'WG2022-1102948',
      waecPin: '7721 9904 1123',
      resultSlipName: 'Sorie_Koroma_WASSCE_Statement.pdf',
      resultSlipUrl: '/sample-result-slip.pdf',
      grades: [
        { subject: 'English Language', grade: 'B2' },
        { subject: 'Mathematics (Core)', grade: 'A1' },
        { subject: 'Physics', grade: 'A1' },
        { subject: 'Chemistry', grade: 'B3' }
      ]
    },
    passportPhotoUrl: '/images/IMG-20261026-WA0013.jpg',
    documents: [
      { type: 'passport_photo', name: 'Passport_Sorie_Koroma.jpg', url: '/images/IMG-20261026-WA0013.jpg', verified: true, fileSize: '1.1 MB' },
      { type: 'birth_cert', name: 'Birth_Certificate_Certified.pdf', url: '#', verified: true, fileSize: '790 KB' },
      { type: 'testimonial', name: 'Albert_Academy_Testimonial.pdf', url: '#', verified: true, fileSize: '610 KB' },
      { type: 'result_slip', name: 'Sorie_Koroma_WASSCE_Statement.pdf', url: '#', verified: true, fileSize: '1.6 MB' }
    ],
    admissionsVerified: true,
    admissionsNotes: 'Serial and PIN checked. Direct STEM qualification confirmed.',
    hodStatus: 'approved',
    hodComments: 'Exceptional candidate. Approved for direct admission.',
    admissionDecision: {
      status: 'ADMITTED',
      admissionNumber: 'LCST/ADM/2026/0001',
      programmeName: 'B.Sc. Computer Science',
      date: '2026-10-26',
      conditions: 'Formal submission of original WASSCE certificate and medical fitness report before registration.'
    },
    confirmationEmailSent: true,
    submittedAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-26T12:00:00Z'
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// DEMO USERS
// ──────────────────────────────────────────────────────────────────────────────
export const DEMO_USERS: Record<string, UserProfile> = {
  student: {
    id: 'user-student-test',
    name: 'Ibrahim S. Bangura',
    email: 'ibrahim.bangura@gmail.com',
    role: 'student',
    phone: '+232 76 123456'
  },
  finance: {
    id: 'user-finance',
    name: 'Alpha Mansaray',
    email: 'finance@lungicest.edu.sl',
    role: 'finance',
    department: 'Finance & Accounts Office'
  },
  admissions: {
    id: 'user-admissions',
    name: 'Isatu Bah',
    email: 'admissions@lungicest.edu.sl',
    role: 'admissions',
    department: 'Admissions & Student Recruitment'
  },
  hod: {
    id: 'user-hod',
    name: 'Dr. Samuel Cole',
    email: 'hod.sci@lungicest.edu.sl',
    role: 'hod',
    department: 'Faculty of Science, Computing & Agriculture'
  },
  registry: {
    id: 'user-registry',
    name: 'Finda Sesay',
    email: 'registry@lungicest.edu.sl',
    role: 'registry',
    department: 'Academic Registry & Examinations'
  },
  lecturer: {
    id: 'user-lecturer',
    name: 'Mr. Joe Williams, MSc.',
    email: 'jwilliams@lungicest.edu.sl',
    role: 'lecturer',
    department: 'Faculty of Science, Computing & Agriculture'
  },
  admin: {
    id: 'user-admin',
    name: 'System Administrator',
    email: 'admin@lungicest.edu.sl',
    role: 'admin',
    department: 'ICT & Systems Directorate'
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// INITIAL STUDENTS (demo data)
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_STUDENTS: any[] = [
  {
    id: 'std-1',
    userId: 'user-student-test',
    studentIdNumber: 'LCST/2026/SCI/0042',
    fullName: 'Ibrahim S. Bangura',
    email: 'ibrahim.bangura@gmail.com',
    phone: '+232 76 123456',
    programmeId: 'prog-bsc-07',
    programmeName: 'B.Sc. Computer Science',
    facultyName: 'Faculty of Science, Computing & Agriculture',
    degreeType: 'Degree',
    admissionYear: '2026/2027',
    currentSemester: 'Year 1 Semester 1',
    tuitionCleared: true,
    registrationApproved: true,
    registeredCourses: ['CSC101', 'CSC102', 'CSC103', 'CSC104', 'ENG101'],
    cgpa: 3.75
  },
  {
    id: 'std-2',
    userId: 'user-demo-3',
    studentIdNumber: 'LCST/2026/SCI/0043',
    fullName: 'Sorie Koroma',
    email: 'sorie.koroma@gmail.com',
    phone: '+232 77 440011',
    programmeId: 'prog-bsc-07',
    programmeName: 'B.Sc. Computer Science',
    facultyName: 'Faculty of Science, Computing & Agriculture',
    degreeType: 'Degree',
    admissionYear: '2026/2027',
    currentSemester: 'Year 1 Semester 1',
    tuitionCleared: true,
    registrationApproved: true,
    registeredCourses: ['CSC101', 'CSC102', 'CSC103', 'CSC104', 'ENG101'],
    cgpa: 3.90
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// MODULES (B.Sc. Computer Science Year 1 Semester 1)
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_MODULES: any[] = [
  {
    id: 'mod-1',
    code: 'CSC101',
    title: 'Introduction to Programming & Algorithms',
    credits: 3,
    departmentId: 'dept-sci',
    semester: 'Semester 1',
    level: 'Year 1 Semester 1',
    lecturerName: 'Mr. Joe Williams, MSc.',
    lecturerEmail: 'jwilliams@lungicest.edu.sl',
    description: 'Foundations of algorithms, control structures, memory management, and problem solving using modern programming languages.'
  },
  {
    id: 'mod-2',
    code: 'CSC102',
    title: 'Discrete Mathematics for Computing',
    credits: 3,
    departmentId: 'dept-sci',
    semester: 'Semester 1',
    level: 'Year 1 Semester 1',
    lecturerName: 'Dr. Samuel Cole',
    lecturerEmail: 'hod.sci@lungicest.edu.sl',
    description: 'Set theory, boolean algebra, graph theory, propositional logic, and combinatorics essential for computational science.'
  },
  {
    id: 'mod-3',
    code: 'CSC103',
    title: 'Web Technologies & UI/UX Design',
    credits: 3,
    departmentId: 'dept-sci',
    semester: 'Semester 1',
    level: 'Year 1 Semester 1',
    lecturerName: 'Ms. Finda Kargbo',
    lecturerEmail: 'fkargbo@lungicest.edu.sl',
    description: 'Modern web architecture, responsive frontend design, DOM, HTML5, CSS layout principles, and interaction prototyping.'
  },
  {
    id: 'mod-4',
    code: 'CSC104',
    title: 'Computer Systems Architecture',
    credits: 3,
    departmentId: 'dept-sci',
    semester: 'Semester 1',
    level: 'Year 1 Semester 1',
    lecturerName: 'Mr. Alie Koroma',
    lecturerEmail: 'akoroma@lungicest.edu.sl',
    description: 'Digital logic, instruction set architecture, CPU registers, pipelining, memory hierarchy, and I/O subsystems.'
  },
  {
    id: 'mod-5',
    code: 'ENG101',
    title: 'Communication & Academic Writing',
    credits: 2,
    departmentId: 'dept-edu',
    semester: 'Semester 1',
    level: 'Year 1 Semester 1',
    lecturerName: 'Mrs. Mary Sesay',
    lecturerEmail: 'msesay@lungicest.edu.sl',
    description: 'Technical report writing, research methodology, citations, public speaking, and institutional presentation standards.'
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// TIMETABLE
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_TIMETABLE: any[] = [
  { id: 'time-1', moduleCode: 'CSC101', moduleTitle: 'Introduction to Programming & Algorithms', lecturerName: 'Mr. Joe Williams', dayOfWeek: 'Monday', startTime: '09:00', endTime: '11:00', room: 'Computer Lab 1 (Block A)', campus: 'Lungi Campus' },
  { id: 'time-2', moduleCode: 'CSC102', moduleTitle: 'Discrete Mathematics for Computing', lecturerName: 'Dr. Samuel Cole', dayOfWeek: 'Tuesday', startTime: '11:00', endTime: '13:00', room: 'Lecture Theatre 2', campus: 'Lungi Campus' },
  { id: 'time-3', moduleCode: 'CSC103', moduleTitle: 'Web Technologies & UI/UX Design', lecturerName: 'Ms. Finda Kargbo', dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '12:00', room: 'ICT Design Studio', campus: 'Lungi Campus' },
  { id: 'time-4', moduleCode: 'CSC104', moduleTitle: 'Computer Systems Architecture', lecturerName: 'Mr. Alie Koroma', dayOfWeek: 'Thursday', startTime: '14:00', endTime: '16:00', room: 'Engineering Lab', campus: 'Lungi Campus' },
  { id: 'time-5', moduleCode: 'ENG101', moduleTitle: 'Communication & Academic Writing', lecturerName: 'Mrs. Mary Sesay', dayOfWeek: 'Friday', startTime: '10:00', endTime: '12:00', room: 'Main Auditorium', campus: 'Lungi Campus' }
];

// ──────────────────────────────────────────────────────────────────────────────
// INITIAL GRADES (Ibrahim S. Bangura — published, for results page demo)
// ──────────────────────────────────────────────────────────────────────────────
export const INITIAL_GRADES: any[] = [
  { id: 'grd-1', studentIdNumber: 'LCST/2026/SCI/0042', studentName: 'Ibrahim S. Bangura', moduleCode: 'CSC101', moduleTitle: 'Introduction to Programming & Algorithms', credits: 3, caScore: 36, examScore: 54, totalScore: 90, letterGrade: 'A', gradePoint: 4.0, isPublished: true, semester: 'Semester 1', academicYear: '2026/2027', approvedByRegistry: true },
  { id: 'grd-2', studentIdNumber: 'LCST/2026/SCI/0042', studentName: 'Ibrahim S. Bangura', moduleCode: 'CSC102', moduleTitle: 'Discrete Mathematics for Computing', credits: 3, caScore: 32, examScore: 48, totalScore: 80, letterGrade: 'B+', gradePoint: 3.5, isPublished: true, semester: 'Semester 1', academicYear: '2026/2027', approvedByRegistry: true },
  { id: 'grd-3', studentIdNumber: 'LCST/2026/SCI/0042', studentName: 'Ibrahim S. Bangura', moduleCode: 'CSC103', moduleTitle: 'Web Technologies & UI/UX Design', credits: 3, caScore: 38, examScore: 50, totalScore: 88, letterGrade: 'A', gradePoint: 4.0, isPublished: true, semester: 'Semester 1', academicYear: '2026/2027', approvedByRegistry: true },
  { id: 'grd-4', studentIdNumber: 'LCST/2026/SCI/0042', studentName: 'Ibrahim S. Bangura', moduleCode: 'CSC104', moduleTitle: 'Computer Systems Architecture', credits: 3, caScore: 30, examScore: 45, totalScore: 75, letterGrade: 'B', gradePoint: 3.0, isPublished: true, semester: 'Semester 1', academicYear: '2026/2027', approvedByRegistry: true },
  { id: 'grd-5', studentIdNumber: 'LCST/2026/SCI/0042', studentName: 'Ibrahim S. Bangura', moduleCode: 'ENG101', moduleTitle: 'Communication & Academic Writing', credits: 2, caScore: 35, examScore: 52, totalScore: 87, letterGrade: 'A', gradePoint: 4.0, isPublished: true, semester: 'Semester 1', academicYear: '2026/2027', approvedByRegistry: true }
];
