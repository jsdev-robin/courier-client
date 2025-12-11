import Discord from "./discord";
import Facebook from "./facebook";
import Github from "./github";
import Google from "./google";
import Instagram from "./instagram";
import XformerlyTwitter from "./x-twitter";
import Youtube from "./youtube";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export {
  Github,
  Facebook,
  XformerlyTwitter,
  Discord,
  Google,
  Youtube,
  Instagram,
};
