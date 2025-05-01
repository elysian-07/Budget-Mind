
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AdvancedSettings() {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [exportTypes, setExportTypes] = useState({
    csv: true,
    pdf: false,
    json: false,
  });

  return (
    <Collapsible
      open={advancedOpen}
      onOpenChange={setAdvancedOpen}
      className="w-full"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Advanced Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure advanced application settings
          </p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {advancedOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Data Export Format</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="csv"
                  checked={exportTypes.csv}
                  onCheckedChange={(checked) =>
                    setExportTypes({ ...exportTypes, csv: !!checked })
                  }
                  className="data-[state=checked]:bg-finance-primary data-[state=checked]:border-finance-primary"
                />
                <Label htmlFor="csv">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pdf"
                  checked={exportTypes.pdf}
                  onCheckedChange={(checked) =>
                    setExportTypes({ ...exportTypes, pdf: !!checked })
                  }
                  className="data-[state=checked]:bg-finance-primary data-[state=checked]:border-finance-primary"
                />
                <Label htmlFor="pdf">PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="json"
                  checked={exportTypes.json}
                  onCheckedChange={(checked) =>
                    setExportTypes({ ...exportTypes, json: !!checked })
                  }
                  className="data-[state=checked]:bg-finance-primary data-[state=checked]:border-finance-primary"
                />
                <Label htmlFor="json">JSON</Label>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
