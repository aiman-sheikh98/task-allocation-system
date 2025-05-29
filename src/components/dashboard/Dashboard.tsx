
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Upload, FileText } from 'lucide-react';
import AgentManagement from './AgentManagement';
import FileUpload from './FileUpload';
import DistributionView from './DistributionView';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-white/70 text-lg">Manage agents and distribute tasks efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-200 hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5</div>
              <p className="text-xs text-white/60">Active agents available</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-200 hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Files Uploaded</CardTitle>
              <Upload className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-white/60">CSV files processed</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-200 hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Tasks Distributed</CardTitle>
              <FileText className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">240</div>
              <p className="text-xs text-white/60">Items assigned to agents</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
                <TabsTrigger 
                  value="agents" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Agents
                </TabsTrigger>
                <TabsTrigger 
                  value="upload" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </TabsTrigger>
                <TabsTrigger 
                  value="distribution" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Distribution
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agents" className="mt-6">
                <AgentManagement />
              </TabsContent>

              <TabsContent value="upload" className="mt-6">
                <FileUpload />
              </TabsContent>

              <TabsContent value="distribution" className="mt-6">
                <DistributionView />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
