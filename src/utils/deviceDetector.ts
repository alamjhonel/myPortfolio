
export interface DeviceInfo {
  operatingSystem: string;
  browser: string;
  browserVersion: string; // New field for browser version
  device: string;
  deviceType: string;
  model: string; // New field for specific device model
}

export function detectDevice(): DeviceInfo {
  const userAgent = navigator.userAgent;
  
  // Default values
  let operatingSystem = "Unknown";
  let browser = "Unknown";
  let browserVersion = ""; // New browser version field
  let device = "Desktop";
  let deviceType = "Laptop";
  let model = "Unknown"; // New model field
  
  // OS Detection
  if (/Windows/i.test(userAgent)) {
    operatingSystem = "Windows";
    // Get Windows version
    if (/Windows NT 10.0/i.test(userAgent)) operatingSystem = "Windows 10/11";
    else if (/Windows NT 6.3/i.test(userAgent)) operatingSystem = "Windows 8.1";
    else if (/Windows NT 6.2/i.test(userAgent)) operatingSystem = "Windows 8";
    else if (/Windows NT 6.1/i.test(userAgent)) operatingSystem = "Windows 7";
    else if (/Windows NT 6.0/i.test(userAgent)) operatingSystem = "Windows Vista";
    else if (/Windows NT 5.1/i.test(userAgent)) operatingSystem = "Windows XP";
  } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
    operatingSystem = "MacOS";
    // Get macOS version if possible
    const macOSVersionMatch = userAgent.match(/Mac OS X (\d+[._]\d+[._]\d+)/i);
    if (macOSVersionMatch) {
      const versionString = macOSVersionMatch[1].replace(/_/g, '.');
      operatingSystem = `MacOS ${versionString}`;
    }
  } else if (/Linux/i.test(userAgent)) {
    operatingSystem = "Linux";
    if (/Ubuntu/i.test(userAgent)) operatingSystem = "Ubuntu Linux";
    else if (/Fedora/i.test(userAgent)) operatingSystem = "Fedora Linux";
    else if (/Debian/i.test(userAgent)) operatingSystem = "Debian Linux";
  } else if (/Android/i.test(userAgent)) {
    operatingSystem = "Android";
    // Get Android version
    const androidVersionMatch = userAgent.match(/Android (\d+(\.\d+)+)/i);
    if (androidVersionMatch) {
      operatingSystem = `Android ${androidVersionMatch[1]}`;
    }
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    operatingSystem = "iOS";
    // Get iOS version
    const iosVersionMatch = userAgent.match(/OS (\d+[._]\d+[._]?\d*)/i);
    if (iosVersionMatch) {
      const versionString = iosVersionMatch[1].replace(/_/g, '.');
      operatingSystem = `iOS ${versionString}`;
    }
  }
  
  // Browser Detection with Version
  if (/Edge|Edg/i.test(userAgent)) {
    browser = "Edge";
    const edgeMatch = userAgent.match(/Edge?\/(\d+(\.\d+)+)/i);
    if (edgeMatch) browserVersion = edgeMatch[1];
  } else if (/Firefox/i.test(userAgent)) {
    browser = "Firefox";
    const firefoxMatch = userAgent.match(/Firefox\/(\d+(\.\d+)+)/i);
    if (firefoxMatch) browserVersion = firefoxMatch[1];
  } else if (/Chrome/i.test(userAgent)) {
    browser = "Chrome";
    const chromeMatch = userAgent.match(/Chrome\/(\d+(\.\d+)+)/i);
    if (chromeMatch) browserVersion = chromeMatch[1];
  } else if (/Safari/i.test(userAgent)) {
    browser = "Safari";
    const safariMatch = userAgent.match(/Version\/(\d+(\.\d+)+)/i);
    if (safariMatch) browserVersion = safariMatch[1];
  } else if (/Opera|OPR/i.test(userAgent)) {
    browser = "Opera";
    const operaMatch = userAgent.match(/(?:Opera|OPR)\/(\d+(\.\d+)+)/i);
    if (operaMatch) browserVersion = operaMatch[1];
  } else if (/MSIE|Trident/i.test(userAgent)) {
    browser = "Internet Explorer";
    const ieMatch = userAgent.match(/(?:MSIE |rv:)(\d+(\.\d+)+)/i);
    if (ieMatch) browserVersion = ieMatch[1];
  }
  
  // Device Type and Model Detection
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    device = "Mobile";
    
    if (/iPhone/i.test(userAgent)) {
      deviceType = "iPhone";
      // Detect iPhone model (limited accuracy)
      if (/iPhone1[0-5]/i.test(userAgent)) model = "iPhone X or newer";
      else if (/iPhone\s?[7-9]/i.test(userAgent)) model = "iPhone 7-9";
      else model = "iPhone (older model)";
    } else if (/Android/i.test(userAgent)) {
      deviceType = "Android Phone";
      
      // Try to detect Android phone manufacturer and model
      if (/Samsung/i.test(userAgent)) {
        model = "Samsung";
        if (/SM-G/i.test(userAgent)) model += " Galaxy";
        if (/SM-N/i.test(userAgent)) model += " Note";
        if (/SM-A/i.test(userAgent)) model += " A Series";
      } else if (/LG/i.test(userAgent)) {
        model = "LG";
      } else if (/Pixel/i.test(userAgent)) {
        model = "Google Pixel";
      } else if (/OnePlus/i.test(userAgent)) {
        model = "OnePlus";
      } else if (/Xiaomi/i.test(userAgent)) {
        model = "Xiaomi";
      } else if (/HUAWEI/i.test(userAgent)) {
        model = "Huawei";
      } else if (/OPPO/i.test(userAgent)) {
        model = "OPPO";
      } else if (/Motorola/i.test(userAgent)) {
        model = "Motorola";
      }
    }
  } else if (/iPad|Android(?!.*Mobile)/i.test(userAgent)) {
    device = "Tablet";
    
    if (/iPad/i.test(userAgent)) {
      deviceType = "iPad";
      // Try to identify iPad model
      if (/iPad Pro/i.test(userAgent)) {
        model = "iPad Pro";
      } else if (/iPad Air/i.test(userAgent)) {
        model = "iPad Air";
      } else if (/iPad Mini/i.test(userAgent)) {
        model = "iPad Mini";
      } else {
        model = "iPad";
      }
    } else if (/Android/i.test(userAgent)) {
      deviceType = "Android Tablet";
      // Try to detect Android tablet manufacturer
      if (/Samsung/i.test(userAgent)) {
        model = "Samsung Galaxy Tab";
      } else if (/Pixel/i.test(userAgent)) {
        model = "Google Pixel Tablet";
      } else if (/HUAWEI/i.test(userAgent)) {
        model = "Huawei Tablet";
      } else if (/Lenovo/i.test(userAgent)) {
        model = "Lenovo Tablet";
      } else if (/ASUS/i.test(userAgent)) {
        model = "ASUS Tablet";
      }
    }
  } else {
    // Desktop detection with more specificity
    if (/Windows/i.test(userAgent)) {
      deviceType = "Windows PC";
      // Try to detect if it's a Surface device
      if (/Surface/i.test(userAgent)) {
        model = "Microsoft Surface";
      } else {
        model = "Windows PC";
      }
    } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
      deviceType = "MacBook";
      
      // Detect Mac model type if possible
      if (/MacBook Pro/i.test(userAgent)) {
        model = "MacBook Pro";
      } else if (/MacBook Air/i.test(userAgent)) {
        model = "MacBook Air";
      } else if (/iMac/i.test(userAgent)) {
        model = "iMac";
        deviceType = "Desktop";
      } else if (/Mac mini/i.test(userAgent)) {
        model = "Mac Mini";
        deviceType = "Desktop";
      } else if (/Mac Pro/i.test(userAgent)) {
        model = "Mac Pro";
        deviceType = "Desktop";
      }
    } else if (/Linux/i.test(userAgent)) {
      deviceType = "Linux PC";
      
      // Try to detect Linux distribution
      if (/Ubuntu/i.test(userAgent)) {
        model = "Ubuntu PC";
      } else if (/Fedora/i.test(userAgent)) {
        model = "Fedora PC";
      } else if (/Debian/i.test(userAgent)) {
        model = "Debian PC";
      } else if (/CentOS/i.test(userAgent)) {
        model = "CentOS PC";
      }
    }
  }
  
  return { operatingSystem, browser, browserVersion, device, deviceType, model };
}
