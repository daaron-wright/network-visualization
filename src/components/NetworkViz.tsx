import * as React from 'react';
import { Network, Building, BookOpen, Briefcase, User, Users, Info, Database, Shield } from 'lucide-react';

type NodeType = 'Proposition' | 'Service Line' | 'Enabling Capability' | 'Channel';
type ConnectionType = 'service' | 'capability' | 'channel';

interface NodeDetails {
  components: string[];
  icon: React.FC<any>;
  type: NodeType;
  globalLeader: string;
  keyContacts: string[];
}

interface Position {
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
  type: ConnectionType;
}

const NetworkViz: React.FC = () => {
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(['Global']);

  const countries = [
    'Global', 'US', 'UKI', 'Canada', 'Iberia', 'France', 
    'Italy', 'Germany', 'India', 'SM', 'Japan', 'ANZ', 'Nordics'
  ];

  const marketPresence: Record<string, string[]> = {
    'Cloud': ['Global', 'US', 'UKI', 'Germany', 'France', 'India', 'Japan', 'ANZ'],
    'Enterprise Services': ['Global', 'US', 'UKI', 'Canada', 'Germany', 'France'],
    'CoreZ': ['Global', 'US', 'France', 'Germany', 'Japan'],
    'DWS': ['Global', 'US', 'UKI', 'India', 'Germany'],
    'Network & Edge': ['Global', 'US', 'UKI', 'Germany', 'France', 'Italy'],
    'Sec & Res': ['Global', 'US', 'UKI', 'Germany', 'France', 'India'],
    'Data and AI': ['Global', 'US', 'India', 'Germany', 'UKI', 'Japan'],
    'Enterprise Transformation': ['Global', 'US', 'Germany', 'UKI', 'France', 'India'],
    'Growth': ['Global', 'US', 'UKI', 'Germany', 'France'],
    'Collaboratives': ['Global', 'US', 'UKI', 'Germany', 'India'],
    'Industry': ['Global', 'US', 'UKI', 'Germany', 'France', 'Japan'],
    'Kyndryl Vital': ['Global', 'US', 'UKI', 'Canada', 'France', 'Germany', 'India', 'Japan', 'ANZ']
  };

  const nodeDetails: Record<string, NodeDetails> = {
    'Cloud': {
      components: ['Cloud Strategy', 'Migration Services', 'Cloud Operations'],
      icon: Network,
      type: 'Proposition',
      globalLeader: 'To be assigned',
      keyContacts: ['To be assigned']
    },
    'Enterprise Services': {
      components: ['Advisory', 'Implementation', 'Managed Services'],
      icon: Building,
      type: 'Proposition',
      globalLeader: 'To be assigned',
      keyContacts: ['To be assigned']
    },
    'Enterprise Transformation': {
      components: ['Transformation Strategy', 'Process Optimization'],
      icon: Building,
      type: 'Service Line',
      globalLeader: 'To be assigned',
      keyContacts: ['To be assigned']
    },
    'Data and AI': {
      components: ['Data Analytics', 'AI/ML Solutions'],
      icon: Database,
      type: 'Service Line',
      globalLeader: 'To be assigned',
      keyContacts: ['To be assigned']
    },
    'Growth': {
      components: ['Investment Cases', 'GTM Strategy'],
      icon: Briefcase,
      type: 'Enabling Capability',
      globalLeader: 'To be assigned',
      keyContacts: ['To be assigned']
    },
    'Kyndryl Vital': {
      components: ['Co-creation', 'Design', 'Innovation', 'Experience'],
      icon: BookOpen,
      type: 'Channel',
      globalLeader: 'To be assigned',
      keyContacts: ['To be assigned']
    }
  };

  const nodePositions: Record<string, Position> = {
    'Cloud': { x: 50, y: 80 },
    'Enterprise Services': { x: 50, y: 180 },
    'CoreZ': { x: 50, y: 280 },
    'DWS': { x: 50, y: 380 },
    'Network & Edge': { x: 50, y: 480 },
    'Sec & Res': { x: 50, y: 580 },
    'Enterprise Transformation': { x: 300, y: 130 },
    'Data and AI': { x: 300, y: 430 },
    'Growth': { x: 550, y: 80 },
    'Collaboratives': { x: 550, y: 180 },
    'Industry': { x: 550, y: 280 },
    'Consulting Workforce Transformation': { x: 550, y: 380 },
    'Methods & Tools': { x: 550, y: 480 },
    'Kyndryl Vital': { x: 800, y: 80 },
    'Hyperscalers': { x: 800, y: 180 },
    'Partner Network': { x: 800, y: 280 },
    'Direct Enterprise': { x: 800, y: 380 }
  };

  const connections: Connection[] = [
    { from: 'Cloud', to: 'Enterprise Transformation', type: 'service' },
    { from: 'Enterprise Services', to: 'Enterprise Transformation', type: 'service' },
    { from: 'CoreZ', to: 'Data and AI', type: 'service' },
    { from: 'DWS', to: 'Data and AI', type: 'service' },
    { from: 'Network & Edge', to: 'Data and AI', type: 'service' },
    { from: 'Sec & Res', to: 'Data and AI', type: 'service' },
    { from: 'Enterprise Transformation', to: 'Growth', type: 'capability' },
    { from: 'Enterprise Transformation', to: 'Collaboratives', type: 'capability' },
    { from: 'Enterprise Transformation', to: 'Industry', type: 'capability' },
    { from: 'Data and AI', to: 'Industry', type: 'capability' },
    { from: 'Data and AI', to: 'Consulting Workforce Transformation', type: 'capability' },
    { from: 'Data and AI', to: 'Methods & Tools', type: 'capability' },
    { from: 'Growth', to: 'Kyndryl Vital', type: 'channel' },
    { from: 'Growth', to: 'Hyperscalers', type: 'channel' },
    { from: 'Collaboratives', to: 'Partner Network', type: 'channel' },
    { from: 'Industry', to: 'Direct Enterprise', type: 'channel' },
    { from: 'Methods & Tools', to: 'Direct Enterprise', type: 'channel' }
  ];

  const isNodeActive = (nodeName: string): boolean => {
    const nodeMarkets = marketPresence[nodeName] || [];
    return nodeMarkets.some(market => selectedCountries.includes(market));
  };

  const generateOrganicSpline = (from: string, to: string): string => {
    const fromPos = nodePositions[from];
    const toPos = nodePositions[to];
    
    const startX = fromPos.x + 150;
    const startY = fromPos.y + 20;
    const endX = toPos.x;
    const endY = toPos.y + 20;
    
    const dx = endX - startX;
    const dy = endY - startY;
    
    const verticalOffset = Math.min(Math.abs(dy) * 0.5, 100);
    const horizontalOffset = Math.abs(dx) * 0.2;
    
    const cp1x = startX + horizontalOffset;
    const cp1y = startY + (dy > 0 ? verticalOffset : -verticalOffset);
    const cp2x = endX - horizontalOffset;
    const cp2y = endY + (dy > 0 ? -verticalOffset : verticalOffset);

    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-8">
      <div className="mb-8 flex flex-wrap gap-2">
        {countries.map(country => (
          <button
            key={country}
            onClick={() => setSelectedCountries(prev => 
              prev.includes(country) 
                ? prev.filter(c => c !== country)
                : [...prev, country]
            )}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCountries.includes(country)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[800px] bg-white rounded-lg shadow-sm p-4 overflow-auto">
        <svg width="1000" height="750" viewBox="0 0 1000 750" className="w-full">
          {connections.map(({ from, to, type }) => {
            const isActive = isNodeActive(from) && isNodeActive(to);
            const path = generateOrganicSpline(from, to);

            return (
              <path
                key={`${from}-${to}`}
                d={path}
                fill="none"
                stroke={isActive ? (type === 'service' ? '#93c5fd' : '#fca5a5') : '#e5e7eb'}
                strokeWidth={1.5}
                strokeDasharray={isActive ? '' : '6 4'}
                className="transition-colors"
                style={{ opacity: isActive ? 0.7 : 0.3 }}
              />
            );
          })}

          {Object.entries(nodePositions).map(([nodeName, position]) => {
            const isActive = isNodeActive(nodeName);
            
            return (
              <g
                key={nodeName}
                transform={`translate(${position.x}, ${position.y})`}
                onClick={() => setSelectedNode(nodeName === selectedNode ? null : nodeName)}
                className="cursor-pointer"
                style={{ opacity: isActive ? 1 : 0.5 }}
              >
                <rect
                  x="0"
                  y="0"
                  width="150"
                  height="40"
                  rx="6"
                  fill={isActive ? 'white' : '#f3f4f6'}
                  stroke={selectedNode === nodeName ? '#3b82f6' : '#e5e7eb'}
                  strokeWidth={2}
                  className="transition-colors"
                />
                <text
                  x="75"
                  y="20"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-medium"
                  fill={isActive ? '#1f2937' : '#9ca3af'}
                >
                  {nodeName}
                </text>
              </g>
            );
          })}
        </svg>

        {selectedNode && nodeDetails[selectedNode] && (
          <div className="absolute left-8 top-24 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                {React.createElement(nodeDetails[selectedNode].icon, { 
                  className: "h-5 w-5 text-blue-500" 
                })}
                <div>
                  <div className="text-lg font-semibold">{selectedNode}</div>
                  <div className="text-sm text-gray-600">{nodeDetails[selectedNode].type}</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4" />
                  Global Leader
                </div>
                <div className="mt-1 text-sm text-gray-600 pl-6">
                  {nodeDetails[selectedNode].globalLeader}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="h-4 w-4" />
                  Key Contacts
                </div>
                <div className="mt-1 space-y-1 text-sm text-gray-600 pl-6">
                  {nodeDetails[selectedNode].keyContacts.map((contact, i) => (
                    <div key={i}>{contact}</div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Components
                </div>
                <div className="space-y-2">
                  {nodeDetails[selectedNode].components.map((component, i) => (
                    <div key={i} className="bg-blue-50 px-3 py-2 rounded-md text-sm text-gray-700">
                      {component}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Market Presence
                </div>
                <div className="flex flex-wrap gap-2">
                  {marketPresence[selectedNode].map(country => (
                    <span 
                      key={country}
                      className={`px-2 py-1 rounded text-xs ${
                        selectedCountries.includes(country)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkViz;