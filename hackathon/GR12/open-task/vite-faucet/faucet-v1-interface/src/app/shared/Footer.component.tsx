import { GithubIcon, TwitterIcon } from "../utils/misc";
import A from "./A.component";

const Footer = () => {
  return (
    <div className="w-full flex justify-center mb-5 space-x-10">
      <A href="https://github.com/hellojustxn/vite-faucet"><GithubIcon /></A> 
    </div>
  );
};

export default Footer;