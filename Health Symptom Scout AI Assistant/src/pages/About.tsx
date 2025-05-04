
import Navbar from '@/components/Navbar';
import { ThemeToggle } from '@/components/ThemeToggle';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold sm:text-5xl">About MedAI</h1>
            <p className="text-muted-foreground text-lg">
              Empowering you with AI-driven health insights
            </p>
            
            {/* Hero Image */}
            <div className="relative mt-8 overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&auto=format&fit=crop&q=80"
                alt="Healthcare Innovation"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>

          <div className="grid gap-12">
            <div className="glass-card rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <p className="text-muted-foreground">
                  MedAI leverages cutting-edge artificial intelligence to provide personalized health recommendations.
                  Our mission is to make preliminary health insights accessible to everyone, helping you make informed
                  decisions about your well-being.
                </p>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80"
                    alt="Healthcare Mission"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80"
                    alt="How It Works"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold">How It Works</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>1. Enter your symptoms</li>
                    <li>2. Our AI analyzes the data</li>
                    <li>3. Receive personalized recommendations</li>
                    <li>4. Get lifestyle and dietary advice</li>
                  </ul>
                </div>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80"
                    alt="Our Values"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-semibold">Our Values</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Privacy-first approach</li>
                    <li>• Evidence-based recommendations</li>
                    <li>• Continuous improvement</li>
                    <li>• User empowerment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
