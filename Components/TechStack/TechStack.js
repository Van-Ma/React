import '../styles/tech-stack.scss';

function TechStack() {
  const techImages = [
    { src: "techstack/react.png", alt: "React" },
    { src: "techstack/net.png", alt: ".NET" },
    { src: "techstack/blender.png", alt: "Blender" },
    { src: "techstack/figma.png", alt: "Figma" },
    { src: "techstack/git.png", alt: "Git" },
    { src: "techstack/python.png", alt: "Python" },
    { src: "techstack/html.png", alt: "HTML" },
    { src: "techstack/js.png", alt: "JavaScript" },
    { src: "techstack/mysql.png", alt: "MySQL" },
    { src: "techstack/sass.png", alt: "Sass" },
  ];

  return (
    <div className="techstack-container">
      {techImages.map((img, i) => (
        <img
          key={i}
          className={`tech-img ${i === 0 ? 'center-img' : ''}`}
          src={img.src}
          alt={`${img.alt} logo`}
        />
      ))}
    </div>
  );
}

export default TechStack;
