import { useState } from "react";
import { CharacterQuoteDialog } from "@/components/CharacterQuoteDialog";

// Character data type
type Character = {
  id: string;
  name: string;
  title?: string;
  quote: string;
  gifUrl: string;
  imagePath: string;
};

// Define character data
const characters: Character[] = [
  {
    id: "himely",
    name: "Himely_Puppy",
    quote: "Arf Arf Bark Bark warf warf, and i don't care <3 !",
    gifUrl: "/image/puppy.gif", // Placeholder for you to replace later
    imagePath: "/image/profile.png"
  },
  {
    id: "spy",
    name: "GNRL_K",
    title: "aka THE SPY !",
    quote: "He kidnapped my boyfriend, help me please, donate 1€ on my Tipeee, #FREEBABIMM",
    gifUrl: "/image/spy.gif", // Placeholder for you to replace later
    imagePath: "/image/spy.png"
  },
  {
    id: "hskn",
    name: "HSKN",
    title: "My Family",
    quote: "Family isn't just blood, it's the bonds we forge in virtual worlds and beyond. Together, we are unstoppable.",
    gifUrl: "/image/gojo.gif", // Placeholder for you to replace later
    imagePath: "/image/baby.png"
  },
  {
    id: "panda",
    name: "MisterPandas",
    title: "My Buddy Photographer",
    quote: "I don't take photos, I capture stories and emotions.",
    gifUrl: "/image/photo.gif", // Placeholder for you to replace later
    imagePath: "/image/panda.png"
  }
];

const AboutPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setDialogOpen(true);
  };

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
                <div 
                  className="w-48 h-48 rounded-full overflow-hidden border border-neon-red neon-border cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleCharacterClick(characters[0])}
                >
                  <img
                    src={characters[0].imagePath}
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
              <div 
                className="rounded-md overflow-hidden border border-neon-pink neon-border cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleCharacterClick(characters[1])}
              >
                <img
                    src={characters[1].imagePath}
                    alt="GNRL_K"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
                className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div 
                className="rounded-md overflow-hidden border border-neon-pink neon-border cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleCharacterClick(characters[2])}
              >
                <img
                    src={characters[2].imagePath}
                    alt="HSKN"
                    className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">HSKN !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">My Family</h4>
                <p className="text-gray-300 mb-4">
                  HSKN represents more than just a group - they are my chosen family in the virtual realm. In VRChat, we've built bonds that transcend pixels and avatars. Together, we navigate virtual worlds, support each other through challenges, and create memories that feel as real as any physical experience. They are the foundation of my digital existence, the ones who make every login feel like coming home.
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
              <div 
                className="rounded-md overflow-hidden border border-neon-pink neon-border cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleCharacterClick(characters[3])}
              >
                <img
                    src={characters[3].imagePath}
                    alt="MisterPandas"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* VR Skills Section */}
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
      
      {/* Character Quote Dialog */}
      <CharacterQuoteDialog 
        character={selectedCharacter}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default AboutPage;
