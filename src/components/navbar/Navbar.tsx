import LargeNav from './large/LargeNav';
import MobileNav from './mobile/MobileNav';
interface MProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar = ({ openMenu, setOpenMenu }: MProps): JSX.Element => {
  return (
    <nav>
      <LargeNav />
      {openMenu && <MobileNav openMenu={openMenu} setOpenMenu={setOpenMenu} />}
    </nav>
  );
};

export default Navbar;
