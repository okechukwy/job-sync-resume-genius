import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAdvancedSecurity } from '@/hooks/useAdvancedSecurity';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { 
  Shield, 
  AlertTriangle, 
  Smartphone, 
  Activity, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle,
  Wifi
} from 'lucide-react';
import { format } from 'date-fns';

export const SecurityDashboard: React.FC = () => {
  const {
    loading,
    anomalies,
    trustedDevices,
    loginAttempts,
    resolveAnomaly,
    trustDevice,
    removeDevice
  } = useAdvancedSecurity();

  if (loading) {
    return <LoadingSpinner />;
  }

  const unresolvedAnomalies = anomalies.filter(a => !a.resolved);
  const criticalAnomalies = unresolvedAnomalies.filter(a => a.severity_level === 'critical');
  const recentFailedAttempts = loginAttempts.filter(a => !a.success).slice(0, 5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getAnomalyIcon = (type: string) => {
    switch (type) {
      case 'location_change': return <MapPin className="h-4 w-4" />;
      case 'login_pattern': return <Clock className="h-4 w-4" />;
      case 'unusual_activity': return <Activity className="h-4 w-4" />;
      case 'suspicious_behavior': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {criticalAnomalies.length > 0 && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {criticalAnomalies.length} critical security alert{criticalAnomalies.length > 1 ? 's' : ''} that require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Anomalies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unresolvedAnomalies.length}</div>
            <p className="text-xs text-muted-foreground">
              {criticalAnomalies.length} critical, {unresolvedAnomalies.length - criticalAnomalies.length} others
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trusted Devices</CardTitle>
            <Smartphone className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trustedDevices.filter(d => d.trusted).length}</div>
            <p className="text-xs text-muted-foreground">
              {trustedDevices.length} total devices registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loginAttempts.length}</div>
            <p className="text-xs text-muted-foreground">
              Login attempts in last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Security Information */}
      <Tabs defaultValue="anomalies" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="anomalies">Security Anomalies</TabsTrigger>
          <TabsTrigger value="devices">Trusted Devices</TabsTrigger>
          <TabsTrigger value="activity">Login Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Anomalies</CardTitle>
              <CardDescription>
                Unusual patterns detected in your account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              {anomalies.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No security anomalies detected</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {anomalies.map((anomaly) => (
                    <div 
                      key={anomaly.id}
                      className="flex items-start justify-between p-4 border rounded-lg space-x-4"
                    >
                      <div className="flex items-start space-x-3">
                        {getAnomalyIcon(anomaly.anomaly_type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{anomaly.description}</h4>
                            <Badge variant={getSeverityColor(anomaly.severity_level)}>
                              {anomaly.severity_level}
                            </Badge>
                            {anomaly.resolved && (
                              <Badge variant="secondary">Resolved</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {format(new Date(anomaly.created_at), 'MMM dd, yyyy HH:mm')}
                          </p>
                          {anomaly.metadata && Object.keys(anomaly.metadata).length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {JSON.stringify(anomaly.metadata, null, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                      {!anomaly.resolved && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => resolveAnomaly(anomaly.id)}
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trusted Devices</CardTitle>
              <CardDescription>
                Manage devices that have accessed your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {trustedDevices.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No devices registered</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trustedDevices.map((device) => (
                    <div 
                      key={device.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">
                              {device.device_name || 'Unknown Device'}
                            </h4>
                            {device.trusted ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {device.city && device.country_code && (
                              <>
                                <MapPin className="h-3 w-3 inline mr-1" />
                                {device.city}, {device.country_code}
                              </>
                            )}
                            {device.city && device.country_code && ' • '}
                            Last used: {format(new Date(device.last_used_at), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!device.trusted && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => trustDevice(device.id)}
                          >
                            Trust
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => removeDevice(device.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Login Activity</CardTitle>
              <CardDescription>
                Recent login attempts and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loginAttempts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Wifi className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent login activity</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {loginAttempts.slice(0, 10).map((attempt) => (
                    <div 
                      key={attempt.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {attempt.success ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {attempt.success ? 'Successful' : 'Failed'} Login
                            </span>
                            <Badge variant={attempt.success ? 'secondary' : 'destructive'}>
                              {attempt.success ? 'Success' : 'Failed'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {attempt.city && attempt.country_code 
                              ? `${attempt.city}, ${attempt.country_code}` 
                              : attempt.ip_address
                            }
                            {' • '}
                            {format(new Date(attempt.created_at), 'MMM dd, yyyy HH:mm')}
                          </p>
                          {attempt.failure_reason && (
                            <p className="text-xs text-red-600 mt-1">
                              Reason: {attempt.failure_reason}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};