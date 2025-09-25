import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Package, 
  Download, 
  Palette, 
  Settings, 
  Eye,
  FileText,
  Image,
  Globe,
  Zap,
  CheckCircle2,
  Upload,
  ExternalLink,
  Copy,
  Layers,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";
import { useWhiteLabelConfig, useExportJobs, useExportHistory, useWhiteLabelStats } from '@/hooks/useWhiteLabel';
import { isFeatureEnabled } from "@/utils/featureFlags";
import { Navigate } from "react-router-dom";

const whiteLabelSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyLogo: z.string().optional(),
  primaryColor: z.string().min(4, "Primary color is required"),
  secondaryColor: z.string().optional(),
  brandFont: z.string().min(1, "Brand font is required"),
  companyWebsite: z.string().url().optional().or(z.literal("")),
  contactEmail: z.string().email("Valid email is required"),
  footerText: z.string().optional(),
  watermarkType: z.enum(["none", "subtle", "prominent"]),
  includeCompanyInfo: z.boolean().default(true),
  customDomain: z.string().optional(),
});

type WhiteLabelData = z.infer<typeof whiteLabelSchema>;

const WhiteLabelExports = () => {
  // Redirect if feature is disabled
  if (!isFeatureEnabled('enableWhiteLabel')) {
    return <Navigate to="/dashboard" replace />;
  }
  const [activeTab, setActiveTab] = useState("branding");
  const [previewMode, setPreviewMode] = useState(false);
  
  // Use dynamic data hooks
  const { activeConfig, configs, loading: configLoading, saveConfig, setActive } = useWhiteLabelConfig();
  const { jobs, loading: jobsLoading, createJob, updateJob } = useExportJobs();
  const { history, loading: historyLoading } = useExportHistory();
  const { stats, loading: statsLoading } = useWhiteLabelStats();

  const form = useForm<WhiteLabelData>({
    resolver: zodResolver(whiteLabelSchema),
    defaultValues: {
      companyName: "",
      companyLogo: "",
      primaryColor: "#3B82F6",
      secondaryColor: "#64748B",
      brandFont: "inter",
      companyWebsite: "",
      contactEmail: "",
      footerText: "",
      watermarkType: "subtle",
      includeCompanyInfo: true,
      customDomain: "",
    },
  });

  const exportFormats = [
    {
      format: "PDF",
      description: "High-quality PDF with custom branding",
      features: ["Custom colors", "Logo integration", "Branded headers/footers"],
      popular: true
    },
    {
      format: "Word Document",
      description: "Editable DOCX with brand styling",
      features: ["Brand fonts", "Color scheme", "Template styles"],
      popular: true
    },
    {
      format: "Web Page",
      description: "Responsive HTML page with your branding",
      features: ["Custom domain", "SEO optimized", "Mobile responsive"],
      popular: false
    },
    {
      format: "Portfolio Site",
      description: "Complete portfolio website with your brand",
      features: ["Multi-page site", "Contact forms", "Analytics"],
      popular: false
    }
  ];

  const brandingPresets = [
    {
      name: "Corporate Blue",
      primary: "#1E40AF",
      secondary: "#64748B",
      font: "inter",
      description: "Professional and trustworthy"
    },
    {
      name: "Tech Green",
      primary: "#059669",
      secondary: "#6B7280",
      font: "roboto",
      description: "Modern and innovative"
    },
    {
      name: "Creative Purple",
      primary: "#7C3AED",
      secondary: "#94A3B8",
      font: "poppins",
      description: "Creative and artistic"
    },
    {
      name: "Finance Gold",
      primary: "#D97706",
      secondary: "#78716C",
      font: "playfair",
      description: "Luxury and premium"
    }
  ];

  // Load active config into form when available
  useEffect(() => {
    if (activeConfig) {
      form.setValue("companyName", activeConfig.company_name || "");
      form.setValue("primaryColor", activeConfig.primary_color || "#3B82F6");
      form.setValue("secondaryColor", activeConfig.secondary_color || "#64748B");
      form.setValue("brandFont", activeConfig.font_family || "inter");
      form.setValue("contactEmail", activeConfig.email_signature || "");
      form.setValue("footerText", activeConfig.footer_text || "");
      form.setValue("watermarkType", activeConfig.watermark_enabled ? "subtle" : "none");
    }
  }, [activeConfig, form]);

  const onSubmit = async (data: WhiteLabelData) => {
    const configData = {
      config_name: "Default Config",
      company_name: data.companyName,
      primary_color: data.primaryColor,
      secondary_color: data.secondaryColor,
      font_family: data.brandFont,
      footer_text: data.footerText,
      watermark_enabled: data.watermarkType !== "none",
      watermark_text: data.watermarkType === "prominent" ? data.companyName : "",
      email_signature: data.contactEmail,
      is_active: true,
    };

    const saved = await saveConfig(configData);
    if (saved) {
      toast.success("White-label configuration saved!");
    }
  };

  const handleExportResume = async (format: string) => {
    const jobData = {
      export_format: format.toLowerCase(),
      status: 'pending' as const,
      metadata: { format, timestamp: new Date().toISOString() },
    };

    const job = await createJob(jobData);
    if (job) {
      toast.success(`${format} export started!`);
      
      // Simulate processing
      setTimeout(async () => {
        await updateJob(job.id!, { 
          status: 'completed',
          completed_at: new Date().toISOString() 
        });
        toast.success(`${format} export ready for download!`);
      }, 3000);
    }
  };

  const applyPreset = (preset: any) => {
    form.setValue("primaryColor", preset.primary);
    form.setValue("secondaryColor", preset.secondary);
    form.setValue("brandFont", preset.font);
    toast.success(`Applied ${preset.name} preset`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">White-Label Exports</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create fully branded resume exports with your company's identity for professional client deliverables
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-2xl font-bold text-primary">{stats.total_exports}</div>
              )}
              <div className="text-sm text-muted-foreground">Total Exports</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-2xl font-bold text-primary">{stats.active_clients}</div>
              )}
              <div className="text-sm text-muted-foreground">Active Clients</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Export Formats</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              {statsLoading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <div className="text-2xl font-bold text-primary">{stats.success_rate}%</div>
              )}
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 glass-card">
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="formats" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Formats
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="branding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Branding Configuration */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Brand Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="primaryColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Color</FormLabel>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Input type="color" {...field} className="w-16 h-10 p-1" />
                                  <Input placeholder="#3B82F6" {...field} className="flex-1" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="secondaryColor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Secondary Color</FormLabel>
                              <FormControl>
                                <div className="flex gap-2">
                                  <Input type="color" {...field} className="w-16 h-10 p-1" />
                                  <Input placeholder="#64748B" {...field} className="flex-1" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="brandFont"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand Font</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="inter">Inter (Modern Sans)</SelectItem>
                                <SelectItem value="roboto">Roboto (Clean Sans)</SelectItem>
                                <SelectItem value="poppins">Poppins (Friendly Sans)</SelectItem>
                                <SelectItem value="playfair">Playfair (Elegant Serif)</SelectItem>
                                <SelectItem value="montserrat">Montserrat (Bold Sans)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourcompany.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="contact@yourcompany.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="footerText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Footer Text</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Add custom footer text that appears on all exports..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Save Brand Configuration
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Brand Presets & Preview */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Quick Brand Presets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {brandingPresets.map((preset, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                          onClick={() => applyPreset(preset)}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: preset.primary }}
                            ></div>
                            <div>
                              <div className="font-medium">{preset.name}</div>
                              <div className="text-xs text-muted-foreground">{preset.description}</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Apply</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-white text-black">
                      <div 
                        className="text-lg font-bold mb-2"
                        style={{ color: form.watch("primaryColor") }}
                      >
                        {form.watch("companyName") || "Your Company Name"}
                      </div>
                      <div className="h-px bg-gray-200 mb-3"></div>
                      <div className="text-sm text-gray-600">
                        Professional resume crafted with attention to detail
                      </div>
                      <div className="mt-4 text-xs" style={{ color: form.watch("secondaryColor") }}>
                        {form.watch("contactEmail") || "contact@yourcompany.com"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="formats">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Available Export Formats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exportFormats.map((format, index) => (
                  <Card key={index} className="glass-card hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {format.format}
                          {format.popular && <Badge>Popular</Badge>}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{format.description}</p>
                      <div className="space-y-2 mb-4">
                        {format.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleExportResume(format.format)}
                      >
                        Configure {format.format} Export
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Export Center</h3>
                <Badge variant="outline">
                  {jobsLoading ? "Loading..." : `${jobs.filter(job => job.status === 'pending' || job.status === 'processing').length} in queue`}
                </Badge>
              </div>

              {/* Export Queue */}
              {jobs.filter(job => job.status === 'pending' || job.status === 'processing').length > 0 && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Current Exports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {jobsLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {jobs.filter(job => job.status === 'pending' || job.status === 'processing').map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium">{item.export_format} Export</div>
                                <div className="text-xs text-muted-foreground">
                                  {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={item.status === "completed" ? "default" : "secondary"}>
                                {item.status}
                              </Badge>
                              {item.status === "completed" && (
                                <Button size="sm">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Quick Export Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Quick Export</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Format:</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose export format" />
                        </SelectTrigger>
                        <SelectContent>
                          {exportFormats.map((format) => (
                            <SelectItem key={format.format} value={format.format.toLowerCase()}>
                              {format.format}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Export
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Bulk Export</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Export multiple resumes with consistent branding
                    </div>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Resume List
                    </Button>
                    <Button className="w-full">
                      <Package className="h-4 w-4 mr-2" />
                      Start Bulk Export
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Export History</h3>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Exports</CardTitle>
                </CardHeader>
                <CardContent>
                  {historyLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No export history yet. Start your first export to see it here.
                        </div>
                      ) : (
                        history.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded">
                                <Briefcase className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium">{item.client_name || 'Unknown Client'}</div>
                                <div className="text-sm text-muted-foreground">
                                  {item.format} • {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="default">completed</Badge>
                              <div className="text-xs text-muted-foreground">
                                {item.download_count} downloads
                              </div>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Export Settings</h3>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Default Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Watermark Type</label>
                      <Select defaultValue="subtle">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Watermark</SelectItem>
                          <SelectItem value="subtle">Subtle Branding</SelectItem>
                          <SelectItem value="prominent">Prominent Branding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="company-info" defaultChecked />
                      <label htmlFor="company-info" className="text-sm">
                        Include company information in exports
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="analytics" />
                      <label htmlFor="analytics" className="text-sm">
                        Track download analytics
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-expire" />
                      <label htmlFor="auto-expire" className="text-sm">
                        Auto-expire download links after 30 days
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>API Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                      API access available for enterprise customers. Integrate white-label exports directly into your workflow.
                    </AlertDescription>
                  </Alert>
                  <Button variant="outline" className="w-full mt-4">
                    <Copy className="h-4 w-4 mr-2" />
                    Get API Documentation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WhiteLabelExports;