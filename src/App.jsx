import { useState, useEffect } from 'react'
import { Bell, MapPin, Clock, AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { getRelativeTime } from '@/lib/time'


function App() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentAlerts, setRecentAlerts] = useState([])
  const [alertsLoading, setAlertsLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
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

  const handleEmailAction = async (action) => {
    if (!email) {
      setEmailError('Email address is required')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    const config = {
      subscribe: {
        endpoint: 'subscribe',
        successTitle: 'Successfully Subscribed!',
        successDescription: 'You will now receive earthquake alerts via email.',
        successClass: 'bg-green-600 border-green-600 text-white',
        errorTitle: 'Subscription Failed',
        errorDescription: 'There was an error subscribing. Please try again.',
      },
      unsubscribe: {
        endpoint: 'unsubscribe',
        successTitle: 'Unsubscribed',
        successDescription: 'You have been unsubscribed from earthquake alerts.',
        successClass: 'bg-red-600 border-red-600 text-white',
        errorTitle: 'Unsubscribe Failed',
        errorDescription: 'There was an error unsubscribing. Please try again.',
      }
    }[action]

    setIsLoading(true)
    try {
      const response = await fetch(`https://ccddapi.vudo.click/${config.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action}`)
      }

      toast({
        title: config.successTitle,
        description: config.successDescription,
        className: config.successClass,
      })

      setEmail('')
      setEmailError('')
    } catch (error) {
      toast({
        title: config.errorTitle,
        description: config.errorDescription,
        className: 'bg-red-600 border-red-600 text-white',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = () => handleEmailAction('subscribe')
  const handleUnsubscribe = () => handleEmailAction('unsubscribe')

  const getSeverity = (mag) => {
    if (mag >= 6.0) return 'high'
    if (mag >= 5.0) return 'moderate'
    return 'low'
  }

  useEffect(() => {
    const fetchAlerts = async (isInitialLoad = false) => {
      if (isInitialLoad) {
        setAlertsLoading(true)
      } else {
        setIsFetching(true)
      }
      try {
        const response = await fetch('https://ccddapi.vudo.click/alerts')
        if (!response.ok) {
          throw new Error('Failed to fetch alerts')
        }
        const data = await response.json()
        setRecentAlerts(data.alerts || [])
      } catch (error) {
        console.error('Error fetching alerts:', error)
        if (isInitialLoad) {
          toast({
            title: 'Failed to Load Alerts',
            description: 'Unable to fetch recent earthquake alerts.',
            className: 'bg-red-600 border-red-600 text-white',
          })
        }
      } finally {
        if (isInitialLoad) {
          setAlertsLoading(false)
        } else {
          setIsFetching(false)
        }
      }
    }

    // Fetch immediately on mount
    fetchAlerts(true)

    // Set up interval to fetch every 10 seconds
    const intervalId = setInterval(() => fetchAlerts(false), 10000)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [])


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
                disabled={!!emailError && email || isLoading}
                className={`flex-1 h-12 text-base font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${emailError && email || isLoading
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-500/25'
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
              <Button
                onClick={handleUnsubscribe}
                disabled={!!emailError && email || isLoading}
                variant="outline"
                className={`flex-1 h-12 text-base font-semibold rounded-xl transition-all duration-200 ${emailError && email || isLoading
                  ? 'border-gray-600 text-gray-500 cursor-not-allowed opacity-50'
                  : 'border-2 border-slate-600 text-slate-100 hover:bg-slate-700/30 hover:border-slate-500'
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Unsubscribe'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              {isFetching ? (
                <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
              ) : (
                <i className="pi pi-history text-violet-400"></i>
              )}
              Recent Activity
            </h2>
            <Badge variant="secondary" className="bg-slate-700/50 text-slate-100 border border-slate-600/30 px-3 py-1">
              {recentAlerts.length} alerts
            </Badge>
          </div>
          <div className="space-y-3">
            {alertsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
              </div>
            ) : recentAlerts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                No recent alerts available
              </div>
            ) : (
              recentAlerts.map((alert, index) => {
                const severity = getSeverity(alert.mag)
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
                            {alert.mag}
                          </span>
                        </div>
                        <span className={`${config.labelBg} text-white px-3 py-1.5 text-xs font-bold rounded-lg border-2 ${config.labelBorder}`}>
                          {severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-semibold text-base">Nha Trang</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{getRelativeTime(new Date(alert.created_at))}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App
