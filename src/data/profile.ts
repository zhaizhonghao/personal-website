export interface Profile {
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  avatarUrl?: string;
  email: string;
  interests: string[];
  socialLinks: {
    label: string;
    url: string;
  }[];
}

const profile: Profile = {
  name: 'Zhonghao Zhai',
  title: 'Researcher',
  affiliation: "Huai'an University",
  bio: 'My research focuses on blockchain technology, federated learning, IoT security, and privacy-preserving machine learning. I am passionate about building secure, scalable, and trustworthy distributed systems.',
  email: 'zhhzhai@hau.edu.cn',
  interests: [
    'Blockchain',
    'Federated Learning',
    'IoT Security',
    'Differential Privacy',
    'Deep Reinforcement Learning',
    'Public Key Infrastructure',
    'Causal Model',
    'Image Encryption',
    'Distributed Systems',
  ],
  socialLinks: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=gBY1cdcAAAAJ&hl=zh-CN' },
    { label: 'ORCID', url: 'https://orcid.org/0000-0002-7410-8677' },
  ],
};

export default profile;
