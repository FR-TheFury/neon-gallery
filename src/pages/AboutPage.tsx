
import FloatingCharacter from "@/components/FloatingCharacter";

const AboutPage = () => {
  return (
    <>
      <FloatingCharacter />
      
      <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-neon-dark to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 neon-text text-center">About Me</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 mb-12">
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden neon-border">
                  {/* Replace with your avatar/profile image */}
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="cyberpunk-card p-6">
                <h2 className="text-2xl font-bold mb-4 neon-text">VRChat Photographer</h2>
                <p className="text-gray-300 mb-4">
                  Welcome to my gallery! I'm a passionate VRChat photographer specializing in cyberpunk and gothic aesthetics. I love capturing unique moments and creating art within virtual worlds.
                </p>
                <p className="text-gray-300">
                  My work focuses on the beauty of digital spaces, the emotions they evoke, and the stories they tell. Through my photography, I aim to bridge the gap between virtual reality and artistic expression.
                </p>
              </div>
            </div>
            
            <div className="cyberpunk-card p-6 mb-12">
              <h2 className="text-2xl font-bold mb-4 neon-text">My Journey</h2>
              <p className="text-gray-300 mb-4">
                I started my journey as a VRChat photographer in 2020, exploring the vast possibilities of virtual photography. What began as a hobby quickly evolved into a passion as I discovered the creative freedom that virtual worlds offer.
              </p>
              <p className="text-gray-300 mb-4">
                Over the years, I've developed a distinctive style that combines neon cyberpunk elements with gothic aesthetics, creating images that feel both futuristic and hauntingly beautiful.
              </p>
              <p className="text-gray-300">
                My work has been featured in virtual galleries and events, and I continue to push the boundaries of what's possible in virtual photography.
              </p>
            </div>
            
            <div className="cyberpunk-card p-6">
              <h2 className="text-2xl font-bold mb-4 neon-text">Equipment & Techniques</h2>
              <p className="text-gray-300 mb-4">
                While traditional photographers rely on physical cameras and lenses, my craft utilizes advanced camera tools within VRChat, combined with post-processing techniques to enhance and perfect each image.
              </p>
              <p className="text-gray-300 mb-4">
                I pay special attention to lighting, composition, and atmosphere, often spending hours setting up the perfect shot. Each image is carefully edited to bring out the neon glow and cyberpunk aesthetic that defines my style.
              </p>
              <p className="text-gray-300">
                I'm constantly exploring new worlds, avatars, and techniques to expand my portfolio and push the boundaries of virtual photography.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
