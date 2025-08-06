import { useState } from "react";
import { useTranslation } from "react-i18next";
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

const AboutPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation(['about', 'characters']);

  // Define character data with translations
  const characters: Character[] = [
    {
      id: "himely",
      name: t('characters:characters.himely.name'),
      title: t('characters:characters.himely.title'),
      quote: t('characters:characters.himely.quote'),
      gifUrl: "/image/puppy.gif",
      imagePath: "/image/profile.png"
    },
    {
      id: "spy",
      name: t('characters:characters.spy.name'),
      title: t('characters:characters.spy.title'),
      quote: t('characters:characters.spy.quote'),
      gifUrl: "/image/spy.gif",
      imagePath: "/image/spy.png"
    },
    {
      id: "hskn",
      name: "HSKN",
      title: t('about:myFamily'),
      quote: t('about:familyQuote'),
      gifUrl: "/image/AbosluteCInema.gif",
      imagePath: "/image/HKSN Gang.jpg"
    },
    {
      id: "panda",
      name: t('characters:characters.panda.name'),
      title: t('characters:characters.panda.title'),
      quote: t('characters:characters.panda.quote'),
      gifUrl: "/image/photo.gif",
      imagePath: "/image/panda.png"
    }
  ];

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
            <h1 className="text-4xl font-bold mb-8 neon-text text-center">{t('title')}</h1>

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
                <h2 className="text-2xl font-bold mb-4 neon-text">{characters[0].name}</h2>
                <p className="text-gray-300 mb-4">
                  {t('personalDescription1')}
                </p>
                <p className="text-gray-300">
                  {t('personalDescription2')}
                </p>
              </div>
            </div>

            {/* Featured friends and collaborators */}
            <h2 className="text-3xl font-bold mb-6 neon-text text-center">{t('friendsCollaborators')}</h2>

            {/* First collaborator */}
            <div
                className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">{characters[1].name} – {characters[1].title}</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">{t('shadowCompanion')}</h4>
                <p className="text-gray-300 mb-4">
                  {t('spyDescription')}
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
                <h3 className="text-xl font-bold mb-2 text-neon-pink">{characters[2].name} !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">{t('myFamily')}</h4>
                <p className="text-gray-300 mb-4">
                  {t('familyDescription')}
                </p>
              </div>
            </div>

            {/* Second collaborator */}
            <div
                className="cyberpunk-card p-6 mb-12 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-center neon-border">
              <div>
                <h3 className="text-xl font-bold mb-2 text-neon-pink">{characters[3].name} !</h3>
                <h4 className="text-2xl font-bold mb-4 neon-text">{t('buddyPhotographer')}</h4>
                <p className="text-gray-300 mb-4">
                  {t('photographerDescription')}
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
              <h2 className="text-3xl font-bold mb-6 text-neon-red">{t('vrSkills')}</h2>
              
              <div className="space-y-6">
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">{t('avatarEditing')}</span>
                    <span className="text-neon-pink">85%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[85%] rounded-full bg-gradient-to-r from-neon-red to-neon-pink animate-pulse-soft"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">{t('worldExploration')}</span>
                    <span className="text-neon-pink">95%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[95%] rounded-full bg-gradient-to-r from-neon-pink to-blue-400 animate-pulse-slow"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">{t('eventHosting')}</span>
                    <span className="text-neon-pink">90%</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-neon-dark">
                    <div className="absolute left-0 top-0 h-full w-[90%] rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse-medium"></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-white">{t('socialInteraction')}</span>
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
              <h2 className="text-3xl font-bold mb-6 text-neon-red">{t('vrExperience')}</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-neon-pink mb-1">{t('vrAvatarEditor')}</h3>
                  <p className="text-sm text-gray-400 mb-3">2022 - {t('present')}</p>
                  <p className="text-gray-300">{t('avatarEditorDesc')}</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-neon-pink mb-1">{t('worldExplorer')}</h3>
                  <p className="text-sm text-gray-400 mb-3">2018 - {t('present')}</p>
                  <p className="text-gray-300">{t('worldExplorerDesc')}</p>
                </div>
              </div>
            </div>
            
            {/* Interests Section */}
            <div className="cyberpunk-card p-6 border-l-4 border-neon-red neon-border">
              <h2 className="text-3xl font-bold mb-6 text-neon-red">{t('interests')}</h2>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-red to-neon-pink text-white transition-all hover:scale-105">{t('vrContentCreation')}</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-pink to-purple-500 text-white transition-all hover:scale-105">{t('socialImmersion')}</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 text-white transition-all hover:scale-105">{t('threeDDesign')}</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400 text-white transition-all hover:scale-105">{t('gaming')}</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-neon-red text-white transition-all hover:scale-105">{t('vrTechnology')}</span>
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
