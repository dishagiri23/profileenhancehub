
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Lock, Eye, Settings, Bell, Mail, LogOut, Linkedin, Github, Twitter } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [tab, setTab] = useState("basic");
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      toast({
        title: "Login required",
        description: "Please log in to access your profile",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Parse and set user data
    const parsedData = JSON.parse(storedUserData);
    setUserData(parsedData);
    
    // Initialize form with user data
    setFullName(parsedData.name || "");
    setUsername(parsedData.username || "");
    setAvatarSrc(parsedData.imageUrl || "");
    setTwoFactorEnabled(parsedData.twoFactorEnabled || false);
    setPublicProfile(parsedData.publicProfile !== false);
    setShowActivity(parsedData.showActivity !== false);
    setEmailNotifications(parsedData.emailNotifications !== false);
  }, [navigate, toast]);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll create a local URL for the image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveBasicInfo = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update local storage
      const updatedUserData = {
        ...userData,
        name: fullName,
        username: username,
        imageUrl: avatarSrc
      };
      
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleChangePassword = () => {
    if (!newPassword || newPassword.length < 8) {
      toast({
        title: "Invalid password",
        description: "Your password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleToggleTwoFactor = () => {
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);
    
    // Update local storage
    const updatedUserData = {
      ...userData,
      twoFactorEnabled: newValue
    };
    
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    
    toast({
      title: `Two-factor authentication ${newValue ? 'enabled' : 'disabled'}`,
      description: `You have ${newValue ? 'enabled' : 'disabled'} two-factor authentication for your account.`,
    });
  };
  
  const handleTogglePrivacySetting = (setting: string, value: boolean) => {
    if (setting === 'publicProfile') {
      setPublicProfile(value);
    } else if (setting === 'showActivity') {
      setShowActivity(value);
    } else if (setting === 'emailNotifications') {
      setEmailNotifications(value);
    }
    
    // Update local storage
    const updatedUserData = {
      ...userData,
      [setting]: value
    };
    
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    
    toast({
      title: "Settings updated",
      description: "Your privacy settings have been updated successfully.",
    });
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would have a confirmation dialog
    toast({
      title: "Account deletion requested",
      description: "We've sent an email confirmation for account deletion.",
      variant: "destructive",
    });
  };
  
  const handleLogout = () => {
    localStorage.removeItem("userData");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    navigate("/");
  };
  
  // Don't render anything if user data isn't loaded yet
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">My Profile</h1>
        
        <Tabs defaultValue="basic" value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-black/20 p-1 rounded-lg">
            <TabsTrigger value="basic" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Settings className="h-4 w-4" />
              <span>Basic Information</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Shield className="h-4 w-4" />
              <span>Account Settings</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Eye className="h-4 w-4" />
              <span>Security & Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="mt-0">
            <Card className="bg-black/30 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription className="text-white/70">Update your profile details and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                  <Avatar className="h-24 w-24 border-2 border-primary/30">
                    <AvatarImage src={avatarSrc} alt={fullName} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xl font-medium">
                      {fullName ? fullName.substring(0, 2).toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="avatar" className="text-sm font-medium">Profile Picture</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="avatar" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange}
                        className="bg-white/5 border-white/10 text-white/90"
                      />
                    </div>
                    <p className="text-xs text-white/50">Upload a square image, at least 400x400px</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name" 
                        className="bg-white/5 border-white/10 text-white/90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input 
                        id="email" 
                        value={userData.email} 
                        disabled
                        className="bg-white/5 border-white/10 text-white/50 cursor-not-allowed"
                      />
                      <p className="text-xs text-white/50">Email cannot be changed for security reasons</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Username (Optional)</Label>
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a display name" 
                      className="bg-white/5 border-white/10 text-white/90"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Connected Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                      <div className="flex items-center space-x-3">
                        <Linkedin className="h-5 w-5 text-primary" />
                        <span className="text-sm">LinkedIn</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                      <div className="flex items-center space-x-3">
                        <Github className="h-5 w-5 text-white/80" />
                        <span className="text-sm">GitHub</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-white/80" />
                        <span className="text-sm">Twitter</span>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-white/10 pt-6">
                <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveBasicInfo} 
                  className="bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <div className="space-y-6">
              <Card className="bg-black/30 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription className="text-white/70">Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="bg-white/5 border-white/10 text-white/90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="bg-white/5 border-white/10 text-white/90"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleChangePassword}
                    className="bg-primary hover:bg-primary/90 ml-auto"
                    disabled={isLoading || !newPassword || !confirmPassword}
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/30 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription className="text-white/70">Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                      <p className="text-xs text-white/50">Receive a one-time code via email when signing in</p>
                    </div>
                    <Switch 
                      checked={twoFactorEnabled} 
                      onCheckedChange={handleToggleTwoFactor}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="text-red-500">Danger Zone</CardTitle>
                  <CardDescription className="text-white/70">Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-red-700/30 rounded-md bg-red-950/20">
                    <h4 className="text-sm font-medium text-red-400 mb-2">Delete Account</h4>
                    <p className="text-xs text-white/50 mb-4">This will permanently delete your account and all data associated with it.</p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="bg-red-900/50 hover:bg-red-900/70 text-white"
                    >
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <div className="space-y-6">
              <Card className="bg-black/30 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription className="text-white/70">Control what information is visible to others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Public Profile</h4>
                      <p className="text-xs text-white/50">Allow others to see your public profile information</p>
                    </div>
                    <Switch 
                      checked={publicProfile} 
                      onCheckedChange={(value) => handleTogglePrivacySetting('publicProfile', value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Activity Visibility</h4>
                      <p className="text-xs text-white/50">Show your recent activity on your profile</p>
                    </div>
                    <Switch 
                      checked={showActivity} 
                      onCheckedChange={(value) => handleTogglePrivacySetting('showActivity', value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <p className="text-xs text-white/50">Receive emails about your account activity</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={(value) => handleTogglePrivacySetting('emailNotifications', value)} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription className="text-white/70">Manage your active sessions and devices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Current Session</h4>
                        <p className="text-xs text-white/50">Chrome on Windows • {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-xs font-medium text-primary">Current</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Previous Session</h4>
                        <p className="text-xs text-white/50">Safari on iPhone • 2 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20">
                        Logout
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-center bg-white/5 border-white/10 hover:bg-white/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout from all devices</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
