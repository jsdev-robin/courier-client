import { Button } from '@repo/ui/components/button';
import {
  Discord,
  Facebook,
  Github,
  Google,
  XformerlyTwitter,
} from '@repo/ui/icons/index';

const providers = [
  {
    name: 'Meta',
    Icon: Facebook,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/facebook`,
    label: 'Login with Meta',
  },
  {
    name: 'GitHub',
    Icon: Github,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/github`,
    label: 'Login with GitHub',
  },
  {
    name: 'Discord',
    Icon: Discord,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/discord`,
    label: 'Login with Discord',
  },
  {
    name: 'Google',
    Icon: Google,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/google`,
    label: 'Login with Google',
  },
  {
    name: 'X',
    Icon: XformerlyTwitter,
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user/twitter`,
    label: 'Login with X',
  },
];

const OauthButtons = () => {
  return (
    <>
      {providers.map(({ name, Icon, label, url }) => (
        <Button
          key={name}
          variant="outline"
          size="icon"
          type="button"
          onClick={() => (window.location.href = url)}
        >
          <Icon />
          <span className="sr-only">{label}</span>
        </Button>
      ))}
    </>
  );
};

export default OauthButtons;
