
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-300 text-lg">Manage agents and distribute tasks efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="bg-gray-800/90 backdrop-blur-md border-gray-600 hover:bg-gray-700/90 transition-all duration-200 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5</div>
              <p className="text-xs text-gray-300">Active agents available</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur-md border-gray-600 hover:bg-gray-700/90 transition-all duration-200 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Files Uploaded</CardTitle>
              <Upload className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-300">CSV files processed</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/90 backdrop-blur-md border-gray-600 hover:bg-gray-700/90 transition-all duration-200 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Tasks Distributed</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">240</div>
              <p className="text-xs text-gray-300">Items assigned to agents</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/90 backdrop-blur-md border-gray-600 animate-fade-in">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-700/80 border-gray-600">
                <TabsTrigger 
                  value="agents" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 hover:text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Agents
                </TabsTrigger>
                <TabsTrigger 
                  value="upload" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </TabsTrigger>
                <TabsTrigger 
                  value="distribution" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 hover:text-white"
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
