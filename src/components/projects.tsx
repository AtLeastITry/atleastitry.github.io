type Project = {
  title: string;
  description: string;
  url: string;
};

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <div class="grid grid-cols-1 bg-secondary-500 lg:grid-cols-2">
      {projects.map((project, i) => {
        return (
          <a href={project.url} target="_blank" class="shadow-2xl mx-10 px-10 my-10 py-20 bg-indigo-950 hover:bg-indigo-400">
            <h3 class="mb-2 border-b-2 border-white text-xl text-white">
              {project.title}
            </h3>
            <span class="text-white">{project.description}</span>
          </a>
        );
      })}
    </div>
  );
}
