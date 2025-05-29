
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UploadedFile {
  name: string;
  size: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  records?: number;
}

const FileUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      // Validate file type
      const validTypes = ['.csv', '.xlsx', '.xls'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!validTypes.includes(fileExtension)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only CSV, XLSX, or XLS files",
          variant: "destructive"
        });
        return;
      }

      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        status: 'pending'
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate file processing
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'processing' }
            : f
        ));
      }, 500);

      setTimeout(() => {
        const recordCount = Math.floor(Math.random() * 100) + 20; // Random 20-120 records
        setUploadedFiles(prev => prev.map(f => 
          f.name === file.name 
            ? { ...f, status: 'completed', records: recordCount }
            : f
        ));
        
        toast({
          title: "File Processed Successfully",
          description: `${file.name} has been uploaded and ${recordCount} records will be distributed among agents`,
        });
      }, 3000);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'processing':
        return <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleChooseFiles = () => {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">File Upload & Distribution</h2>
        <p className="text-gray-300">Upload CSV files to distribute tasks among agents</p>
      </div>

      <Card className="bg-gray-800/90 backdrop-blur-md border-gray-600">
        <CardHeader>
          <CardTitle className="text-white text-xl">Upload Files</CardTitle>
          <CardDescription className="text-gray-300">
            Supported formats: CSV, XLSX, XLS. Files will be automatically distributed among 5 agents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-purple-400 bg-purple-500/20' 
                : 'border-gray-500 hover:border-gray-400 bg-gray-700/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop your files here
            </h3>
            <p className="text-gray-300 mb-4">
              or click to browse and upload
            </p>
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls"
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />
            <Button 
              onClick={handleChooseFiles}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-2"
            >
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="bg-gray-800/90 backdrop-blur-md border-gray-600">
          <CardHeader>
            <CardTitle className="text-white text-xl">Uploaded Files</CardTitle>
            <CardDescription className="text-gray-300">
              Track the status of your uploaded files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-gray-300 text-sm">
                        {formatFileSize(file.size)}
                        {file.records && ` • ${file.records} records`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                      file.status === 'completed' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                      file.status === 'processing' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                      file.status === 'error' ? 'bg-red-600/20 text-red-400 border border-red-600/30' :
                      'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                    }`}>
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FileUpload;
