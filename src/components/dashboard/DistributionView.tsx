
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, FileText, Phone, StickyNote } from 'lucide-react';

interface TaskItem {
  id: string;
  firstName: string;
  phone: string;
  notes: string;
}

interface AgentDistribution {
  agentId: string;
  agentName: string;
  tasks: TaskItem[];
}

const DistributionView: React.FC = () => {
  const [distributions] = useState<AgentDistribution[]>([
    {
      agentId: '1',
      agentName: 'John Doe',
      tasks: [
        { id: '1', firstName: 'Alice Johnson', phone: '+1234567890', notes: 'Interested in premium package' },
        { id: '2', firstName: 'Bob Smith', phone: '+1234567891', notes: 'Follow up next week' },
        { id: '3', firstName: 'Carol White', phone: '+1234567892', notes: 'Needs pricing information' },
        { id: '4', firstName: 'David Brown', phone: '+1234567893', notes: 'Ready to purchase' },
        { id: '5', firstName: 'Eva Green', phone: '+1234567894', notes: 'Compare with competitors' },
      ]
    },
    {
      agentId: '2',
      agentName: 'Jane Smith',
      tasks: [
        { id: '6', firstName: 'Frank Wilson', phone: '+1234567895', notes: 'Technical questions' },
        { id: '7', firstName: 'Grace Davis', phone: '+1234567896', notes: 'Budget constraints' },
        { id: '8', firstName: 'Henry Miller', phone: '+1234567897', notes: 'Decision maker unavailable' },
        { id: '9', firstName: 'Ivy Taylor', phone: '+1234567898', notes: 'Demonstration required' },
        { id: '10', firstName: 'Jack Anderson', phone: '+1234567899', notes: 'Call back in afternoon' },
      ]
    },
    {
      agentId: '3',
      agentName: 'Mike Johnson',
      tasks: [
        { id: '11', firstName: 'Kelly Thomas', phone: '+1234567800', notes: 'Warm lead from referral' },
        { id: '12', firstName: 'Liam Jackson', phone: '+1234567801', notes: 'Price negotiation needed' },
        { id: '13', firstName: 'Mia Harris', phone: '+1234567802', notes: 'Send proposal' },
        { id: '14', firstName: 'Noah Clark', phone: '+1234567803', notes: 'Contract review' },
        { id: '15', firstName: 'Olivia Lewis', phone: '+1234567804', notes: 'Follow up after meeting' },
      ]
    },
    {
      agentId: '4',
      agentName: 'Sarah Wilson',
      tasks: [
        { id: '16', firstName: 'Paul Walker', phone: '+1234567805', notes: 'Integration questions' },
        { id: '17', firstName: 'Quinn Young', phone: '+1234567806', notes: 'Training requirements' },
        { id: '18', firstName: 'Ryan King', phone: '+1234567807', notes: 'Volume discount inquiry' },
        { id: '19', firstName: 'Sophia Scott', phone: '+1234567808', notes: 'Timeline discussion' },
        { id: '20', firstName: 'Tyler Adams', phone: '+1234567809', notes: 'Final approval pending' },
      ]
    },
    {
      agentId: '5',
      agentName: 'David Brown',
      tasks: [
        { id: '21', firstName: 'Uma Baker', phone: '+1234567810', notes: 'Feature comparison' },
        { id: '22', firstName: 'Victor Hall', phone: '+1234567811', notes: 'Support level questions' },
        { id: '23', firstName: 'Wendy Campbell', phone: '+1234567812', notes: 'Implementation timeline' },
        { id: '24', firstName: 'Xavier Rivera', phone: '+1234567813', notes: 'ROI calculation' },
        { id: '25', firstName: 'Yolanda Cooper', phone: '+1234567814', notes: 'Legal review required' },
      ]
    }
  ]);

  const totalTasks = distributions.reduce((sum, dist) => sum + dist.tasks.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Task Distribution</h2>
          <p className="text-white/70">View how tasks are distributed among agents</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{totalTasks}</div>
          <div className="text-white/70 text-sm">Total Tasks</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {distributions.map((distribution) => (
          <Card key={distribution.agentId} className="bg-white/10 backdrop-blur-md border-white/20 animate-fade-in hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{distribution.agentName}</CardTitle>
                    <CardDescription className="text-white/60">Agent</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {distribution.tasks.length} tasks
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {distribution.tasks.map((task, index) => (
                <div key={task.id} className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">{task.firstName}</h4>
                    <span className="text-white/60 text-xs">#{index + 1}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-white/80">
                    <Phone size={14} />
                    <span className="text-sm">{task.phone}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-white/80">
                    <StickyNote size={14} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{task.notes}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Distribution Summary</CardTitle>
          <CardDescription className="text-white/70">
            Overview of task distribution across all agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {distributions.map((distribution) => (
              <div key={distribution.agentId} className="text-center space-y-2">
                <div className="text-2xl font-bold text-white">{distribution.tasks.length}</div>
                <div className="text-white/70 text-sm">{distribution.agentName}</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(distribution.tasks.length / Math.max(...distributions.map(d => d.tasks.length))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributionView;
