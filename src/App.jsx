import { PrimeReactProvider } from 'primereact/api';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import './App.css'; // Icons

function App() {
  const toast = useRef(null);

  const handleSubscribe = () => {
    if (toast.current) {
      toast.current.show({
        severity: 'success',
        summary: 'Successfully Subscribed!',
        detail: 'You will now receive earthquake alerts via email.',
        life: 15000
      });
    }
  };

  const handleUnsubscribe = () => {
    if (toast.current) {
      toast.current.show({
        severity: 'info',
        summary: 'Unsubscribed',
        detail: 'You have been unsubscribed from earthquake alerts.',
        life: 5000
      });
    }
  };

  const recentAlerts = [
    {
      magnitude: 5.2,
      location: 'Nha Trang',
      time: '2 hours ago',
      severity: 'moderate'
    },
    {
      magnitude: 6.8,
      location: 'Nha Trang',
      time: '5 hours ago',
      severity: 'high'
    },
    {
      magnitude: 4.1,
      location: 'Nha Trang',
      time: '1 day ago',
      severity: 'low'
    },
    {
      magnitude: 5.9,
      location: 'Nha Trang',
      time: '2 days ago',
      severity: 'moderate'
    }
  ];

  const getSeverityConfig = (severity) => {
    const configs = {
      high: { 
        severity: 'danger', 
        icon: 'pi-exclamation-triangle', 
        color: 'bg-red-500/20 text-red-400 border-red-500/30',
        textColor: 'text-red-400'
      },
      moderate: { 
        severity: 'warning', 
        icon: 'pi-exclamation-circle', 
        color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        textColor: 'text-amber-400'
      },
      low: { 
        severity: 'info', 
        icon: 'pi-info-circle', 
        color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        textColor: 'text-blue-400'
      }
    };
    return configs[severity] || { 
      severity: 'secondary', 
      icon: 'pi-circle', 
      color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      textColor: 'text-gray-400'
    };
  };

  return (
    <PrimeReactProvider>
      <Toast ref={toast} position="top-right" />
      <div className="min-h-screen w-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800">
        <Card className="h-screen w-full bg-slate-900/95 backdrop-blur-xl border-0 text-white shadow-none rounded-none overflow-hidden">
          {/* Header Section with enhanced design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-t-2xl"></div>
            <div className="relative flex items-center gap-4 p-6 pb-4">
              <Avatar 
                icon="pi pi-bell" 
                className="bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg"
                size="large"
                shape="circle"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Earthquake Alerts
                  </h1>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Subscribe to receive real-time earthquake notifications
                </p>
              </div>
            </div>
          </div>

          <Divider className="my-2 opacity-30" />

          {/* Enhanced Subscription Form */}
          <div className="px-6 pb-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
              <div className="flex items-center gap-2 mb-3">
                <i className="pi pi-envelope text-violet-400"></i>
                <label htmlFor="email" className="text-sm font-semibold text-slate-200">
                  Email Notifications
                </label>
              </div>
              
              <div className="mb-4">
                <InputText 
                  id="email" 
                  placeholder="Enter your email address"
                  className="w-full bg-slate-900/80 border border-slate-600/50 text-white placeholder:text-slate-500 
                            focus:border-violet-400 focus:shadow-lg focus:shadow-violet-500/20 rounded-xl p-4
                            transition-all duration-200 hover:border-slate-500"
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  label="Subscribe" 
                  icon="pi pi-check"
                  onClick={handleSubscribe}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 
                            border-0 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200
                            shadow-lg hover:shadow-xl hover:shadow-violet-500/25 transform hover:scale-[1.02]"
                />
                <Button 
                  label="Unsubscribe" 
                  icon="pi pi-times"
                  onClick={handleUnsubscribe}
                  outlined
                  className="flex-1 border-2 border-slate-600 text-slate-300 hover:bg-slate-700/30 
                            hover:border-slate-500 py-3 px-4 rounded-xl transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <Divider className="my-4 opacity-30" />

          {/* Enhanced Recent Alerts Section */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="pi pi-history text-violet-400"></i>
                Recent Activity
              </h3>
              <Tag 
                value={`${recentAlerts.length} alerts`} 
                className="bg-slate-700/50 text-slate-300 border border-slate-600/30 px-3 py-1 text-xs font-medium rounded-full"
              />
            </div>
            
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => {
                const config = getSeverityConfig(alert.severity);
                return (
                  <Card 
                    key={index}
                    className="bg-gradient-to-r from-slate-800/60 to-slate-900/60 border border-slate-700/40 
                              hover:border-slate-600/60 transition-all duration-300 hover:shadow-lg 
                              hover:shadow-slate-900/50 rounded-xl overflow-hidden group"
                  >
                    <div className="flex items-center p-4 gap-4">
                      {/* Severity Indicator */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${config.color} border`}>
                        <i className={`pi ${config.icon} text-lg`}></i>
                      </div>
                      
                      {/* Alert Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-bold text-base group-hover:text-violet-300 transition-colors">
                            M{alert.magnitude}
                          </span>
                          <Tag 
                            value={alert.severity.toUpperCase()} 
                            severity={config.severity}
                            className="px-2 py-0.5 text-xs font-semibold rounded-md"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="pi pi-map-marker text-slate-500 text-xs"></i>
                          <span className="text-slate-400 text-sm font-medium">{alert.location}</span>
                        </div>
                      </div>
                      
                      {/* Timestamp */}
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <i className="pi pi-clock"></i>
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle bottom border for severity */}
                    <div className={`h-1 ${config.color.split(' ')[0]} opacity-60`}></div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
