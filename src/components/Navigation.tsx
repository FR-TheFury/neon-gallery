
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { galleries } from "@/config/galleries";
import { Home, Menu } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-neon-dark bg-opacity-90 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <div className="flex-1 md:flex-none">
            <Link to="/" className="text-2xl font-bold tracking-tighter neon-text animate-pulse-neon">
              VRChat Gallery
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link 
                    to="/"
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium",
                      "rounded-md transition-colors hover:bg-secondary"
                    )}
                  >
                    <Home className="mr-2 h-4 w-4" /> Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-secondary">Gallery</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {galleries.map((gallery) => (
                        <li key={gallery.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={`/gallery/${gallery.id}`}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3",
                                "outline-none focus:bg-accent hover:bg-secondary hover:neon-text"
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
                    className={cn(
                      "px-4 py-2 text-sm font-medium",
                      "rounded-md transition-colors hover:bg-secondary"
                    )}
                  >
                    About
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/contact"
                    className={cn(
                      "px-4 py-2 text-sm font-medium",
                      "rounded-md transition-colors hover:bg-secondary"
                    )}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 rounded-md hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="inline-block mr-2 h-4 w-4" /> Home
            </Link>
            
            <div className="px-4 py-2">
              <p className="mb-2 font-medium">Galleries</p>
              <div className="pl-4 space-y-2">
                {galleries.map((gallery) => (
                  <Link 
                    key={gallery.id}
                    to={`/gallery/${gallery.id}`}
                    className="block py-1 hover:neon-text"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {gallery.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              to="/about" 
              className="block px-4 py-2 rounded-md hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className="block px-4 py-2 rounded-md hover:bg-secondary"
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
