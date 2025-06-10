
import { Link } from "react-router-dom";
import { SiSoundcloud, SiSpotify, SiYoutube, SiApplemusic } from "react-icons/si";

const Footer = () => {
  // Custom Deezer icon component
  const DeezerIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.81 12.74h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm-4.09 1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm-4.09 2.96h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm-4.09 4.44h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74zm0-1.48h-3.27v.74h3.27v-.74z"/>
    </svg>
  );

  return (
    <footer className="bg-neon-dark bg-opacity-90 backdrop-blur-md py-8 border-t border-neon-purple">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">VRChat Gallery</h3>
            <p className="text-sm text-gray-300">
              A showcase of my VRChat photography with a neon cyberpunk gothic aesthetic.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-300 hover:text-neon-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery/galleryMain" className="text-sm text-gray-300 hover:text-neon-pink transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/music" className="text-sm text-gray-300 hover:text-neon-pink transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-neon-pink transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-neon-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">My Music</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://open.spotify.com/intl-fr/artist/0Lms7v1qvEfqjLRGMCJUuY?si=Sfp8IoYlReibnmQwRIjXDg" 
                 className="text-gray-300 hover:text-green-500 transition-colors" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span className="sr-only">Spotify</span>
                <SiSpotify className="h-6 w-6" />
              </a>
              <a href="https://music.apple.com/fr/artist/himely/1818506619" 
                 className="text-gray-300 hover:text-white transition-colors" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span className="sr-only">Apple Music</span>
                <SiApplemusic className="h-6 w-6" />
              </a>
              <a href="https://www.deezer.com/fr/artist/328787671" 
                 className="text-gray-300 hover:text-orange-500 transition-colors" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span className="sr-only">Deezer</span>
                <DeezerIcon />
              </a>
              <a href="https://soundcloud.com/himely_pup" 
                 className="text-gray-300 hover:text-orange-600 transition-colors" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span className="sr-only">SoundCloud</span>
                <SiSoundcloud className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@Himely_pup" 
                 className="text-gray-300 hover:text-red-500 transition-colors" 
                 target="_blank" 
                 rel="noopener noreferrer">
                <span className="sr-only">YouTube Music</span>
                <SiYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">Connect With Me</h3>
            <div className="flex space-x-4">
              <a href="https://vrchat.com/home/user/usr_2ae80e8b-e70e-494a-aebb-6e457a26fcff" className="text-gray-300 hover:text-neon-purple transition-colors">
                <span className="sr-only">VRChat</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.5 4.5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm6.5 1.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-6.501 7.337C6.972 15.337 4 16.387 4 17.25c0 1.012 3.76 2.25 8 2.25s8-1.238 8-2.25c0-.863-2.973-1.913-6.499-1.913-1.25 0-2.381.107-3.397.274a.42.42 0 0 1-.208 0c-1.016-.167-2.147-.274-3.397-.274z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/himely_puppyvrc/"
                 className="text-gray-300 hover:text-neon-purple transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discordapp.com/users/himely_puppy" className="text-gray-300 hover:text-neon-purple transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} VRChat Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
