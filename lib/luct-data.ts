export interface LuctCourse {
  id: string;
  name: string;
  programmeCode: string | null;
  description: string;
  level: 'UNDERGRADUATE' | 'DIPLOMA' | 'CERTIFICATE';
  durationMonths: number;
  tuitionFeePerYear: number | null;
  tuitionFeePerSemester: number | null;
  departmentId: string;
  department: {
    id: string;
    name: string;
  };
}

export const LUCT_COURSES: LuctCourse[] = [
  {
    id: 'seed-course-broadcasting-journalism',
    name: 'BA (Hons) Broadcasting & Journalism',
    programmeCode: 'BABJ',
    description: 'A practical broadcast-journalism degree covering news writing, investigative reporting, documentary production, and camera and broadcast operations for radio, TV, and digital platforms, preparing graduates for roles such as broadcast journalist or field producer.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-comms',
    department: {
      id: 'seed-dept-comms',
      name: 'Department of Communication, Media, Broadcasting and Public Relations'
    }
  },
  {
    id: 'seed-course-professional-communication',
    name: 'BA (Hons) Professional Communication',
    programmeCode: 'BAPC',
    description: 'Blends writing, advertising, public relations, and marketing skills for professional and organisational contexts, covering business communication, media law, and strategic advertising, graduating students ready for roles like communications manager or PR officer.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-comms',
    department: {
      id: 'seed-dept-comms',
      name: 'Department of Communication, Media, Broadcasting and Public Relations'
    }
  },
  {
    id: 'seed-course-tourism-management',
    name: 'Bachelor of Art (Hons) in Tourism Management',
    programmeCode: 'BATM',
    description: 'Prepares students for careers in the tourism and hospitality industry, covering hotel operations, event planning, adventure and cultural tourism, ticketing, and tourism policy alongside business fundamentals.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-business',
    department: {
      id: 'seed-dept-business',
      name: 'Department of Business Management & Globalization'
    }
  },
  {
    id: 'seed-course-interior-architecture',
    name: 'Bachelor of Art in Interior Architecture',
    programmeCode: 'BAIA',
    description: 'Trains students to design and manage interior spaces within the broader building industry, blending architectural technical skills with an understanding of human needs, style, and function, from foundational design through interior architecture studios, materials, and a design thesis, culminating in a professional internship.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-accounting-finance',
    name: 'Bachelor of Business (Hons) in Accounting & Finance',
    programmeCode: 'BBAF',
    description: 'A comprehensive accounting-focused degree covering financial reporting, auditing, taxation, and corporate finance, aimed at students seeking technical accounting and finance careers such as auditor, tax consultant, or financial analyst.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-business',
    department: {
      id: 'seed-dept-business',
      name: 'Department of Business Management & Globalization'
    }
  },
  {
    id: 'seed-course-business-administration',
    name: 'Bachelor of Business (Hons) in Business Administration',
    programmeCode: 'BBBA',
    description: 'A broad-based BBA covering leadership, strategy, corporate finance, and organizational management, designed to build well-rounded managers for corporations, startups, and entrepreneurial ventures.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-business',
    department: {
      id: 'seed-dept-business',
      name: 'Department of Business Management & Globalization'
    }
  },
  {
    id: 'seed-course-entrepreneurship',
    name: 'Bachelor of Business (Hons) in Entrepreneurship',
    programmeCode: 'BBE',
    description: 'Trains students to start, run, and grow their own businesses, blending core business management skills with dedicated entrepreneurship and new-venture modules, finishing with a practical internship and research project.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-business',
    department: {
      id: 'seed-dept-business',
      name: 'Department of Business Management & Globalization'
    }
  },
  {
    id: 'seed-course-international-business',
    name: 'Bachelor of Business (Hons) in International Business',
    programmeCode: 'BBIB',
    description: 'A multi-disciplinary business degree focused on global commerce, covering international trade, international marketing, business law, and strategic management, preparing graduates for roles such as business analyst or corporate investment banking.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-business',
    department: {
      id: 'seed-dept-business',
      name: 'Department of Business Management & Globalization'
    }
  },
  {
    id: 'seed-course-digital-media',
    name: 'Bachelor of Communication (Hons) in Digital Media',
    programmeCode: 'BCDM',
    description: 'A tech-focused communication degree centered on new media, internet technology, and digital tools for modern communicators, spanning web design, digital advertising, and multimedia content creation for careers in digital marketing or online content strategy.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-comms',
    department: {
      id: 'seed-dept-comms',
      name: 'Department of Communication, Media, Broadcasting and Public Relations'
    }
  },
  {
    id: '51db532c-056f-4bb5-9675-b738252dcc08',
    name: 'Bachelor of Design (Hons) in Professional Design (Visual Communication)',
    programmeCode: 'BPD',
    description: 'A design-focused honours degree centered on visual communication - brand identity, typography, illustration, digital and print media, and user-facing design systems - preparing graduates for careers in graphic design, branding, advertising, and digital design studios.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-bsc-business-it',
    name: 'BSc (Hons) Business Information Technology',
    programmeCode: 'BBIT',
    description: 'Combines core IT and programming skills with business disciplines such as marketing, strategic management, and e-commerce, suited to students aiming for the intersection of technology and business operations. Leads to roles like systems analyst or business systems administrator.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-ict',
    department: {
      id: 'seed-dept-ict',
      name: 'Department of Information, Communication & Technology'
    }
  },
  {
    id: 'seed-course-ict',
    name: 'BSc (Hons) Information & Communication Technology',
    programmeCode: 'BICT',
    description: 'Concentrates on networking, telecommunications, and internetworking, covering LAN/wireless technologies, network design, client/server architecture, and systems administration for students wanting deep infrastructure and networking expertise.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-ict',
    department: {
      id: 'seed-dept-ict',
      name: 'Department of Information, Communication & Technology'
    }
  },
  {
    id: 'seed-course-bsc-it',
    name: 'BSc (Hons) Information Technology',
    programmeCode: 'BIT',
    description: 'A broad four-year IT degree blending technical, managerial, and entrepreneurial skills, covering databases, multimedia, programming, systems security, and networking for students who want hands-on, industry-ready capability. Graduates pursue careers as software or web developers, systems analysts, or cybersecurity analysts.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-ict',
    department: {
      id: 'seed-dept-ict',
      name: 'Department of Information, Communication & Technology'
    }
  },
  {
    id: 'seed-course-software-eng-multimedia',
    name: 'BSc (Hons) Software Engineering with Multimedia',
    programmeCode: 'BSEM',
    description: 'Applies software engineering principles to multimedia systems, covering digital imaging, animation, sound and video production, and interactive/virtual reality development for students pursuing a multimedia-oriented software career.',
    level: 'UNDERGRADUATE',
    durationMonths: 48,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-ict',
    department: {
      id: 'seed-dept-ict',
      name: 'Department of Information, Communication & Technology'
    }
  },
  {
    id: 'seed-course-cat',
    name: 'Certificate in Architectural Technology',
    programmeCode: 'CAT',
    description: 'A one-year foundation certificate introducing architectural design and drawing fundamentals alongside general education modules, for students entering the architecture and built environment field.',
    level: 'CERTIFICATE',
    durationMonths: 12,
    tuitionFeePerYear: 14000,
    tuitionFeePerSemester: 7000,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-cit',
    name: 'Certificate in Information Technology',
    programmeCode: 'CIT',
    description: 'A one-year foundation certificate covering introductory programming, computer applications, and general education modules, for students entering the IT field.',
    level: 'CERTIFICATE',
    durationMonths: 12,
    tuitionFeePerYear: 23040,
    tuitionFeePerSemester: 11520,
    departmentId: 'seed-dept-ict',
    department: {
      id: 'seed-dept-ict',
      name: 'Department of Information, Communication & Technology'
    }
  },
  {
    id: 'seed-course-architectural-technology',
    name: 'Diploma in Architectural Technology',
    programmeCode: 'DAT',
    description: 'Focuses on the technical and practical side of architecture, equipping students with skills in building construction, materials, services, CAD drafting, and site surveying, building from architectural drawing fundamentals to office practice and building services, ending in an internship.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-digital-photography',
    name: 'Diploma in Digital Photography',
    programmeCode: 'DDP',
    description: 'Equips students with technical and creative photography skills, from lighting and studio acoustics to digital imaging, photojournalism, and commercial photography, blending theory with hands-on use of professional equipment. Graduates are prepared for careers such as advertising photographer or digital imaging specialist.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-graphic-design-tech',
    name: 'Diploma in Graphic Design Technology',
    programmeCode: 'DGDT',
    description: 'Trains students in the visual and creative skills needed for the advertising and graphic design industry, covering typography, illustration, photography, computer graphics, and packaging design. Students build a broad design foundation before specializing in areas such as illustration, advertising, or multimedia, concluding with an industry internship.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-diploma-it',
    name: 'Diploma in Information Technology',
    programmeCode: 'DIT',
    description: 'A foundational technology diploma covering programming, networking, databases, web development, and software engineering essentials, designed for school leavers seeking practical, entry-level IT skills including a final internship placement.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-ict',
    department: {
      id: 'seed-dept-ict',
      name: 'Department of Information, Communication & Technology'
    }
  },
  {
    id: 'seed-course-interior-design',
    name: 'Diploma in Interior Design',
    programmeCode: 'DID',
    description: 'A foundational diploma covering the principles of interior design as they relate to human behavior, environmental science, and building technology, with emphasis on color, materials, rendering, and computer-aided design, finishing with a practical internship.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  },
  {
    id: 'seed-course-diploma-international-business',
    name: 'Diploma in International Business',
    programmeCode: 'DIB',
    description: 'A foundational business diploma covering international trade, business communication, and management fundamentals for students entering global commerce roles.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-business',
    department: {
      id: 'seed-dept-business',
      name: 'Department of Business Management & Globalization'
    }
  },
  {
    id: 'seed-course-multimedia-advertising-broadcasting',
    name: 'Diploma in Multimedia, Advertising & Broadcasting',
    programmeCode: 'DMAB',
    description: 'A hands-on diploma covering three creative-industry tracks - advertising, multimedia, and broadcasting - combining design, video, sound, and marketing fundamentals with an industry internship for a fast, practical entry into media production or advertising.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-comms',
    department: {
      id: 'seed-dept-comms',
      name: 'Department of Communication, Media, Broadcasting and Public Relations'
    }
  },
  {
    id: 'seed-course-sound-music-tech',
    name: 'Diploma in Sound & Music Technology',
    programmeCode: 'DSMT',
    description: 'Prepares students for the music and audio production industry, covering recording, mixing, composition and arrangement, studio acoustics, and digital audio workstations, with hands-on experience using professional audio equipment. Suits those aiming for careers as a recording engineer, sound designer, or live sound engineer.',
    level: 'DIPLOMA',
    durationMonths: 36,
    tuitionFeePerYear: 19200,
    tuitionFeePerSemester: 9600,
    departmentId: 'seed-dept-architecture',
    department: {
      id: 'seed-dept-architecture',
      name: 'Department of Architecture and Design Innovation'
    }
  }
];

export const CIT_PROGRESSION_COURSES = [
  { id: 'seed-course-bsc-business-it', name: 'BSc (Hons) Business Information Technology' },
  { id: 'seed-course-ict', name: 'BSc (Hons) Information & Communication Technology' },
  { id: 'seed-course-bsc-it', name: 'BSc (Hons) Information Technology' },
  { id: 'seed-course-software-eng-multimedia', name: 'BSc (Hons) Software Engineering with Multimedia' }
];

export const BANK_PAYMENT_DETAILS = {
  accountName: 'Lungi College of Education, Science & Technology (LUNGICEST)',
  bankName: 'Commerce and Mortgage Bank',
  accountNumber: '002-112300-1367',
  currency: 'SLE',
  feeAmount: 250,
  feeText: 'Le250 application form fee',
  branchInfo: 'Commerce and Mortgage Bank or the College Cash Office / Finance Directorate, 8:30am - 4:00pm Monday to Friday',
  verificationInstructions: 'Bring your deposit slip to the Finance Office - they will verify it and issue your access code (also dispatched to your email) to unlock the application form.'
};

export const LUCT_TERMS_AND_CONDITIONS = `1.0 Fees
All fees must be paid within 7 days of the commencement date of each new semester. Please do not send cash payments through post. Cheques should be made payable to LUNGI COLLEGE OF EDUCATION SCIENCE & TECHNOLOGY (LUNGICEST). With regard to payment by installment, the following apply: a nominal surcharge on course fees will be levied on late payment; fee payment by installment as specified by the Finance Office will attract a nominal surcharge. Registration fees are not transferable, refundable and cannot be deferred. Failure to settle outstanding fees within the prescribed period may result in exclusion from the College. Any refund of fees or deposit, where applicable, will be at the discretion of the College Finance Office.

2.0 Withdrawal
2.1 Students must inform the Registrar in writing if they are withdrawing from a course of study.
2.2 Notice of withdrawal must be given one month prior to the commencement of the semester for a refund of course fee to be considered. The administrative charge for this is USD200.
2.3 In the event a student withdraws to a different educational institution after registering and receiving official college admission approval, the administrative charge is not obliged to be returned to the student.

3.0 Deferral
3.1 The student must apply to the Registrar in writing. This can only be granted in exceptional circumstances, usually medical, and only when a reassessment opportunity is available at a future date. No deferral is allowed after 14 days from the commencement date of the new semester.
3.2 In the event a deferral is granted, a deferral fee of USD200 is payable.
3.3 Students who interrupt their studies should be aware that their current course cannot be guaranteed to resume following re-admission as if no interruption had occurred, and it is their responsibility to make themselves familiar with any changes in the course syllabus or assessment policy that may have taken place during their absence.

4.0 Transfer between Courses
4.1 A student may transfer from one course to another within the College only with the agreement of the appropriate authorities. No transfer will be allowed after 14 days from the commencement date of the new semester.

5.0 Add/Drop Module(s)
5.1 Students must apply within 4 weeks from the date of semester commencement and must obtain approval from Programme Leaders.

6.0 Rules and Regulations
6.1 All students must abide by the College Rules and Regulations. Failure to do so may result in expulsion, suspension, private or public sanctions.
6.2 Any criminal activities on the College premises will be reported to the relevant authorities.
6.3 The College and its management will not be held responsible for any damages, losses or injuries arising from the course of studentship with the College.
6.4 The Disciplinary Board has the authority to suspend or/and expel any student behaving in a manner that affects the good name and security of its staff and students. The College reserves the right to revise the College Rules and Regulations without prior notice.

7.0 The College reserves the right to accept or reject any application without assigning any reason.

8.0 Fees quoted in USD will be revised as and when the need arises from the fluctuation of the currency exchange rate.

We confirm that, to the best of our knowledge, the information provided in this form is correct and complete, and that we have read, understood and agree to abide by all the terms and conditions above.`;

export const PRESET_ACCESS_CODES = [
  { code: '7K4P9QXR', email: 'applicant@example.com', name: 'Alhaji M. Kamara', receipt: 'CMB-2026-0041' },
  { code: 'APP-7K9M-X4PQ-2D6R', email: 'ibrahim.bangura@gmail.com', name: 'Ibrahim S. Bangura', receipt: 'REC-2026-0891' },
  { code: 'LCEST2026', email: 'mariama.conteh@gmail.com', name: 'Mariama Conteh', receipt: 'CMB-2026-0099' }
];
