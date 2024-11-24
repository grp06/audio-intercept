export interface Message {
  id: string;
  timestamp: Date;
  originalText: string;
  translation: string;
  priority: 'high' | 'medium' | 'low';
  feedId: string;
}

export interface Insight {
  id: string;
  type: 'term' | 'sentiment' | 'alert';
  content: string;
  timestamp: Date;
}

export interface AudioFeed {
  id: string;
  name: string;
  frequency: string;
  active: boolean;
  strength: number;
  priority: 'high' | 'medium' | 'low';
  insights: string[];
}