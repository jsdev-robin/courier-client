import MainLogo from '../../../../ui/main-logo';

const Header = () => {
  return (
    <header className="border-b border-border py-3">
      <div className="container">
        <div className="flex items-center">
          <MainLogo />
        </div>
      </div>
    </header>
  );
};

export default Header;
