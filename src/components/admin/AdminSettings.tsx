
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, User } from 'lucide-react';
import { updateAdminCredentials } from '@/utils/auth';
import { useToast } from "@/hooks/use-toast";

const AdminSettings: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { toast } = useToast();
  
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername && newPassword) {
      updateAdminCredentials(newUsername, newPassword);
      toast({
        title: "Credentials Updated",
        description: "Your admin credentials have been updated successfully",
      });
      setNewUsername('');
      setNewPassword('');
    } else {
      toast({
        title: "Error",
        description: "Both username and password are required",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-cyber-light bg-cyber-dark">
      <CardHeader>
        <CardTitle>Admin Credentials</CardTitle>
        <CardDescription>Update your admin username and password</CardDescription>
      </CardHeader>
      <form onSubmit={handleUpdateCredentials}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-username">New Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-cyber-text" />
              <Input
                id="new-username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                className="pl-10 bg-cyber-light/10 border-cyber-light/30"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-cyber-text" />
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="pl-10 bg-cyber-light/10 border-cyber-light/30"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="bg-cyber-highlight text-cyber-dark hover:bg-opacity-80"
          >
            Update Credentials
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdminSettings;
