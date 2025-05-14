import FloatingCharacter from "@/components/FloatingCharacter";

const ContactPage = () => {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-to-b from-neon-dark to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 neon-text text-center">Find Me</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="cyberpunk-card p-6">
              <h2 className="text-2xl font-bold mb-4 neon-text">Social Media</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center neon-border rounded-full mr-4">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Twitter</h3>
                    <a href="#" className="text-neon-purple hover:text-neon-pink transition-colors">@vrphotographer</a>
                  </div>
                </li>
                
                <li className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center neon-border rounded-full mr-4">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Instagram</h3>
                    <a href="#" className="text-neon-purple hover:text-neon-pink transition-colors">@vrchat_gallery</a>
                  </div>
                </li>
                
                <li className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center neon-border rounded-full mr-4">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Discord</h3>
                    <a href="#" className="text-neon-purple hover:text-neon-pink transition-colors">VRChat_Gallery#1234</a>
                  </div>
                </li>
                
                <li className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center neon-border rounded-full mr-4">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.869 5.903l3.114 3.114-1.768 1.768 2.287 2.288-1.414 1.414-2.288-2.287-1.767 1.768-3.114-3.114c.044-.165.066-.338.066-.517 0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2c.179 0 .352-.022.518-.066l3.113 3.114-1.768 1.767 2.287 2.288-1.414 1.414-2.287-2.288-1.768 1.768-3.114-3.114c.044-.165.066-.338.066-.517 0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2c.179 0 .352-.022.518-.066l3.113 3.114 6.4-6.4-3.114-3.114c.044-.165.066-.338.066-.517 0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2c.179 0 .352-.022.518-.066z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">VRChat</h3>
                    <a href="#" className="text-neon-purple hover:text-neon-pink transition-colors">VRChatGallery</a>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="cyberpunk-card p-6">
              <h2 className="text-2xl font-bold mb-4 neon-text">Get In Touch</h2>
              <p className="text-gray-300 mb-6">
                Have questions about my work or interested in collaborations? Feel free to reach out to me through any of my social media platforms or send me an email.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-1">Email</h3>
                  <a href="mailto:contact@vrchatgallery.com" className="text-neon-purple hover:text-neon-pink transition-colors">
                    contact@vrchatgallery.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-1">Virtual World Meet-ups</h3>
                  <p className="text-gray-300">
                    I regularly host virtual photography sessions in VRChat. Join my Discord server for announcements.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cyberpunk-card p-6">
            <h2 className="text-2xl font-bold mb-4 neon-text">Commissions</h2>
            <p className="text-gray-300 mb-4">
              I'm available for commissioned VRChat photography work. Whether you need avatar portraits, event coverage, or artistic shots, I can help bring your vision to life.
            </p>
            <p className="text-gray-300">
              For commission inquiries, please contact me via email with details about your project, and I'll get back to you with pricing and availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
