import "./projects.css";

type Project = {
  title: string;
  description: string;
  url: string;
};

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const baseColors = ["cyan", "indigo", "red", "sky", "green", "yellow"];

  let colors: string[] = [];
  let colorIndex = 0;
  let projectSize: boolean[] = [];
  let projectSizeIndex = 0;

  for (let i = 0; i < projects.length; i++) {
    if (projectSizeIndex === 4) {
      projectSizeIndex = 0;
    }

    projectSizeIndex++;

    colorIndex = colorIndex === baseColors.length - 1 ? 0 : colorIndex + 1;
    colors.push(baseColors[colorIndex]);

    projectSize.push(
      projectSizeIndex === 1 || projectSizeIndex === 4 ? true : false,
    );
  }

  return (
    <div class="grid grid-cols-1 lg:grid-cols-3 ">
      {projects.map((project, i) => {
        const color = colors[i];
        const isSecondary = color === "secondary";
        const large = projectSize[i];
        return (
          <a
            href={project.url}
            target="_blank"
            class={`project block px-10 py-10 xl:px-40 xl:py-20 project-bg-${color}-hover project-bg-${color} text-white ${
              large === true ? "lg:col-span-2" : ""
            }`}
          >
            <h3 class={`mb-2 border-b-2 border-white text-xl`}>
              {project.title}
            </h3>
            <span>{project.description}</span>
          </a>
        );
      })}
    </div>
  );
}
