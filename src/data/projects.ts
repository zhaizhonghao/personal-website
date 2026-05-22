export interface Project {
  name: string;
  description: string;
  role: string;
  period: string;
  funding?: string;
  outcomes: string[];
  link?: string;
}

const projects: Project[] = [
  {
    name: 'Large-Scale Multi-Modal Understanding',
    description: 'Developing novel architectures for joint understanding of vision and language modalities, enabling more robust and generalizable AI systems.',
    role: 'Principal Investigator',
    period: '2023 - Present',
    funding: 'National Science Foundation',
    outcomes: [
      'Published 3 papers at top-tier conferences',
      'Released open-source toolkit with 500+ GitHub stars',
      'Collaboration with 3 industry partners',
    ],
  },
  {
    name: 'Efficient Training of Large Language Models',
    description: 'Investigating methods to reduce the computational cost of training and fine-tuning large language models while maintaining performance.',
    role: 'Co-Principal Investigator',
    period: '2022 - Present',
    funding: 'Industry Research Grant',
    outcomes: [
      'Proposed novel parameter-efficient fine-tuning method',
      'Reduced training cost by 40% on benchmark tasks',
      'Patent pending on core technique',
    ],
    link: 'https://github.com',
  },
  {
    name: 'AI for Scientific Discovery',
    description: 'Applying machine learning techniques to accelerate scientific research in materials science and drug discovery.',
    role: 'Lead Researcher',
    period: '2021 - 2023',
    funding: 'University Research Fund',
    outcomes: [
      'Developed ML pipeline for molecular property prediction',
      'Published in Nature Computational Science',
      'Established cross-department collaboration',
    ],
  },
  {
    name: 'Robustness in Deep Learning Systems',
    description: 'Studying adversarial robustness and uncertainty quantification in deep neural networks for safety-critical applications.',
    role: 'Principal Investigator',
    period: '2020 - 2022',
    outcomes: [
      'New benchmark dataset for robustness evaluation',
      '2 PhD theses completed under this project',
      'Best paper award at CVPR Workshop',
    ],
  },
];

export default projects;
