export interface Student {
  name: string;
  degree: 'PhD' | 'Master' | 'Undergraduate';
  period: string;
  research: string;
  currentPosition?: string;
}

const students: Student[] = [
  {
    name: 'Alice Wang',
    degree: 'PhD',
    period: '2021 - Present',
    research: 'Efficient Deep Learning for Edge Devices',
  },
  {
    name: 'Bob Chen',
    degree: 'PhD',
    period: '2020 - Present',
    research: 'Large Language Model Alignment',
  },
  {
    name: 'Carol Zhang',
    degree: 'Master',
    period: '2022 - 2024',
    research: 'Adversarial Robustness in Vision Models',
    currentPosition: 'Research Scientist at AI Lab Inc.',
  },
  {
    name: 'David Liu',
    degree: 'Master',
    period: '2021 - 2023',
    research: 'Graph Neural Networks for Drug Discovery',
    currentPosition: 'PhD student at MIT',
  },
  {
    name: 'Emma Li',
    degree: 'Undergraduate',
    period: '2023 - Present',
    research: 'Self-Supervised Learning for Video Understanding',
  },
  {
    name: 'Frank Xu',
    degree: 'Undergraduate',
    period: '2022 - 2023',
    research: 'Knowledge Distillation for NLP Models',
    currentPosition: 'Software Engineer at Tech Corp',
  },
  {
    name: 'Grace Huang',
    degree: 'PhD',
    period: '2019 - 2023',
    research: 'Reinforcement Learning for Robot Navigation',
    currentPosition: 'Assistant Professor at Another University',
  },
  {
    name: 'Henry Wu',
    degree: 'Master',
    period: '2020 - 2022',
    research: 'Federated Learning with Non-IID Data',
    currentPosition: 'Machine Learning Engineer at Startup AI',
  },
];

export default students;
