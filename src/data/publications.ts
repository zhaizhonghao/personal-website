export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'preprint' | 'other';
  doi?: string;
  link?: string;
  citations?: number;
}

const publications: Publication[] = [
  {
    title: 'Efficient Adaptive Asynchronous Federated Learning Based on Differential Privacy',
    authors: 'J Wang, C Jin, W Lu, Z Zhai, H Zhang, J Weng',
    venue: 'IEEE Transactions on Dependable and Secure Computing',
    year: 2026,
    type: 'journal',
    doi: '10.1109/TDSC.2026.3667898',
    link: 'https://doi.org/10.1109/TDSC.2026.3667898',
  },
  {
    title: 'A Lightweight Authentication Method for Industrial Internet of Things Based on Blockchain and Chebyshev Chaotic Maps',
    authors: 'Z Zhai, J Liu, X Liu, Y Mao, X Zhang, J Ma, C Jin',
    venue: 'Future Internet',
    year: 2025,
    type: 'journal',
    doi: '10.3390/fi17080338',
    link: 'https://doi.org/10.3390/fi17080338',
    citations: 8,
  },
  {
    title: 'A Novel Image Encryption Scheme Using 3D Chaotic Maps with Josephus Permutation and Dynamic Diffusion',
    authors: 'W Lu, C Jin, J Wang, X Liu, J Liu, Z Zhai',
    venue: 'Journal of King Saud University - Computer and Information Sciences',
    year: 2025,
    type: 'journal',
    citations: 10,
  },
  {
    title: 'DMAFL: Effective Defense Against Malicious Attacker Federated Learning Framework via Blockchain and TFHE',
    authors: 'C Jin, J Wang, W Lu, C Luo, J Liu, G Chen, Z Zhai',
    venue: 'Journal of King Saud University - Computer and Information Sciences',
    year: 2025,
    type: 'journal',
    citations: 3,
  },
  {
    title: 'Towards Efficient Privacy-Preserving Keyword Search for Outsourced Data in Intelligent Transportation Systems',
    authors: 'G Wang, Q Zeng, L Shen, S Ding, X He, Z Zhai, H Li, Z Shi',
    venue: 'Future Generation Computer Systems',
    year: 2025,
    type: 'journal',
    citations: 1,
  },
  {
    title: 'DSSE-DMVS: A Blockchain-based Dynamic Searchable Symmetric Encryption Supporting Multi-Keyword Queries and Data Deduplication',
    authors: 'C Jin, J Li, Y Sun, L Ji, X Liu, H Chen, L Zhou, Z Zhai, H Zhang, J Weng',
    venue: 'Journal of Systems Architecture',
    year: 2025,
    type: 'journal',
  },
  {
    title: 'An Explainable Deep Reinforcement Learning Algorithm for the Parameter Configuration and Adjustment in the Consortium Blockchain',
    authors: 'Z Zhai, S Shen, Y Mao',
    venue: 'Engineering Applications of Artificial Intelligence',
    year: 2024,
    type: 'journal',
    doi: '10.1016/j.engappai.2023.107606',
    link: 'https://doi.org/10.1016/j.engappai.2023.107606',
    citations: 9,
  },
  {
    title: 'A Toolbox for Migrating the Blockchain-Based Application From Ethereum to Hyperledger Fabric',
    authors: 'Z Zhai, S Shen, Y Mao',
    venue: 'The Computer Journal',
    year: 2024,
    type: 'journal',
    doi: '10.1093/comjnl/bxad061',
    link: 'https://doi.org/10.1093/comjnl/bxad061',
    citations: 1,
  },
  {
    title: 'BPKI: A Secure and Scalable Blockchain-based Public Key Infrastructure System for Web Services',
    authors: 'Z Zhai, S Shen, Y Mao',
    venue: 'Journal of Information Security and Applications',
    year: 2022,
    type: 'journal',
    doi: '10.1016/j.jisa.2022.103226',
    link: 'https://doi.org/10.1016/j.jisa.2022.103226',
    citations: 10,
  },
  {
    title: 'Towards Decentralized Trust Management Using Blockchain in Crowdsourcing Networks',
    authors: 'H Yang, G Wang, Z Zhai, X He',
    venue: '2020 International Conference on Cyber-Enabled Distributed Computing and Knowledge Discovery (CyberC)',
    year: 2020,
    type: 'conference',
    citations: 6,
  },
];

export default publications;
