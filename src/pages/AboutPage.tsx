
const AboutPage = () => {
  return (
    <>
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
        {/* Image côté gauche - intégrée au fond */}
        <div className="hidden lg:block absolute left-0 top-0 h-full w-1/4 overflow-hidden pointer-events-none">
          <img 
            src="/lovable-uploads/a477eaf9-b6df-4755-aae1-5b5d92771e94.png" 
            alt="Left background"
            className="absolute left-0 top-0 h-full object-contain opacity-50"
          />
        </div>
        
        {/* Image côté droit - intégrée au fond */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-1/4 overflow-hidden pointer-events-none">
          <img 
            src="/lovable-uploads/fe070187-8a25-42dc-9734-966d76c59dcb.png" 
            alt="Right background"
            className="absolute right-0 top-0 h-full object-contain opacity-50"
          />
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
                      src="/src/image/profile.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border">
                <h2 className="text-2xl font-bold mb-4 neon-text">Himely_Puppy</h2>
                <p className="text-gray-300 mb-4">
                  Hi! I'm Himely, a virtual reality enthusiast and an untiring explorer of the VRChat worlds. My mission
                  is to create unforgettable immersive experiences and connect with people from all over the world
                  through this incredible platform.
                </p>
                <p className="text-gray-300">
                  On VRChat, I love customizing my avatars, exploring creative worlds, and most importantly,
                  participating in community events. Every day is a new adventure, and I enjoy pushing the boundaries of
                  what's possible in the virtual world.
                </p>
              </div>
            </div>

            {/* Featured friends and collaborators */}
            <h2 className="text-3xl font-bold mb-6 neon-text text-center">Friends & Collaborators</h2>

            {/* First collaborator */}
            <div
                className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">GNRL_K – aka THE SPY !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">My Shadow Companion</h4>
                <p className="text-gray-300 mb-4">
                  THE SPY isn't just one of my closest friends — he's a silent force behind the scenes. Always watching, always sharp, he spots what others miss. His presence is subtle but essential, woven into every move I make. Many plans wouldn't have come together without his insight and loyalty. Thank you, brother in the shadows, for your unmatched instinct and unwavering support.
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-neon-pink neon-border">
                <img
                    src="/src/image/spy.png"
                    alt="GNRL_K"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
                className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div className="rounded-md overflow-hidden border border-neon-pink neon-border">
                <img
                    src="/src/image/baby.png"
                    alt="BaBimm"
                    className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">BaBimm !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">My Baby Boy &lt;3</h4>
                <p className="text-gray-300 mb-4">
                  I realized that I had found the Baby Boy of my life. BaBimm is not just my partner but my soulmate,
                  someone who brings warmth and happiness to every moment of my life. Since that day, my world has been
                  brighter, filled with love, and I can't wait to share more beautiful memories together.
                </p>
              </div>
            </div>

            {/* Second collaborator */}
            <div
                className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">MisterPandas !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">My Buddy Photographer</h4>
                <p className="text-gray-300 mb-4">
                  MisterPandas is the talented photographer behind all the photos and GIFs on my site. His passion for
                  capturing the perfect moments has made my VR experiences shine like never before. Every shot tells a
                  story, and I am forever grateful for his amazing work and artistic vision.
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-neon-pink neon-border">
                <img
                    src="/src/image/panda.png"
                    alt="MisterPandas"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* VR Skills Section - Remplacé à partir d'ici */}
            <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border mb-12">
              <h2 className="text-3xl font-bold mb-6 text-neon-red">VR Skills</h2>
              
              <div className="space-y-6">
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">Avatar Edition</span>
                    <span className="text-neon-pink">85%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[85%] rounded-full bg-gradient-to-r from-neon-red to-neon-pink animate-pulse-soft"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">World Exploration</span>
                    <span className="text-neon-pink">95%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[95%] rounded-full bg-gradient-to-r from-neon-pink to-blue-400 animate-pulse-slow"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">Event Hosting</span>
                    <span className="text-neon-pink">90%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[90%] rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse-medium"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">Social Interaction</span>
                    <span className="text-neon-pink">98%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[98%] rounded-full bg-gradient-to-r from-purple-500 to-neon-red animate-pulse-soft"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* VR Experience Section */}
            <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border mb-12">
              <h2 className="text-3xl font-bold mb-6 text-neon-red">VR Experience</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-neon-pink mb-1">VR Avatar Editor</h3>
                  <p className="text-sm text-gray-400 mb-3">2022 - Present</p>
                  <p className="text-gray-300">I have customized numerous avatars for myself and others, exploring various techniques and tools to perfect my craft.</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-neon-pink mb-1">World Explorer</h3>
                  <p className="text-sm text-gray-400 mb-3">2018 - Present</p>
                  <p className="text-gray-300">I have traveled and explored more than 500 worlds in VRChat, discovering unique environments and participating in immersive quests.</p>
                </div>
              </div>
            </div>
            
            {/* Interests Section */}
            <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border">
              <h2 className="text-3xl font-bold mb-6 text-neon-red">Interests</h2>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-red to-neon-pink text-white transition-all hover:scale-105">VR Content Creation</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-pink to-purple-500 text-white transition-all hover:scale-105">Social Immersion</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 text-white transition-all hover:scale-105">3D Design</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400 text-white transition-all hover:scale-105">Gaming</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-neon-red text-white transition-all hover:scale-105">VR Technology</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
