
import React from 'react';
import VisitorMap from '@/components/VisitorMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitorData } from '@/utils/ipLocator';
import { Globe } from 'lucide-react';

interface AdminVisitorMapProps {
  visitors: VisitorData[];
}

const AdminVisitorMap: React.FC<AdminVisitorMapProps> = ({ visitors }) => {
  return (
    <Card className="border-cyber-light bg-cyber-dark dashboard-card hover:shadow-[0_0_15px_rgba(100,255,218,0.1)] transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-cyber-highlight dashboard-icon animate-pulse" />
          Visitor Map
        </CardTitle>
        <CardDescription>Geographic distribution of site visitors</CardDescription>
      </CardHeader>
      <CardContent>
        <VisitorMap 
          visitors={visitors} 
          height={window.innerWidth < 640 ? "300px" : "500px"}
        />
      </CardContent>
    </Card>
  );
};

export default AdminVisitorMap;
