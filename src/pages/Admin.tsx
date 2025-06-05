
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import AdminLogin from '@/components/AdminLogin';
import MatrixBackground from '@/utils/matrixBackground';
import BackButton from '@/components/BackButton';
import { isLoggedIn } from '@/utils/auth';
import { getVisitorsList, VisitorData } from '@/utils/ipLocator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Key, Shield, Activity, BarChart3, UserCheck, AlertTriangle, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminVisitorMap from '@/components/admin/AdminVisitorMap';
import AdminVisitorTable from '@/components/admin/AdminVisitorTable';
import AdminSettings from '@/components/admin/AdminSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Admin: React.FC = () => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    blockedVisitors: 0,
    uniqueCountries: 0,
    lastVisit: ''
  });
  const [animationState, setAnimationState] = useState('default');
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Load visitor data on component mount and set up real-time updates
  useEffect(() => {
    if (loggedIn) {
      loadVisitorData();
      
      // Set up real-time polling every 5 seconds
      const interval = setInterval(() => {
        loadVisitorData();
      }, 5000);
      
      return () => clearInterval(interval);
    }

    // Change matrix animation every 15 seconds
    const animationInterval = setInterval(() => {
      setAnimationState(prev => {
        const states = ['default', 'color-shift', 'pulse-effect', 'glitch-effect'];
        const currentIndex = states.indexOf(prev);
        return states[(currentIndex + 1) % states.length];
      });
    }, 15000);

    return () => clearInterval(animationInterval);
  }, [loggedIn]);
  
  const loadVisitorData = () => {
    // Get real visitor data directly from storage
    const allVisitors = getVisitorsList();
    setVisitors(allVisitors);
    
    // Calculate dashboard stats
    const blocked = allVisitors.filter(v => v.isBlocked).length;
    const countries = new Set(allVisitors.map(v => v.country)).size;
    const lastVisitDate = allVisitors.length > 0 
      ? new Date(Math.max(...allVisitors.map(v => v.timestamp))).toLocaleString()
      : 'No visitors yet';
      
    setStats({
      totalVisitors: allVisitors.length,
      blockedVisitors: blocked,
      uniqueCountries: countries,
      lastVisit: lastVisitDate
    });
  };
  
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <MatrixBackground animationState="color-shift" />
        <div className="scanline"></div>
        <NavigationBar />
        <AdminLogin />
      </div>
    );
  }

  // Dashboard stat cards
  const StatCard = ({ title, value, icon, color }: 
    { title: string, value: string | number, icon: React.ReactNode, color: string }) => (
    <Card className={`dashboard-card border-${color}/30 bg-cyber-dark hover:bg-cyber-light/10 transition-all duration-300`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-cyber-text">{title}</CardTitle>
        <div className={`p-2 bg-${color}/10 rounded-full dashboard-icon text-${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cyber-highlight">{value}</div>
        <p className="text-xs text-cyber-text mt-1 opacity-70">Live data</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <MatrixBackground animationState={animationState as any} />
      <div className="scanline"></div>
      <NavigationBar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
              <BackButton to="/" />
              <h1 className="text-2xl sm:text-3xl font-bold text-cyber-highlight flex items-center ml-4">
                
                Security Dashboard
              </h1>
            </div>
            <Button 
              onClick={loadVisitorData} 
              className="bg-cyber-highlight text-cyber-dark hover:bg-cyber-highlight/80 w-full sm:w-auto"
            >
              <Activity className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Total Visitors" 
              value={stats.totalVisitors}
              icon={<UserCheck className="h-4 w-4" />} 
              color="cyber-highlight" 
            />
            <StatCard 
              title="Blocked Threats" 
              value={stats.blockedVisitors} 
              icon={<AlertTriangle className="h-4 w-4" />}
              color="destructive" 
            />
            <StatCard 
              title="Countries" 
              value={stats.uniqueCountries} 
              icon={<Globe className="h-4 w-4" />}
              color="blue" 
            />
            <StatCard 
              title="Last Visit" 
              value={stats.lastVisit} 
              icon={<BarChart3 className="h-4 w-4" />}
              color="purple" 
            />
          </div>
          
          <Tabs defaultValue="visitors" className="w-full animate-fade-in">
            <TabsList className="grid w-full grid-cols-2 mb-8 max-w-md mx-auto">
              <TabsTrigger value="visitors" className="data-[state=active]:bg-cyber-light data-[state=active]:text-cyber-highlight transition-colors duration-300">
                <Globe className="h-4 w-4 mr-2 dashboard-icon" />
                <span className="hidden sm:inline">Visitor Tracking</span>
                <span className="inline sm:hidden">Visitors</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-cyber-light data-[state=active]:text-cyber-highlight transition-colors duration-300">
                <Settings className="h-4 w-4 mr-2 dashboard-icon" />
                <span className="hidden sm:inline">Security Settings</span>
                <span className="inline sm:hidden">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="visitors" className="space-y-6 transition-all duration-500">
              <AdminVisitorMap visitors={visitors} />
              <AdminVisitorTable 
                visitors={visitors} 
                onVisitorsChange={loadVisitorData} 
                isMobile={isMobile} 
              />
            </TabsContent>
            
            <TabsContent value="settings" className="transition-all duration-500">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
