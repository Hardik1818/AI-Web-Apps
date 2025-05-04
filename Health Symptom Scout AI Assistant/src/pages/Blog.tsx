
import Navbar from '@/components/Navbar';
import { Calendar } from 'lucide-react';

const blogPosts = [
  {
    title: "Understanding Common Cold Symptoms",
    excerpt: "Learn about the most common symptoms of a cold and how to treat them effectively at home.",
    date: "2024-03-15",
    category: "Health Tips",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "The Importance of Mental Health",
    excerpt: "Discover why mental health is just as important as physical health and how to maintain it.",
    date: "2024-03-14",
    category: "Mental Health",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Nutrition Guide for a Healthy Life",
    excerpt: "A comprehensive guide to maintaining a balanced diet and healthy lifestyle.",
    date: "2024-03-13",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold sm:text-5xl">Health & Wellness Blog</h1>
            <p className="text-muted-foreground text-lg">
              Stay informed with the latest health insights and medical research
            </p>
            
            {/* Featured Image */}
            <div className="relative mt-8 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80"
                alt="Health Blog"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="text-primary font-medium">Featured Article</span>
                <h2 className="text-2xl font-bold mt-2">Latest Healthcare Innovations</h2>
                <p className="mt-2 text-gray-200">Discover the newest advancements in medical technology</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="glass-card rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-64 md:h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent md:hidden"></div>
                  </div>
                  <div className="p-6 md:w-2/3 md:flex md:flex-col md:justify-center">
                    <div className="flex items-center space-x-2 text-sm text-primary mb-2">
                      <span className="font-medium">{post.category}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center space-x-1 group">
                      <span>Read More</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
