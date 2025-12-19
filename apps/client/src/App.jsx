import { useTheme } from './context/ThemeContext.jsx';
import Heading from './components/Heading.jsx';
import background from './assets/image/bg2.jpg';

export default function App() {
  const { isDark } = useTheme();

  return (
    <div
      className="h-[70vh] bg-cover bg-center bg-fixed"
      style={{
        // backgroundImage: `url(${background})`
        backgroundImage: `url(https://images.unsplash.com/photo-1764377723685-31e60ed8e550?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D)`
      }}
    >
      <div className="min-h-screen px-4">
        <Heading />

        <main className="px-6 py-20 pt-[30vh]">
          <div className="px-2 py-1 w-fit rounded-lg bg-card/90 text-foreground mb-6 text-sm">
            Destination
          </div>


          <div className='flex flex-row max-w-full justify-between items-start'>
            <div>
              <h1 className='text-foreground text-5xl font-bold mb-2'>
                Explore the World with Us
              </h1>

              <p className='text-foreground text-sm max-w-xl'>
                Discover breathtaking destinations, plan your perfect trip, and create unforgettable memories with our expert travel guides and tips.
              </p>
            </div>
            <div>
              <div className='flex text-sm space-x-4 mb-2 text-foreground'>
                <span>Image</span>
                <span>Ritik Ranjan</span>
              </div>
              <div className='flex text-sm space-x-4 mb-2 text-foreground'>
                <span>20 Dec 2025</span>
                <span>10 mins read</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}