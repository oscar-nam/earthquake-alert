import { useState } from 'react'
import { Bell, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'


function App() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const { toast } = useToast()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleSubscribe = () => {
    if (!email) {
      setEmailError('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    toast({
      title: 'Successfully Subscribed!',
      description: 'You will now receive earthquake alerts via email.',
      className: 'bg-green-600 border-green-600 text-white',
    })

    setEmail('')
    setEmailError('')
  }

  const handleUnsubscribe = () => {
    if (!email) {
      setEmailError('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    toast({
      title: 'Unsubscribed',
      description: 'You have been unsubscribed from earthquake alerts.',
      className: 'bg-red-600 border-red-600 text-white',
    })

    setEmail('')
    setEmailError('')
  }

  const getSeverity = (magnitude) => {
    if (magnitude >= 6.0) return 'high'
    if (magnitude >= 5.0) return 'moderate'
    return 'low'
  }

  const recentAlerts = [
    { magnitude: 5.2, depth: 10, location: 'Nha Trang', time: '2 hours ago' },
    { magnitude: 6.8, depth: 25, location: 'Nha Trang', time: '5 hours ago' },
    { magnitude: 4.1, depth: 8, location: 'Nha Trang', time: '1 day ago' },
    { magnitude: 5.9, depth: 15, location: 'Nha Trang', time: '2 days ago' },
  ]


  return (
    <div className="min-h-screen w-full bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-3 pb-6 border-b border-slate-700/50">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 bg-linear-to-br from-violet-500 to-purple-600 shadow-lg">
              <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white">
                <Bell className="h-7 w-7" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Earthquake Alerts
              </h1>
              <p className="text-slate-200 text-base">
                Subscribe to receive real-time earthquake notifications
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Form Section */}
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/40">
            <div className="flex items-center gap-2 mb-3">
              <i className="pi pi-envelope text-violet-400"></i>
              <label htmlFor="email" className="text-sm font-semibold text-slate-200">
                Email Notifications
              </label>
            </div>
            <div className="space-y-2 mb-4">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                className={`h-12 bg-slate-900/80 border text-white placeholder:text-slate-300 
                            focus:shadow-lg rounded-xl transition-all duration-200 hover:border-slate-500 ${emailError
                    ? 'border-red-500/70 focus:border-red-400 focus:shadow-red-500/20'
                    : 'border-slate-600/50 focus:border-violet-400 focus:shadow-violet-500/20'
                  }`}
                required
              />
              {emailError && (
                <div className="flex items-center gap-2 text-sm text-red-400 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSubscribe}
                disabled={!!emailError && email}
                className={`flex-1 h-12 text-base font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${emailError && email
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-500/25'
                  }`}
              >
                Subscribe
              </Button>
              <Button
                onClick={handleUnsubscribe}
                disabled={!!emailError && email}
                variant="outline"
                className={`flex-1 h-12 text-base font-semibold rounded-xl transition-all duration-200 ${emailError && email
                  ? 'border-gray-600 text-gray-500 cursor-not-allowed opacity-50'
                  : 'border-2 border-slate-600 text-slate-100 hover:bg-slate-700/30 hover:border-slate-500'
                  }`}
              >
                Unsubscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <i className="pi pi-history text-violet-400"></i>
              Recent Activity
            </h2>
            <Badge variant="secondary" className="bg-slate-700/50 text-slate-100 border border-slate-600/30 px-3 py-1">
              {recentAlerts.length} alerts
            </Badge>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => {
              const severity = getSeverity(alert.magnitude)
              const config = {
                high: {
                  textColor: 'text-red-500',
                  labelBg: 'bg-red-600',
                  labelBorder: 'border-red-500',
                  borderColor: 'border-red-500'
                },
                moderate: {
                  textColor: 'text-orange-500',
                  labelBg: 'bg-orange-600',
                  labelBorder: 'border-orange-500',
                  borderColor: 'border-orange-500'
                },
                low: {
                  textColor: 'text-blue-500',
                  labelBg: 'bg-blue-600',
                  labelBorder: 'border-blue-500',
                  borderColor: 'border-blue-500'
                }
              }[severity] || {
                textColor: 'text-gray-500',
                labelBg: 'bg-gray-600',
                labelBorder: 'border-gray-500',
                borderColor: 'border-gray-500'
              }

              return (
                <div
                  key={index}
                  className={`bg-linear-to-r from-slate-800/60 to-slate-900/60 border-2 ${config.borderColor}
                            transition-all duration-300 hover:shadow-lg 
                            hover:shadow-slate-900/50 rounded-xl overflow-hidden group`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-baseline gap-3">
                        <span className={`font-bold text-3xl ${config.textColor}`}>
                          M{alert.magnitude}
                        </span>
                        <span className={`font-semibold text-xl ${config.textColor}`}>
                          {alert.depth}km deep
                        </span>
                      </div>
                      <span className={`${config.labelBg} text-white px-3 py-1.5 text-xs font-bold rounded-lg border-2 ${config.labelBorder}`}>
                        {severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-semibold text-base">{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App
