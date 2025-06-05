
import { useEffect } from 'react';
import { getVisitorLocation, saveVisitor } from '@/utils/ipLocator';
import { detectDevice } from '@/utils/deviceDetector';

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if this visitor has already been tracked in this session
        const sessionKey = 'visitor_tracked_this_session';
        if (sessionStorage.getItem(sessionKey)) {
          return; // Already tracked this session
        }

        // Get visitor location
        const locationData = await getVisitorLocation();
        
        // Get device information
        const deviceInfo = detectDevice();
        
        // Create visitor data
        const visitorData = {
          id: `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ip: locationData.ip,
          city: locationData.city,
          country: locationData.country,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          timestamp: Date.now(),
          isBlocked: false,
          operatingSystem: deviceInfo.operatingSystem,
          browser: deviceInfo.browser,
          browserVersion: deviceInfo.browserVersion,
          device: deviceInfo.device,
          deviceType: deviceInfo.deviceType,
          model: deviceInfo.model
        };

        // Save visitor data
        saveVisitor(visitorData);
        
        // Mark as tracked for this session
        sessionStorage.setItem(sessionKey, 'true');
        
        console.log('Visitor tracked:', visitorData);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Track visitor on component mount
    trackVisitor();
  }, []);

  return null; // This component doesn't render anything
};

export default VisitorTracker;
