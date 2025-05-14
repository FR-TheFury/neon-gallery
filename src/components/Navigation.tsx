
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { galleries } from "@/config/galleries";
import { Home, Menu } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-neon-dark bg-opacity-90 backdrop-blur-md border-b border-neon-red shadow-[0_0_10px_rgba(212,9,93,0.5)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Bouton de menu mobile */}
          <button 
            className="md:hidden text-foreground p-2 neon-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <div className="flex-1 md:flex-none">
            <Link to="/" className="text-2xl font-bold tracking-tighter text-neon-red flex items-center neon-text">
              <img src="/src/image/character.png" alt="Logo" className="mr-2 h-6 w-6" />
              VRChat Gallery
            </Link>
          </div>
          
          {/* Navigation desktop */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link 
                    to="/"
                    className="neon-menu-item flex items-center"
                  >
                    <Home className="mr-2 h-4 w-4" /> Accueil
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-neon-dark hover:text-neon-pink relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-neon-red after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_5px_#D4095D]">
                    Galerie
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2 bg-neon-dark border border-neon-red neon-border">
                      {galleries.map((gallery) => (
                        <li key={gallery.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/gallery/${gallery.id}`}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 relative overflow-hidden",
                                "outline-none focus:bg-accent hover:bg-black hover:text-neon-red",
                                "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-neon-red after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                              )}
                            >
                              {gallery.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/about"
                    className="neon-menu-item relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-neon-red after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_5px_#D4095D]"
                  >
                    À propos
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/contact"
                    className="neon-menu-item relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-neon-red after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_5px_#D4095D]"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-neon-red pt-4">
            <Link 
              to="/" 
              className="block px-4 py-2 rounded-md hover:bg-black hover:text-neon-red relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-neon-red after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="inline-block mr-2 h-4 w-4" /> Accueil
            </Link>
            
            <div className="px-4 py-2">
              <p className="mb-2 font-medium text-neon-red neon-text">Galeries</p>
              <div className="pl-4 space-y-2">
                {galleries.map((gallery) => (
                  <Link 
                    key={gallery.id}
                    to={`/gallery/${gallery.id}`}
                    className="block py-1 hover:text-neon-pink relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-neon-pink after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {gallery.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="block px-4 py-2 rounded-md hover:bg-black hover:text-neon-red relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-neon-red after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            
            <Link 
              to="/contact" 
              className="block px-4 py-2 rounded-md hover:bg-black hover:text-neon-red relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-neon-red after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
