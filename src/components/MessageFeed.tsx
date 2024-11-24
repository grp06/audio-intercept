import { useState } from 'react';
import { MessageSquare, AlertCircle, Brain, ArrowRight, FileText, ChevronRight } from 'lucide-react';
import { Message, AudioFeed } from '../types';

function PriorityBadge({ priority }: { priority: Message['priority'] }) {
  const colors = {
    high: 'bg-red-600 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-blue-500 text-white',
  };

  return (
    <div className={`${colors[priority]} px-6 py-3 rounded-lg text-2xl font-bold uppercase tracking-wider`}>
      {priority}
    </div>
  );
}

function MessageContent({ message }: { message: Message }) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          Show {showOriginal ? 'Translation' : 'Original'}
        </button>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-lg">
          {showOriginal ? message.originalText : message.translation}
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {showOriginal ? 'Russian Original' : 'English Translation'}
        </p>
      </div>
    </div>
  );
}

function DetailedReport({ feed, message }: { feed: AudioFeed; message: Message }) {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Detailed Analysis Report</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Communication Context</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Feed Source: {feed.name} ({feed.frequency})</li>
              <li>Signal Quality: {feed.strength}% strength</li>
              <li>Priority Level: {feed.priority.toUpperCase()}</li>
              <li>Timestamp: {message.timestamp.toLocaleString()}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Message Content</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-700 mb-2">Original Transmission</h4>
                <p className="font-mono text-slate-800">{message.originalText}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-700 mb-2">English Translation</h4>
                <p className="text-slate-800">{message.translation}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Key Insights</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              {feed.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Recommendations</h3>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Continue monitoring this frequency for follow-up communications</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Cross-reference with other intelligence sources</span>
                </li>
                <li className="flex items-start space-x-2">
                  <ArrowRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Update relevant command structures based on priority level</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MessageAnalysis({ feed }: { feed: AudioFeed | null }) {
  if (!feed) return null;

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-slate-700 mb-2">
            <Brain className="h-5 w-5" />
            <h3 className="font-medium">Sentiment Analysis</h3>
          </div>
          <p className="text-sm text-slate-600">
            {feed.priority === 'high' ? 'Urgent command tone detected' :
             feed.priority === 'medium' ? 'Standard operational communication' :
             'Routine maintenance chatter'}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`px-2 py-1 ${
              feed.priority === 'high' ? 'bg-red-100 text-red-700' :
              feed.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'
            } text-xs rounded-full`}>
              {feed.priority.charAt(0).toUpperCase() + feed.priority.slice(1)} Priority
            </span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-slate-700 mb-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="font-medium">Feed Insights</h3>
          </div>
          <ul className="text-sm text-slate-600 space-y-2">
            {feed.insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 mt-0.5 text-slate-400" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-slate-700 mb-2">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-medium">Feed Details</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>Frequency: {feed.frequency}</p>
            <p>Signal Strength: {feed.strength}%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
              <div 
                className="bg-emerald-500 h-2 rounded-full" 
                style={{ width: `${feed.strength}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessageFeed({ 
  messages,
  feed
}: { 
  messages: Message[];
  feed: AudioFeed | null;
}) {
  const [view, setView] = useState<'overview' | 'report'>('overview');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  if (!feed) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        Select an audio feed to view intercepted transmissions
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600">
          <button 
            onClick={() => setView('overview')}
            className={`hover:text-slate-900 ${view === 'overview' ? 'text-slate-900 font-medium' : ''}`}
          >
            Overview
          </button>
          {view === 'report' && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-900 font-medium">Detailed Report</span>
            </>
          )}
        </nav>

        {view === 'overview' ? (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <PriorityBadge priority={feed.priority} />
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900">{feed.name}</div>
                  <div className="text-sm text-slate-500">{feed.frequency}</div>
                </div>
              </div>
              <MessageAnalysis feed={feed} />
            </div>
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <time className="text-sm text-slate-500">
                    {message.timestamp.toLocaleTimeString()}
                  </time>
                  <button
                    onClick={() => {
                      setSelectedMessage(message);
                      setView('report');
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Generate Detailed Report</span>
                  </button>
                </div>
                <MessageContent message={message} />
              </div>
            ))}
          </>
        ) : (
          selectedMessage && <DetailedReport feed={feed} message={selectedMessage} />
        )}
      </div>
    </div>
  );
}