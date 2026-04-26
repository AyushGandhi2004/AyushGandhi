export const siteConfig = {
  nav: {
    dpImage: '/portfolio_dp.jpg',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    photographyLabel: 'Photography',
    photographyHref: '/photography',
  },
  hero: {
    greeting: "Hey! I'm",
    name: 'Ayush Gandhi',
    taglines: [
      'Engineering ideas into reliable, real-world solutions',
      'Integrating intelligence into every layer of software',
      'Engineered for impact',
      'Building scalable systems',
      'Designing clean experiences',
    ],
    taglineInterval: 2800,
    scrollIndicatorText: 'Scroll to explore',
  },
  about: {
    heading: 'About Me',
    paragraphs: [
      {
        text: "I'm Ayush Gandhi, a software developer from India who enjoys building intelligent and scalable digital products. My work sits at the intersection of full-stack development and artificial intelligence, where I design systems that are not just functional but also adaptive and smart. From integrating AI models to creating agent-driven workflows, I focus on building solutions that solve real-world problems.",
        keywords: ['full-stack development', 'artificial intelligence', 'agent-driven workflows'],
      },
      {
        text: "I enjoy staying on the cutting edge of technology and continuously evolving with it. I'm someone who believes technology evolves fast—and so should we. I'm constantly learning, experimenting, and refining my skills to stay aligned with the latest advancements in AI and software development.",
        keywords: ['continuously evolving', 'learning', 'experimenting'],
      },
      {
        text: "When I'm not coding, you'll usually find me behind a camera capturing birds, wildlife, and nature, or spending time with friends playing sports and enjoying music.",
        keywords: [],
      },
    ],
    techStack: [
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'GSAP', icon: 'gsap' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'C++', icon: 'cplusplus' },
    ],
  },
  contact: {
    heading: 'Contact',
    items: [
      { label: 'Email', value: '', href: 'mailto:workayush2004@gmail.com', icon: 'email' },
      { label: 'Phone', value: '', href: 'tel:+91 963 842 4721', icon: 'phone' },
      { label: 'GitHub', value: '', href: 'https://github.com/AyushGandhi2004', icon: 'github' },
      { label: 'LinkedIn', value: '', href: 'https://www.linkedin.com/in/ayush-gandhi-230620294/', icon: 'linkedin' },
      { label: 'Instagram', value: '', href: 'https://www.instagram.com/ayushgandhi0301?igsh=MW4wOTdkN2hqZzM1eA==', icon: 'instagram' },
      { label: 'X (Twitter)', value: '', href: 'https://x.com/AyushGandhi314', icon: 'x' },
    ],
    closingLine: "Code → Create → Evolve",
  },
} as const;
