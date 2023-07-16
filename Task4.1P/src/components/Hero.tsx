import officeHero from '@/assets/office2.svg';

function Hero() {
  return (
    <>
      <div className="m-10 flex flex-col md:flex-row items-center justify-center">
        <img src={officeHero} alt="colleagues at office" className="w-4/5" />
        <div className="flex flex-col text-left bg-white p-5 rounded-lg">
          <h2 className="text-xl lg:text-4xl xl:text-5xl font-yeseva select-none">
            Find Developers.
          </h2>
          <p className="text-sm lg:text-xl font-josefin italic select-none">
            From the comfort of your home.
          </p>
        </div>
      </div>
    </>
  );
}

export default Hero;
