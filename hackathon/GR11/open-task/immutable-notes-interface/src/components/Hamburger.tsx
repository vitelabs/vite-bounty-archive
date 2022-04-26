type Props = {
  open: boolean;
  onChange: (open: boolean) => void;
};

const Hamburger = ({ open, onChange }: Props) => {
  const line = `h-1 w-6 rounded-full transform bg-black`; // transition duration-300
  return (
    <button className="md:hidden space-y-1 xy flex-col h-12 w-12 group" onClick={() => onChange(!open)}>
      <div className={`${line} ${open ? 'rotate-45 translate-y-2' : ''}`} />
      <div className={`${line} ${open ? 'opacity-0' : ''}`} />
      <div className={`${line} ${open ? '-rotate-45 -translate-y-2' : ''}`} />
    </button>
  );
};

export default Hamburger;
