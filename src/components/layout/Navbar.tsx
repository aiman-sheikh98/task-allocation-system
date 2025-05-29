
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogOut, User, Bell, Search, HelpCircle, Settings } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import BackButton from '@/components/ui/back-button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications, markAsRead, clearAll } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically trigger a search in the dashboard
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <BackButton />
          <h1 className="text-2xl font-bold text-white">Agent Manager</h1>
          
          {user && (
            <form onSubmit={handleSearch} className="relative ml-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-64"
              />
            </form>
          )}
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 relative"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-gray-900 border-gray-700 text-white">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    {notifications.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAll} className="text-white/60">
                        Clear all
                      </Button>
                    )}
                  </div>
                  
                  {notifications.length === 0 ? (
                    <p className="text-white/60 text-sm">No notifications</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 rounded border cursor-pointer ${
                            notification.read 
                              ? 'border-gray-700 bg-gray-800/50' 
                              : 'border-blue-500/50 bg-blue-500/10'
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-white/60">{notification.message}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-xs text-white/40 mt-1">{notification.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Help Support */}
            <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <HelpCircle size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>Help & Support</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Get help with using the Agent Manager
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Help</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Add agents using the "Add Agent" button</li>
                      <li>• Upload CSV files to distribute tasks</li>
                      <li>• View task distribution in the Distribution tab</li>
                      <li>• Search agents using the search bar</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Contact Support</h4>
                    <p className="text-sm text-gray-300">Email: support@agentmanager.com</p>
                    <p className="text-sm text-gray-300">Phone: +1 (555) 123-4567</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Profile */}
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <User size={16} className="mr-2" />
                  {user.name}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>Profile Settings</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Manage your account settings
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Settings size={16} className="mr-2" />
                      Account Settings
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Bell size={16} className="mr-2" />
                      Notification Preferences
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
