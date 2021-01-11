import PageLayout from '../components/page-layout';
import Title from '../components/title'
import Card from '../components/card';
import Button from '../components/button';

const Star = (props) => {
  return (
    <span {...props} >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </span>
  )
}

const Projects = ({ repos, specialProjects }) => {
  return (
    <PageLayout>
      <Title>
        Projects
      </Title>

      <div className="mb-12">
        <h2 className="text-4xl font-semibold mb-6">Featured</h2>

        <div className="mb-8">
          <p className="prose">

          </p>
        </div>

        <ul className="grid gap-5 grid-cols-1 md:grid-cols-2">
          { specialProjects.map(project => {
            return (
              <>
              <Card classes="grid gap-6" key={project.link} element="li">
                <div className="flex">
                  <h3 className="font-bold text-3xl pr-3 mb-3">
                    <a href={project.link} target="_blank">
                      {project.name}
                    </a>
                  </h3>
                </div>

                <p className="prose">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <Button href={project.link} target="_blank">
                    Learn More
                  </Button>
                </div>
              </Card>
              </>
            );
          })}
        </ul>
      </div>

      <h2 className="text-4xl font-semibold mb-6">Open Source</h2>

      <div className="mb-8">
        <p className="prose">
          A number of the side projects that keep me busy are open-sourced. Here are just a few!
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {repos.map((repo) => {
          const linkProps = { href: repo.html_url, target: "_blank" };

          return (
              <Card classes="flex flex-col" element="li" key={repo.html_url}>
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-3xl pr-3">
                    <a {...linkProps}>
                      {repo.name}
                    </a>
                  </h3>

                  <a className="flex items-center space-x-1 stargazers" {...linkProps} >
                    <Star className="block h-6 w-6" />
                    <span>{repo.stargazers_count}</span>
                  </a>
                </div>

                <div className="mb-8">
                  <p>{repo.description}</p>
                </div>

                <div className="mt-auto">
                  <Button {...linkProps} naked={true}>
                    Learn More
                  </Button>
                </div>
              </Card>
          )
        })}
      </ul>
    </PageLayout>
  )
}

export default Projects;

/**
 * Criteria:
 * - has a commit within the last 12 months
 * - has a tag
 */
export async function getStaticProps() {
  const { getOpenSourceRepos } = require('../lib/github');

  const repos = (process.env.NODE_ENV === 'development')
    ? require('../lib/repo-data.json')
    : await getOpenSourceRepos()

  return {
    props: {
      repos,
      specialProjects: [
        {
          name: "TypeIt",
          description: "TypeIt is a JavaScript library for creating dynamic typewriter effects. I began working on it back in 2015 as a means of learnig to write better JavaScript. Since then, it's gone through several evolutions is now one of my favorite \"small\" projects to maintain.",
          link: "https://typeitjs.com"
        },
        {
          name: "JamComments",
          description: "TypeIt is a JavaScript library for creating dynamic typewriter effects. I began working on it back in 2015 as a means of learnig to write better JavaScript. Since then, it's gone through several evolutions is now one of my favorite \"small\" projects to maintain.",
          link: "https://jamcomments.com"
        },
      ]
    }
  }
}
