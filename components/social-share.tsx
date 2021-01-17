import { SITE_URL} from '../lib/constants';
import LinkedInIcon from './icon-linkedin';
import TwitterIcon from './icon-twitter';
import FacebookIcon from './icon-facebook';
import { createElement } from 'react';

const SocialShare = ({title, url}) => {
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      url: `https://twitter.com/intent/tweet?text=${encodedTitle} - @amacarthur} ${url}`,
      icon: TwitterIcon
    },
    {
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: FacebookIcon
    }, {
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodedTitle}&source=${SITE_URL}`,
      icon: LinkedInIcon
    }
  ];

  const Divider = () => {
    return <hr className="border-0 bg-gray-300 w-full max-w-xl mx-auto mt-20" style={{ height: '1px' }} />;
  }

  return (
    <div>
      <Divider />
      <div className="flex justify-center items-center py-10">
        <span className="block mr-10 prose">
          Helpful, interesting, or something else positive? Share!
        </span>

        <ul className="flex">
          {links.map(link => {
            const { icon, url } = link;

            return (
              <li>
                <a href={url} className="block w-8 h-8">
                  {createElement(icon as any)}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <Divider />
    </div>
  )
};

export default SocialShare;
