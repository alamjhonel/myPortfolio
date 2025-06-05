
const VISITORS_KEY = 'visitors';

export interface VisitorData {
  id: string;
  ip: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  isBlocked: boolean;
  operatingSystem?: string;
  browser?: string;
  browserVersion?: string;
  device?: string;
  deviceType?: string;
  model?: string;
}

export interface LocationData {
  ip: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
}

export async function getVisitorLocation(): Promise<LocationData> {
  try {
    // Use ipapi.co which supports HTTPS and has good CORS support
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.ip) {
      return {
        ip: data.ip,
        country: data.country_name || data.country || 'Unknown',
        city: data.city || 'Unknown',
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0
      };
    } else {
      throw new Error('Failed to get location data');
    }
  } catch (error) {
    console.error('Error getting visitor location:', error);
    
    try {
      // Fallback to another service
      const fallbackResponse = await fetch('https://api.ipify.org?format=json');
      const fallbackData = await fallbackResponse.json();
      
      return {
        ip: fallbackData.ip || 'Unknown',
        country: 'Unknown',
        city: 'Unknown',
        latitude: 0,
        longitude: 0
      };
    } catch (fallbackError) {
      console.error('Fallback IP service also failed:', fallbackError);
      
      // Final fallback with random coordinates for demo purposes
      return {
        ip: 'Demo IP',
        country: 'Demo Country',
        city: 'Demo City',
        latitude: Math.random() * 180 - 90,
        longitude: Math.random() * 360 - 180
      };
    }
  }
}

export function saveVisitor(visitorData: VisitorData): void {
  const visitors = getVisitorsList();
  visitors.push(visitorData);
  localStorage.setItem(VISITORS_KEY, JSON.stringify(visitors));
}

export function getVisitorsList(): VisitorData[] {
  const storedVisitors = localStorage.getItem(VISITORS_KEY);
  return storedVisitors ? JSON.parse(storedVisitors) : [];
}

export function blockVisitor(visitorId: string): void {
  const visitors = getVisitorsList();
  const updatedVisitors = visitors.map(visitor =>
    visitor.id === visitorId ? { ...visitor, isBlocked: true } : visitor
  );
  localStorage.setItem(VISITORS_KEY, JSON.stringify(updatedVisitors));
}

export function unblockVisitor(visitorId: string): void {
  const visitors = getVisitorsList();
  const updatedVisitors = visitors.map(visitor =>
    visitor.id === visitorId ? { ...visitor, isBlocked: false } : visitor
  );
  localStorage.setItem(VISITORS_KEY, JSON.stringify(updatedVisitors));
}
