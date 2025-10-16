/**
 * Reports Page
 *
 * Generate and view custom reports
 */

import { FileText, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and manage custom reports
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Report Templates</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 hover:bg-accent cursor-pointer transition-colors">
            <FileText className="h-8 w-8 mb-3 text-primary" />
            <h4 className="font-semibold mb-2">Monthly Summary</h4>
            <p className="text-sm text-muted-foreground">
              Comprehensive monthly diagnosis summary
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 hover:bg-accent cursor-pointer transition-colors">
            <FileText className="h-8 w-8 mb-3 text-primary" />
            <h4 className="font-semibold mb-2">Hospital Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Detailed hospital-wise breakdown
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 hover:bg-accent cursor-pointer transition-colors">
            <FileText className="h-8 w-8 mb-3 text-primary" />
            <h4 className="font-semibold mb-2">Category Trends</h4>
            <p className="text-sm text-muted-foreground">
              Analysis of diagnosis categories
            </p>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="rounded-lg border bg-card">
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Report {i} - Monthly Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Generated on October {15 + i}, 2025
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

