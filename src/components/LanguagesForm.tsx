
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Languages, Globe } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { optionalLanguageSchema, OptionalLanguageFormData } from "@/schemas/optionalResumeSchemas";
import { cn } from "@/lib/utils";

interface LanguagesFormProps {
  data: Array<{
    id: string;
    language: string;
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Native";
  }>;
  onUpdate: (data: any[]) => void;
  onValidationChange: (isValid: boolean) => void;
}

const LanguagesForm = ({ data, onUpdate, onValidationChange }: LanguagesFormProps) => {
  const [languages, setLanguages] = useState(data || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<OptionalLanguageFormData>({
    resolver: zodResolver(optionalLanguageSchema),
    mode: "onChange"
  });

  const watchProficiency = watch("proficiency");

  // Always mark as valid since this is an optional section
  useEffect(() => {
    onValidationChange(true);
  }, [onValidationChange]);

  useEffect(() => {
    onUpdate(languages);
  }, [languages, onUpdate]);

  const addLanguage = (formData: OptionalLanguageFormData) => {
    // Only add if both language and proficiency are provided
    if (!formData.language?.trim() || !formData.proficiency) {
      return;
    }

    const newLanguage = {
      id: Date.now().toString(),
      language: formData.language,
      proficiency: formData.proficiency
    };

    if (editingIndex !== null) {
      const updated = [...languages];
      updated[editingIndex] = newLanguage;
      setLanguages(updated);
      setEditingIndex(null);
    } else {
      setLanguages([...languages, newLanguage]);
    }
    reset();
  };

  const editLanguage = (index: number) => {
    const lang = languages[index];
    setEditingIndex(index);
    reset({
      language: lang.language,
      proficiency: lang.proficiency
    });
  };

  const deleteLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      reset();
    }
  };

  const commonLanguages = [
    "English", "Spanish", "French", "German", "Chinese (Mandarin)", 
    "Japanese", "Korean", "Portuguese", "Italian", "Russian", 
    "Arabic", "Hindi", "Dutch", "Swedish", "Norwegian"
  ];

  const getProficiencyDescription = (level: string) => {
    const descriptions = {
      "Beginner": "Basic phrases and simple conversations",
      "Intermediate": "Can handle most conversations and written text",
      "Advanced": "Fluent in complex discussions and professional settings",
      "Native": "Native speaker or bilingual proficiency"
    };
    return descriptions[level as keyof typeof descriptions];
  };

  const getProficiencyColor = (level: string) => {
    const colors = {
      "Beginner": "text-orange-600",
      "Intermediate": "text-yellow-600",
      "Advanced": "text-blue-600",
      "Native": "text-green-600"
    };
    return colors[level as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Languages className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Languages</h2>
        <p className="text-muted-foreground">
          Add the languages you speak and your proficiency level. This section is optional.
        </p>
      </div>

      {/* Add/Edit Language Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            {editingIndex !== null ? "Edit Language" : "Add Language"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(addLanguage)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                placeholder="e.g., Spanish"
                {...register("language")}
                className={cn(errors.language && "border-destructive")}
                list="common-languages"
              />
              <datalist id="common-languages">
                {commonLanguages.map((lang) => (
                  <option key={lang} value={lang} />
                ))}
              </datalist>
              {errors.language && <p className="text-sm text-destructive">{errors.language.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="proficiency">Proficiency Level</Label>
              <Select onValueChange={(value) => setValue("proficiency", value as any)}>
                <SelectTrigger className={cn(errors.proficiency && "border-destructive")}>
                  <SelectValue placeholder="Select proficiency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Beginner</span>
                      <span className="text-xs text-muted-foreground">Basic phrases and simple conversations</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Intermediate">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Intermediate</span>
                      <span className="text-xs text-muted-foreground">Can handle most conversations</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Advanced">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Advanced</span>
                      <span className="text-xs text-muted-foreground">Fluent in professional settings</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Native">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Native</span>
                      <span className="text-xs text-muted-foreground">Native speaker proficiency</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.proficiency && <p className="text-sm text-destructive">{errors.proficiency.message}</p>}
              
              {watchProficiency && (
                <p className="text-sm text-muted-foreground">
                  {getProficiencyDescription(watchProficiency)}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {editingIndex !== null ? "Update Language" : "Add Language"}
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

      {/* Languages List */}
      {languages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Languages ({languages.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {languages.map((lang, index) => (
              <div key={lang.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{lang.language}</h4>
                    <p className={cn("text-sm font-medium", getProficiencyColor(lang.proficiency))}>
                      {lang.proficiency}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getProficiencyDescription(lang.proficiency)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editLanguage(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteLanguage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {languages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Languages className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No languages added yet. This section is optional - you can skip it or add languages above.</p>
        </div>
      )}
    </div>
  );
};

export default LanguagesForm;
