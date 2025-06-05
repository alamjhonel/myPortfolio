
import React from 'react';
import { getVisitorsList, blockVisitor, unblockVisitor, VisitorData } from '@/utils/ipLocator';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Ban, CheckCircle, Smartphone, Laptop, Monitor, Tablet, Computer, Search, ShieldAlert, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface AdminVisitorTableProps {
  visitors: VisitorData[];
  onVisitorsChange: () => void;
  isMobile: boolean;
}

const AdminVisitorTable: React.FC<AdminVisitorTableProps> = ({ 
  visitors, 
  onVisitorsChange, 
  isMobile 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { toast } = useToast();

  const handleBlockVisitor = (visitorId: string) => {
    blockVisitor(visitorId);
    onVisitorsChange();
    toast({
      title: "Visitor Blocked",
      description: "The visitor has been blocked successfully",
    });
  };
  
  const handleUnblockVisitor = (visitorId: string) => {
    unblockVisitor(visitorId);
    onVisitorsChange();
    toast({
      title: "Visitor Unblocked",
      description: "The visitor has been unblocked successfully",
    });
  };

  // Filter visitors based on search term
  const filteredVisitors = searchTerm
    ? visitors.filter(v => 
        v.ip?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.operatingSystem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.browser?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model?.toLowerCase().includes(searchTerm.toLowerCase()) || // Added model to search
        v.deviceType?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : visitors;
  
  // Sort visitors with most recent first
  const sortedVisitors = [...filteredVisitors].sort((a, b) => b.timestamp - a.timestamp);
  
  // Get appropriate icon based on device type
  const getDeviceIcon = (deviceType: string | undefined) => {
    if (!deviceType) return <Laptop className="h-3 w-3 mr-1" />;
    
    if (deviceType.toLowerCase().includes('phone') || deviceType.toLowerCase().includes('iphone')) {
      return <Smartphone className="h-3 w-3 mr-1" />;
    } else if (deviceType.toLowerCase().includes('tablet') || deviceType.toLowerCase().includes('ipad')) {
      return <Tablet className="h-3 w-3 mr-1" />;
    } else if (deviceType.toLowerCase().includes('desktop')) {
      return <Computer className="h-3 w-3 mr-1" />;
    } else if (deviceType.toLowerCase().includes('pc')) {
      return <Monitor className="h-3 w-3 mr-1" />;
    } else {
      return <Laptop className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <Card className="border-cyber-light bg-cyber-dark dashboard-card hover:shadow-[0_0_15px_rgba(100,255,218,0.1)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center">
            <ShieldAlert className="mr-2 h-5 w-5 text-cyber-highlight dashboard-icon" />
            Recent Visitors
          </CardTitle>
          <CardDescription>Manage and monitor site visitors</CardDescription>
        </div>
        <div className="flex items-center space-x-2 relative">
          <Search className="h-4 w-4 absolute left-3 text-cyber-text" />
          <Input
            placeholder="Search visitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 max-w-[200px] bg-cyber-light/10 border-cyber-light/30"
          />
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="rounded-md border border-cyber-light/30">
          <div className="grid grid-cols-1 md:grid-cols-7 bg-cyber-light/10 p-3 font-medium">
            <div>IP</div>
            <div>Location</div>
            <div className="hidden md:block">Coordinates</div>
            <div className="hidden md:block">Time</div>
            <div className="hidden md:block">System</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-cyber-light/30 max-h-[400px] overflow-y-auto">
            {sortedVisitors.length > 0 ? (
              sortedVisitors.map((visitor) => (
                <div 
                  key={visitor.id} 
                  className="grid grid-cols-1 md:grid-cols-7 p-3 hover:bg-cyber-light/5 transition-all duration-200"
                >
                  <div className="truncate">{visitor.ip}</div>
                  <div className="truncate">{visitor.city}, {visitor.country}</div>
                  <div className="hidden md:block truncate">{visitor.latitude.toFixed(2)}, {visitor.longitude.toFixed(2)}</div>
                  <div className="hidden md:block">{new Date(visitor.timestamp).toLocaleString()}</div>
                  <div className="hidden md:block">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-help">
                            {getDeviceIcon(visitor.deviceType)}
                            <span className="text-xs">
                              {visitor.model || visitor.deviceType || visitor.device || "Unknown"}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs bg-cyber-dark border-cyber-light/30">
                          <div className="text-xs space-y-1">
                            <div><strong>OS:</strong> {visitor.operatingSystem || "Unknown"}</div>
                            <div><strong>Browser:</strong> {visitor.browser}{visitor.browserVersion ? ` v${visitor.browserVersion}` : ""}</div>
                            <div><strong>Device:</strong> {visitor.model || visitor.deviceType || "Unknown"}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div>
                    {visitor.isBlocked ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive stats-badge">
                        <Ban className="h-3 w-3 mr-1 dashboard-icon" />
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyber-highlight/20 text-cyber-highlight stats-badge">
                        <Shield className="h-3 w-3 mr-1 dashboard-icon" />
                        Allowed
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    {visitor.isBlocked ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleUnblockVisitor(visitor.id)}
                        className="border-cyber-highlight text-cyber-highlight hover:bg-cyber-highlight/20 transition-all duration-300 hover:scale-105"
                      >
                        <CheckCircle className="h-3 w-3 mr-1 dashboard-icon" />
                        Unblock
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleBlockVisitor(visitor.id)}
                        className="border-destructive text-destructive hover:bg-destructive/20 transition-all duration-300 hover:scale-105"
                      >
                        <Ban className="h-3 w-3 mr-1 dashboard-icon" />
                        Block
                      </Button>
                    )}
                  </div>
                  
                  {isMobile && (
                    <div className="col-span-1 mt-2 md:hidden text-xs text-cyber-text">
                      <div>Coordinates: {visitor.latitude.toFixed(2)}, {visitor.longitude.toFixed(2)}</div>
                      <div>Time: {new Date(visitor.timestamp).toLocaleString()}</div>
                      <div className="flex items-center mt-1">
                        <strong>Device:</strong> 
                        {getDeviceIcon(visitor.deviceType)}
                        {visitor.model || visitor.deviceType || visitor.device || "Unknown"}
                      </div>
                      <div><strong>OS:</strong> {visitor.operatingSystem || "Unknown"}</div>
                      <div><strong>Browser:</strong> {visitor.browser}{visitor.browserVersion ? ` v${visitor.browserVersion}` : ""}</div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-cyber-text">No visitors found</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminVisitorTable;
