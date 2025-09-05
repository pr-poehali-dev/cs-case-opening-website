const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-space-dark via-space-deep to-space-dark">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 opacity-30 animate-stellar-pulse">
          <img src="/img/05957a50-b9b1-421d-a4f1-25563743c300.jpg" alt="Cosmic" className="w-full h-full object-cover blur-md" />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20 animate-orbit" style={{animationDuration: '30s'}}>
          <img src="/img/d60c84a4-aa05-46db-b734-003c8041b343.jpg" alt="Nebula" className="w-full h-full object-cover blur-sm rounded-full" />
        </div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 opacity-15 animate-stellar-pulse" style={{animationDelay: '1s'}}>
          <img src="/img/9d5b89a8-d29e-45cf-90af-03a9137d0d3e.jpg" alt="Galaxy" className="w-full h-full object-cover blur-sm" />
        </div>
      </div>
    </div>
  );
};

export default BackgroundEffects;