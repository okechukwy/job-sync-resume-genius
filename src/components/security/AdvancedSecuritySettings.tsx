import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDataEncryption } from '@/hooks/useDataEncryption';
import { usePrivacyAnalytics } from '@/hooks/usePrivacyAnalytics';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Clock,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface DataRetentionPolicy {
  id: string;
  data_type: string;
  retention_period: string;
  auto_delete: boolean;
}

export const AdvancedSecuritySettings: React.FC = () => {
  const { user } = useAuth();
  const { 
    loading: encryptionLoading, 
    encryptedData, 
    encryptData, 
    listEncryptedData,
    deleteEncryptedData 
  } = useDataEncryption();
  const { loading: analyticsLoading, cleanupOldData } = usePrivacyAnalytics();
  
  const [retentionPolicies, setRetentionPolicies] = useState<DataRetentionPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEncryptionData, setNewEncryptionData] = useState({
    content: '',
    dataType: 'personal_info'
  });
  const [newRetentionPolicy, setNewRetentionPolicy] = useState({
    dataType: '',
    retentionPeriod: '2 years',
    autoDelete: true
  });

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        await Promise.all([
          listEncryptedData(),
          fetchRetentionPolicies()
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Fetch data retention policies
  const fetchRetentionPolicies = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('data_retention_policies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRetentionPolicies((data || []).map(item => ({
        ...item,
        retention_period: String(item.retention_period || '')
      })) as DataRetentionPolicy[]);
    } catch (error) {
      console.error('Failed to fetch retention policies:', error);
      toast.error('Failed to load retention policies');
    }
  };

  // Create new retention policy
  const createRetentionPolicy = async () => {
    if (!user || !newRetentionPolicy.dataType) return;

    try {
      const { error } = await supabase
        .from('data_retention_policies')
        .upsert({
          user_id: user.id,
          data_type: newRetentionPolicy.dataType,
          retention_period: newRetentionPolicy.retentionPeriod,
          auto_delete: newRetentionPolicy.autoDelete
        }, { onConflict: 'user_id,data_type' });

      if (error) throw error;

      toast.success('Retention policy created');
      setNewRetentionPolicy({ dataType: '', retentionPeriod: '2 years', autoDelete: true });
      await fetchRetentionPolicies();
    } catch (error) {
      console.error('Failed to create retention policy:', error);
      toast.error('Failed to create retention policy');
    }
  };

  // Update retention policy
  const updateRetentionPolicy = async (policyId: string, updates: Partial<DataRetentionPolicy>) => {
    try {
      const { error } = await supabase
        .from('data_retention_policies')
        .update(updates)
        .eq('id', policyId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast.success('Retention policy updated');
      await fetchRetentionPolicies();
    } catch (error) {
      console.error('Failed to update retention policy:', error);
      toast.error('Failed to update retention policy');
    }
  };

  // Handle data encryption
  const handleEncryptData = async () => {
    if (!newEncryptionData.content.trim()) {
      toast.error('Please enter content to encrypt');
      return;
    }

    const result = await encryptData(newEncryptionData.content, newEncryptionData.dataType);
    if (result) {
      setNewEncryptionData({ content: '', dataType: 'personal_info' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Advanced Security Settings</h2>
      </div>

      <Tabs defaultValue="encryption" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="encryption">Data Encryption</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="analytics">Privacy Analytics</TabsTrigger>
        </TabsList>

        {/* Data Encryption Tab */}
        <TabsContent value="encryption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>End-to-End Data Encryption</span>
              </CardTitle>
              <CardDescription>
                Encrypt sensitive data with client-side encryption for maximum security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Encrypt New Data */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Encrypt New Data</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="data-type">Data Type</Label>
                    <Select 
                      value={newEncryptionData.dataType} 
                      onValueChange={(value) => setNewEncryptionData(prev => ({ ...prev, dataType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal_info">Personal Information</SelectItem>
                        <SelectItem value="resume_content">Resume Content</SelectItem>
                        <SelectItem value="employment_history">Employment History</SelectItem>
                        <SelectItem value="sensitive_notes">Sensitive Notes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="content">Content to Encrypt</Label>
                    <Input
                      id="content"
                      type="text"
                      placeholder="Enter sensitive content..."
                      value={newEncryptionData.content}
                      onChange={(e) => setNewEncryptionData(prev => ({ ...prev, content: e.target.value }))}
                    />
                  </div>
                  <Button 
                    onClick={handleEncryptData} 
                    disabled={encryptionLoading || !newEncryptionData.content.trim()}
                    className="w-full"
                  >
                    {encryptionLoading ? 'Encrypting...' : 'Encrypt Data'}
                  </Button>
                </div>
              </div>

              {/* Encrypted Data List */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Encrypted Data</h4>
                {encryptedData.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <Lock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No encrypted data found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {encryptedData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Lock className="h-4 w-4" />
                            <span className="font-medium">{item.data_type.split('_').join(' ')}</span>
                            <Badge variant="secondary">Encrypted</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteEncryptedData(item.id)}
                          disabled={encryptionLoading}
                        >
                          Delete
                        </Button>
                      </div>
                     ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Retention Tab */}
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Automated Data Retention</span>
              </CardTitle>
              <CardDescription>
                Configure automatic deletion policies for different data types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Create New Policy */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Create Retention Policy</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Data Type</Label>
                    <Input
                      placeholder="e.g., user_sessions"
                      value={newRetentionPolicy.dataType}
                      onChange={(e) => setNewRetentionPolicy(prev => ({ ...prev, dataType: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Retention Period</Label>
                    <Select 
                      value={newRetentionPolicy.retentionPeriod} 
                      onValueChange={(value) => setNewRetentionPolicy(prev => ({ ...prev, retentionPeriod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30 days">30 Days</SelectItem>
                        <SelectItem value="90 days">90 Days</SelectItem>
                        <SelectItem value="1 year">1 Year</SelectItem>
                        <SelectItem value="2 years">2 Years</SelectItem>
                        <SelectItem value="5 years">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={createRetentionPolicy} className="w-full">
                      Create Policy
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newRetentionPolicy.autoDelete}
                    onCheckedChange={(checked) => setNewRetentionPolicy(prev => ({ ...prev, autoDelete: checked }))}
                  />
                  <Label>Enable automatic deletion</Label>
                </div>
              </div>

              {/* Existing Policies */}
              <div className="space-y-2">
                {retentionPolicies.map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Database className="h-4 w-4" />
                      <div>
                        <span className="font-medium">{policy.data_type.split('_').join(' ')}</span>
                        <p className="text-sm text-muted-foreground">
                          Retention: {policy.retention_period}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {policy.auto_delete ? (
                        <Badge variant="secondary">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Auto-Delete
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Manual
                        </Badge>
                      )}
                      <Switch
                        checked={policy.auto_delete}
                        onCheckedChange={(checked) => updateRetentionPolicy(policy.id, { auto_delete: checked })}
                      />
                    </div>
                  </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Privacy-Preserving Analytics</span>
              </CardTitle>
              <CardDescription>
                Manage analytics data with complete user privacy protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Data Anonymization</h4>
                  <p className="text-sm text-muted-foreground">
                    All analytics data is automatically anonymized and cannot be traced back to individual users.
                  </p>
                  <Badge variant="secondary">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Session Hashing</h4>
                  <p className="text-sm text-muted-foreground">
                    User sessions are hashed using one-way encryption to prevent identification.
                  </p>
                  <Badge variant="secondary">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Cleanup Old Analytics Data</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Remove analytics data older than the specified period to minimize data retention.
                </p>
                <div className="flex items-center space-x-3">
                  <Select defaultValue="365">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="730">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => cleanupOldData(365)} 
                    disabled={analyticsLoading}
                    variant="outline"
                  >
                    {analyticsLoading ? 'Cleaning...' : 'Cleanup Data'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
