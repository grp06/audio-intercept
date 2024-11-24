import { useState, useEffect } from 'react';
import Header from './components/Header';
import MessageFeed from './components/MessageFeed';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Message, AudioFeed } from './types';

const mockFeeds: AudioFeed[] = [
  {
    id: '1',
    name: 'Alpha Squad',
    frequency: '126.5 MHz',
    active: true,
    strength: 85,
    priority: 'high',
    insights: [
      'Multiple reinforcement requests detected',
      'Pattern matches pre-offensive communications',
      'High command involvement likely'
    ]
  },
  {
    id: '2',
    name: 'Beta Patrol',
    frequency: '128.2 MHz',
    active: true,
    strength: 92,
    priority: 'medium',
    insights: [
      'Routine patrol communications',
      'Supply line coordination ongoing',
      'Standard operational tempo'
    ]
  },
  {
    id: '3',
    name: 'Delta Force',
    frequency: '133.4 MHz',
    active: true,
    strength: 78,
    priority: 'low',
    insights: [
      'Maintenance and logistics chatter',
      'Weather-related discussions',
      'No tactical significance detected'
    ]
  }
];

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1-1',
      timestamp: new Date(),
      originalText: 'Срочно требуется подкрепление в квадрат 225. Противник наступает.',
      translation: 'Urgent reinforcements needed in grid 225. Enemy advancing.',
      priority: 'high',
      feedId: '1'
    },
    {
      id: '1-2',
      timestamp: new Date(Date.now() - 300000),
      originalText: 'Подтверждаю получение координат. Выдвигаемся.',
      translation: 'Coordinates received. Moving out.',
      priority: 'high',
      feedId: '1'
    }
  ],
  '2': [
    {
      id: '2-1',
      timestamp: new Date(),
      originalText: 'Патруль Бета-2 докладывает спокойную обстановку в секторе.',
      translation: 'Beta-2 patrol reporting calm conditions in sector.',
      priority: 'medium',
      feedId: '2'
    }
  ],
  '3': [
    {
      id: '3-1',
      timestamp: new Date(),
      originalText: 'Запрашиваем техобслуживание для машины номер 47.',
      translation: 'Requesting maintenance for vehicle number 47.',
      priority: 'low',
      feedId: '3'
    }
  ]
};

function App() {
  const [selectedFeedId, setSelectedFeedId] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFeedSelect = (feedId: string) => {
    setSelectedFeedId(feedId);
  };

  const currentMessages = selectedFeedId ? mockMessages[selectedFeedId] : [];
  const currentFeed = selectedFeedId 
    ? mockFeeds.find(feed => feed.id === selectedFeedId)
    : null;

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Header lastUpdate={lastUpdate} />
      <main className="flex-1 flex overflow-hidden">
        <Sidebar 
          feeds={mockFeeds}
          onFeedSelect={handleFeedSelect}
          selectedFeedId={selectedFeedId}
        />
        <MessageFeed 
          messages={currentMessages}
          feed={currentFeed}
        />
      </main>
      <Footer totalMessages={1337} activeConnections={42} />
    </div>
  );
}

export default App;