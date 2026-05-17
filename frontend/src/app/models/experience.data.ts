export interface Experience {
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    type: 'work',
    title: 'Software Developer',
    organization: 'Zoox',
    location: 'Foster City, California',
    startDate: 'August 2024',
    endDate: 'Present',
    description: [
      'Developed and maintained web applications using Spring Boot and Angular',
      'Collaborated with cross-functional teams to deliver features on time',
      'Implemented RESTful APIs and integrated third-party services',
    ],
  },
  {
    type: 'work',
    title: 'Java Developer',
    organization: 'Wells Fargo',
    location: 'San Leandro, California',
    startDate: 'August 2022',
    endDate: 'July 2024',
    description: [
      'Developed and maintained web applications using Spring Boot and Angular',
      'Collaborated with cross-functional teams to deliver features on time',
      'Implemented RESTful APIs and integrated third-party services',
    ],
  },
  {
    type: 'work',
    title: 'Software Engineer',
    organization: 'Conduent',
    location: 'Austin, Texas',
    startDate: 'August 2022',
    endDate: 'July 2024',
    description: [
      'Developed and maintained web applications using Spring Boot and Angular',
      'Collaborated with cross-functional teams to deliver features on time',
      'Implemented RESTful APIs and integrated third-party services',
    ],
  },
  {
    type: 'education',
    title: 'B.Sc. in Computer Science',
    organization: 'CSU EAST BAY',
    location: 'Hayward, United States',
    startDate: 'August 2014',
    endDate: 'May 2018',
    description: [
      'Focused on software engineering and web development',
      'Completed projects in Java, Python, and database management',
    ],
  },
];
