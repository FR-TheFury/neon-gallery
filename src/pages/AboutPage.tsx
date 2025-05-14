
import FloatingCharacter from "@/components/FloatingCharacter";

const AboutPage = () => {
  return (
    <>
      <FloatingCharacter count={3} />
      
      {/* Header banner with third image */}
      <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <img 
          src="/lovable-uploads/ff1c78a7-8325-4f2a-ba76-34ec60f3085d.png" 
          alt="Header banner" 
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-dark"></div>
      </div>
      
      <div className="pt-12 pb-16 min-h-screen bg-gradient-to-b from-neon-dark to-black relative">
        {/* Image côté gauche */}
        <div className="hidden lg:block absolute left-0 top-0 h-full w-1/6 overflow-hidden pointer-events-none">
          <div className="relative h-full w-full">
            <img 
              src="/lovable-uploads/a477eaf9-b6df-4755-aae1-5b5d92771e94.png" 
              alt="Left avatar"
              className="absolute left-0 top-1/4 w-full object-contain opacity-80 neon-border"
            />
          </div>
        </div>
        
        {/* Image côté droit */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-1/6 overflow-hidden pointer-events-none">
          <div className="relative h-full w-full">
            <img 
              src="/lovable-uploads/fe070187-8a25-42dc-9734-966d76c59dcb.png" 
              alt="Right avatar"
              className="absolute right-0 top-2/3 w-full object-contain opacity-80 neon-border"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto lg:max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 neon-text text-center">About Me</h1>
            
            {/* Main profile section */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 mb-12">
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border border-neon-red neon-border">
                  {/* Replace with avatar/profile image */}
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border">
                <h2 className="text-2xl font-bold mb-4 neon-text">Himely_Puppy</h2>
                <p className="text-gray-300 mb-4">
                  Hi! I'm Himely, a virtual reality enthusiast and an untiring explorer of the VRChat worlds. My mission is to create unforgettable immersive experiences and connect with people from all over the world through this incredible platform.
                </p>
                <p className="text-gray-300">
                  On VRChat, I love customizing my avatars, exploring creative worlds, and most importantly, participating in community events. Every day is a new adventure, and I enjoy pushing the boundaries of what's possible in the virtual world.
                </p>
              </div>
            </div>
            
            {/* Featured friends and collaborators */}
            <h2 className="text-3xl font-bold mb-6 neon-text text-center">Friends & Collaborators</h2>
            
            {/* First collaborator */}
            <div className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">BaBimm !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">My Baby Boy &lt;3</h4>
                <p className="text-gray-300 mb-4">
                  I realized that I had found the Baby Boy of my life. BaBimm is not just my partner but my soulmate, someone who brings warmth and happiness to every moment of my life. Since that day, my world has been brighter, filled with love, and I can't wait to share more beautiful memories together.
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-neon-pink neon-border">
                <img 
                  src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6" 
                  alt="BaBimm" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Second collaborator */}
            <div className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">MisterPandas !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">My Buddy Photographer</h4>
                <p className="text-gray-300 mb-4">
                  MisterPandas is the talented photographer behind all the photos and GIFs on my site. His passion for capturing the perfect moments has made my VR experiences shine like never before. Every shot tells a story, and I am forever grateful for his amazing work and artistic vision.
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-neon-pink neon-border">
                <img 
                  src="https://images.unsplash.com/photo-1555952494-efd681c7e3f9" 
                  alt="MisterPandas" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Equipment & Techniques Section */}
            <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border">
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
