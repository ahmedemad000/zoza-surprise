import { useState } from 'react';
import Ambient from './components/Ambient';
import Envelope from './components/Envelope';
import Hero from './components/Hero';
import MessageSection from './components/MessageSection';
import Timeline from './components/Timeline';
import MomentsGallery from './components/MomentsGallery';
import Finale from './components/Finale';
import MusicPlayer from './components/MusicPlayer';

const NAME = 'ZOZA';
const SIGNATURE = '3OMDA'; // 👈 replace with your actual name

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Ambient count={16} theme="light" />

      <Envelope name={NAME} onOpen={() => setOpened(true)} />
      <MusicPlayer start={opened} />

      {opened && (
        <main className="relative z-10">
          <Hero name={NAME} />
          <MessageSection />
          <Timeline />
          <MomentsGallery />
          <Finale name={NAME} signature={SIGNATURE} />
        </main>
      )}
    </div>
  );
}
