
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Settings } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const AdminPanel = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    confidenceThreshold: "2.5",
    maxFileSize: "50",
    tessDataPath: "/usr/share/tessdata"
  });

  const [logs] = useState([
    {
      id: 1,
      timestamp: new Date().toISOString(),
      level: "INFO" as const,
      message: "Document processing started",
      details: { fileName: "sample.pdf", pages: 3 }
    },
    {
      id: 2,
      timestamp: new Date().toISOString(),
      level: "WARN" as const,
      message: "OCR confidence below threshold",
      details: { confidence: 2.1, threshold: 2.5 }
    },
    {
      id: 3,
      timestamp: new Date().toISOString(),
      level: "SUCCESS" as const,
      message: "VIN extracted successfully",
      details: { vin: "1HGBH41JXMN109186", confidence: 0.95 }
    }
  ]);

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast.success(t('saveSettings'));
  };

  const downloadLogs = () => {
    const logsData = {
      exportDate: new Date().toISOString(),
      logs: logs
    };
    
    const blob = new Blob([JSON.stringify(logsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fleeto-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Logs downloaded successfully");
  };

  return (
    <div className="space-y-6">
      {/* Settings Card */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t('systemSettings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="confidence">{t('ocrConfidenceThreshold')}</Label>
              <Input
                id="confidence"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={settings.confidenceThreshold}
                onChange={(e) => updateSetting('confidenceThreshold', e.target.value)}
              />
              <p className="text-sm text-gray-600 mt-1">
                {t('ocrConfidenceDesc')}
              </p>
            </div>
            
            <div>
              <Label htmlFor="fileSize">{t('maxFileSize')}</Label>
              <Input
                id="fileSize"
                type="number"
                min="1"
                max="100"
                value={settings.maxFileSize}
                onChange={(e) => updateSetting('maxFileSize', e.target.value)}
              />
              <p className="text-sm text-gray-600 mt-1">
                {t('maxFileSizeDesc')}
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="tessData">{t('tesseractDataPath')}</Label>
            <Input
              id="tessData"
              value={settings.tessDataPath}
              onChange={(e) => updateSetting('tessDataPath', e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-1">
              {t('tesseractDataDesc')}
            </p>
          </div>

          <Button onClick={saveSettings} className="bg-purple-600 hover:bg-purple-700">
            {t('saveSettings')}
          </Button>
        </CardContent>
      </Card>

      {/* Logs Card */}
      <Card className="border-2 border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-600 text-white flex flex-row items-center justify-between">
          <CardTitle>{t('systemLogs')}</CardTitle>
          <Button 
            onClick={downloadLogs}
            variant="secondary"
            size="sm"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('downloadLogs')}
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-3 rounded-lg border-l-4 ${
                  log.level === 'SUCCESS'
                    ? 'bg-green-50 border-green-400'
                    : log.level === 'WARN'
                    ? 'bg-yellow-50 border-yellow-400'
                    : log.level === 'ERROR'
                    ? 'bg-red-50 border-red-400'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    log.level === 'SUCCESS'
                      ? 'bg-green-100 text-green-800'
                      : log.level === 'WARN'
                      ? 'bg-yellow-100 text-yellow-800'
                      : log.level === 'ERROR'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {t(log.level)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800">{log.message}</p>
                {log.details && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-600 cursor-pointer">
                      {t('viewDetails')}
                    </summary>
                    <pre className="text-xs text-gray-600 mt-1 p-2 bg-gray-100 rounded">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
