
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Award, Calendar, Building } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { optionalCertificateSchema, OptionalCertificateFormData } from "@/schemas/optionalResumeSchemas";
import { cn } from "@/lib/utils";

interface CertificatesFormProps {
  data: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }>;
  onUpdate: (data: any[]) => void;
  onValidationChange: (isValid: boolean) => void;
  industry?: string;
}

const CertificatesForm = ({ data, onUpdate, onValidationChange, industry }: CertificatesFormProps) => {
  const [certificates, setCertificates] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OptionalCertificateFormData>({
    resolver: zodResolver(optionalCertificateSchema),
    mode: "onChange"
  });

  // Always mark as valid since this is an optional section
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  useEffect(() => {
    onUpdate(certificates);
  }, [certificates, onUpdate]);

  const addCertificate = (formData: OptionalCertificateFormData) => {
    // Only add if at least name and issuer are provided
    if (!formData.name?.trim() || !formData.issuer?.trim()) {
      return;
    }

    const newCertificate = {
      id: Date.now().toString(),
      name: formData.name,
      issuer: formData.issuer,
      issueDate: formData.issueDate || '',
      expiryDate: formData.expiryDate,
      credentialId: formData.credentialId,
      credentialUrl: formData.credentialUrl
    };

    if (editingIndex !== null) {
      const updated = [...certificates];
      updated[editingIndex] = newCertificate;
      setCertificates(updated);
      setEditingIndex(null);
    } else {
      setCertificates([...certificates, newCertificate]);
    }
    reset();
  };

  const editCertificate = (index: number) => {
    const cert = certificates[index];
    setEditingIndex(index);
    reset({
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate || "",
      credentialId: cert.credentialId || "",
      credentialUrl: cert.credentialUrl || ""
    });
  };

  const deleteCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      reset();
    }
  };

  const getSuggestedCertificates = () => {
    const suggestions = {
      tech: ["AWS Certified Solutions Architect", "Google Cloud Professional", "Microsoft Azure Fundamentals", "CompTIA Security+"],
      marketing: ["Google Ads Certification", "HubSpot Content Marketing", "Facebook Blueprint", "Google Analytics"],
      healthcare: ["BLS Certification", "ACLS Certification", "Board Certification", "CPR Certification"],
      finance: ["CFA Charter", "FRM Certification", "CPA License", "Series 7 License"],
      creative: ["Adobe Certified Expert", "UX Certification", "Google Design Certificate"]
    };
    
    return suggestions[industry as keyof typeof suggestions] || [];
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Award className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Certifications & Licenses</h2>
        <p className="text-muted-foreground">
          Add your professional certifications and licenses. This section is optional.
        </p>
      </div>

      {/* Suggested Certifications */}
      {industry && getSuggestedCertificates().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Suggested for {industry}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {getSuggestedCertificates().map((cert) => (
                <Button
                  key={cert}
                  variant="outline"
                  size="sm"
                  onClick={() => reset({ name: cert })}
                  className="text-xs"
                >
                  {cert}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Certificate Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            {editingIndex !== null ? "Edit Certificate" : "Add Certificate"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(addCertificate)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Certificate Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., AWS Solutions Architect"
                  {...register("name")}
                  className={cn(errors.name && "border-destructive")}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuer">Issuing Organization</Label>
                <Input
                  id="issuer"
                  placeholder="e.g., Amazon Web Services"
                  {...register("issuer")}
                  className={cn(errors.issuer && "border-destructive")}
                />
                {errors.issuer && <p className="text-sm text-destructive">{errors.issuer.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="month"
                  {...register("issueDate")}
                  className={cn(errors.issueDate && "border-destructive")}
                />
                {errors.issueDate && <p className="text-sm text-destructive">{errors.issueDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="month"
                  placeholder="Leave blank if no expiry"
                  {...register("expiryDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID</Label>
                <Input
                  id="credentialId"
                  placeholder="Certificate ID or number"
                  {...register("credentialId")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialUrl">Certificate URL</Label>
                <Input
                  id="credentialUrl"
                  type="url"
                  placeholder="Link to verify certificate"
                  {...register("credentialUrl")}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingIndex !== null ? "Update Certificate" : "Add Certificate"}
              </Button>
              {editingIndex !== null && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingIndex(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Certificates List */}
      {certificates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Certificates ({certificates.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {certificates.map((cert, index) => (
              <div key={cert.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    {cert.name}
                  </h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Building className="w-3 h-3" />
                    {cert.issuer}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {cert.issueDate} {cert.expiryDate && `- ${cert.expiryDate}`}
                  </p>
                  {cert.credentialId && (
                    <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editCertificate(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCertificate(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {certificates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No certificates added yet. This section is optional - you can skip it or add certificates above.</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesForm;
