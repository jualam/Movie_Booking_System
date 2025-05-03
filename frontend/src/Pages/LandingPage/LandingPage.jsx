import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* 3D background,tailwind website */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen opacity-20 filter blur-3xl"></div>
      </div>

      {/* Main Part*/}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Movie Booking System</span>
        </h1>
        <p className="text-xl text-gray-300 mb-12 font-light tracking-wider">Your gateway to cinematic experiences</p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            to="/login" 
            className="relative bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Login</span>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-b from-yellow-400 to-yellow-700 opacity-70"></span>
          </Link>
          
          <Link 
            to="/register" 
            className="relative bg-transparent hover:bg-gray-800/80 border-2 border-gray-300 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transform hover:scale-105 active:scale-95 group"
          >
            <span className="relative z-10">Register</span>
            <span className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </div>
      </div>
      <p className="relative z-10 text-gray-500 mt-16 text-sm tracking-wide">
        Serving theaters in 6 locations across Texas
      </p>
      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 md:px-8 text-center text-gray-400">
          <p>© 2025 Movie Booking System. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;