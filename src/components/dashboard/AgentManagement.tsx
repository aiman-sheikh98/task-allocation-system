
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, User, Mail, Phone, X, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';

interface Agent {
  id: string;
  name: string;
  email: string;
  mobile: string;
  countryCode: string;
}

const AgentManagement: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', mobile: '1234567890', countryCode: '+1' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', mobile: '2345678901', countryCode: '+1' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', mobile: '3456789012', countryCode: '+44' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', mobile: '4567890123', countryCode: '+91' },
    { id: '5', name: 'David Brown', email: 'david@example.com', mobile: '5678901234', countryCode: '+61' },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    countryCode: '+1',
    password: ''
  });

  const { addNotification } = useNotifications();

  // Filter agents based on search query
  const filteredAgents = useMemo(() => {
    if (!searchQuery.trim()) return agents;
    
    return agents.filter(agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.mobile.includes(searchQuery)
    );
  }, [agents, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate email
    if (agents.some(agent => agent.email === formData.email)) {
      toast({
        title: "Validation Error",
        description: "An agent with this email already exists",
        variant: "destructive"
      });
      return;
    }

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      countryCode: formData.countryCode
    };

    setAgents(prevAgents => [...prevAgents, newAgent]);
    setFormData({ name: '', email: '', mobile: '', countryCode: '+1', password: '' });
    setIsDialogOpen(false);
    
    console.log('New agent added:', newAgent);
    console.log('Total agents now:', agents.length + 1);
    
    // Add real-time notification
    addNotification({
      title: "New Agent Added",
      message: `${formData.name} has been successfully added to your team`,
      type: "success"
    });
    
    toast({
      title: "Agent Added",
      description: "New agent has been successfully added",
    });
  };

  const handleRemoveAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    setAgents(prevAgents => prevAgents.filter(agent => agent.id !== id));
    
    console.log('Agent removed:', agent);
    console.log('Remaining agents:', agents.length - 1);
    
    if (agent) {
      addNotification({
        title: "Agent Removed",
        message: `${agent.name} has been removed from your team`,
        type: "info"
      });
    }
    
    toast({
      title: "Agent Removed",
      description: "Agent has been successfully removed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Agent Management</h2>
          <p className="text-gray-300">Add and manage your agents</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </DialogTrigger>
          
          <DialogContent className="bg-gray-800 border-gray-600 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Agent</DialogTitle>
              <DialogDescription className="text-gray-300">
                Enter the agent details below to add them to your team.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="countryCode" className="text-white">Country Code</Label>
                  <Input
                    id="countryCode"
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                    placeholder="+1"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="mobile" className="text-white">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="Enter mobile number"
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Add Agent
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search agents by name, email, or mobile..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Results count */}
      <div className="text-gray-300 text-sm">
        Showing {filteredAgents.length} of {agents.length} agents
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="bg-gray-800/80 backdrop-blur-md border-gray-600 hover:bg-gray-700/80 transition-all duration-200 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                    <CardDescription className="text-gray-300">Agent</CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveAgent(agent.id)}
                  className="bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-600/30"
                >
                  <X size={14} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span className="text-sm">{agent.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span className="text-sm">{agent.countryCode} {agent.mobile}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && searchQuery && (
        <div className="text-center py-8">
          <p className="text-gray-300">No agents found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;
