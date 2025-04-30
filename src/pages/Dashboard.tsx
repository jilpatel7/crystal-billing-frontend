import React from 'react';
import { 
  Users, 
  CreditCard, 
  ShoppingBag, 
  TrendingUp,
  Clipboard,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { ActivityItem } from '../components/dashboard/ActivityItem';
import { ProgressBar } from '../components/dashboard/ProgressBar';
import { ChartPlaceholder } from '../components/dashboard/ChartPlaceholder';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your business at a glance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="2,543"
          icon={<Users size={20} />}
          change={{ value: '12%', isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value="$45,231"
          icon={<CreditCard size={20} />}
          change={{ value: '8%', isPositive: true }}
        />
        <StatCard
          title="Orders"
          value="684"
          icon={<ShoppingBag size={20} />}
          change={{ value: '2%', isPositive: false }}
        />
        <StatCard
          title="Growth"
          value="24.5%"
          icon={<TrendingUp size={20} />}
          change={{ value: '5%', isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader 
              title="Revenue Overview" 
              subtitle="Monthly revenue for the current year"
            />
            <CardBody>
              <ChartPlaceholder type="line" height={250} />
            </CardBody>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Sales by Category" />
              <CardBody>
                <ChartPlaceholder type="pie" height={200} />
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader title="Project Status" />
              <CardBody className="space-y-4">
                <div>
                  <ProgressBar 
                    label="Website Redesign" 
                    value={75} 
                    showValue={true}
                    barColor="bg-blue-500"
                  />
                </div>
                <div>
                  <ProgressBar 
                    label="Mobile App" 
                    value={45} 
                    showValue={true}
                    barColor="bg-green-500"
                  />
                </div>
                <div>
                  <ProgressBar 
                    label="CRM Integration" 
                    value={90} 
                    showValue={true}
                    barColor="bg-purple-500"
                  />
                </div>
                <div>
                  <ProgressBar 
                    label="Marketing Campaign" 
                    value={30} 
                    showValue={true}
                    barColor="bg-yellow-500"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader title="Recent Activity" />
            <CardBody className="divide-y divide-gray-200">
              <ActivityItem 
                avatar=""
                name="John Doe"
                action="added a new product"
                time="2 hours ago"
                icon={<ShoppingBag size={16} />}
                iconBg="bg-blue-100"
              />
              <ActivityItem 
                avatar=""
                name="Sarah Smith"
                action="completed her profile"
                time="5 hours ago"
                icon={<CheckCircle size={16} />}
                iconBg="bg-green-100"
              />
              <ActivityItem 
                avatar=""
                name="Admin"
                action="updated system settings"
                time="1 day ago"
                icon={<FileText size={16} />}
                iconBg="bg-purple-100"
              />
              <ActivityItem 
                avatar=""
                name="Robert Johnson"
                action="reported an issue"
                time="2 days ago"
                icon={<AlertCircle size={16} />}
                iconBg="bg-red-100"
              />
              <ActivityItem 
                avatar=""
                name="Emma Wilson"
                action="created a new task"
                time="3 days ago"
                icon={<Clipboard size={16} />}
                iconBg="bg-yellow-100"
              />
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader title="Top Performers" />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-800">John Doe</span>
                </div>
                <span className="text-sm text-gray-500">$12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <span className="text-sm font-medium">AW</span>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-800">Alice Williams</span>
                </div>
                <span className="text-sm text-gray-500">$9,870</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <span className="text-sm font-medium">MS</span>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-800">Mike Smith</span>
                </div>
                <span className="text-sm text-gray-500">$8,345</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;