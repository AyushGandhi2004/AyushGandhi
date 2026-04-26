export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'ACMP',
    description: 'An Autonomous Code Modernization Platform that transforms legacy codebases into modern architectures using AI-driven analysis and refactoring, without changing the business logic.',
    tech: ['React','Python', 'LangGraph', 'FastAPI', 'Groq', 'ChromaDB'],
    href: 'https://github.com/AyushGandhi2004/ACMP',
  },
  {
    id: 'project-2',
    title: 'Sentinel',
    description: 'An AI-powered prototype which triggers rule-based security alerts, indexes every frame for later recall, and surfaces everything through a live Streamlit dashboard',
    tech: ['FastAPI', 'Streamlit', 'LangChain', 'ChromaDB'],
    href: 'https://github.com/AyushGandhi2004/WatchMan',
  },
  {
    id: 'project-3',
    title: 'ShopIn',
    description: 'A Fullstack E-Commerce application',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    href: 'https://github.com/AyushGandhi2004/E-commerce',
  },
  {
    id: 'project-4',
    title: 'Restaurant Delivery',
    description: 'full-stack food ordering system with real-time order updates, live rider location tracking, role-based dashboards, and online payment flow',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    href: 'https://github.com/AyushGandhi2004/RestaurantDelivery',
  },
  {
    id: 'project-5',
    title: 'Movie App',
    description: 'A performance-optimized image gallery with lazy loading and masonry layout.',
    tech: ['React', 'Tailwind'],
    href: 'https://github.com/AyushGandhi2004/MovieApp',
  },
];
