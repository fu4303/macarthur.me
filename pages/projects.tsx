import Layout from '../components/layout'
import Container from '../components/container'
import PageLayout from '../components/page-layout';
import Title from '../components/title'

const Star = (props) => {
  return (
    <span {...props} >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </span>
  )
}

const Arrow = (props) => {
  return (
    <span {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path className="stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </span>
  )
}

const Projects = ({ repos }) => {
  return (
    <PageLayout>
      <Title>
        Projects
      </Title>

      <h2 className="text-4xl font-semibold mb-6">Featured Projects</h2>

      <div className="mb-8">
        <p className="prose">

        </p>
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
            <li key={repo.html_url} className="border-2 border-gray-200 rounded-lg p-10 project-card flex flex-col">

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

              <a {...linkProps} className={"text-purple-400 inline-flex items-center space-x-2 hover:text-purple-500 mt-auto"}>
                <span>Learn More</span>
                <Arrow className="block h-6 w-6" />
              </a>
            </li>
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
      repos
    }
  }
}
