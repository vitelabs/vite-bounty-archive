import A from "./A.component";
// TODO: Change the href, line 7
const Navbar = () => {
  return (
    <div className="bg-vite-primary w-full h-22 my-0">
      <div className="flex justify-start py-5 px-10 max-w-7xl mx-auto">
        <A className="underline" href="https://vite.org">
        <img alt="Vite logo" src="https://www.vite.org/_nuxt/img/viteLogo-white.7f9038c.svg"></img>
        </A>
      </div>
    </div>
  );
};

export default Navbar;